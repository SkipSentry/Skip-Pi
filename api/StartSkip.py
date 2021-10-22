from flask_restful import Api, Resource, reqparse
from flask import Request
from urllib.parse import urlencode
import requests

import time, threading
import sqlite3 
import tensorflow as tf
import matplotlib.pyplot as plt
import os
import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.preprocessing import image
from tensorflow import keras

#from picamera import PiCamera
from cv2 import *
  
from numpy import exp
from time import sleep
from random import randrange
import shutil
import serial
import datetime

StartTime=time.time()
con = sqlite3.connect("skippi.db")
selectedIP = ""
dirname=os.path.dirname(__file__)
pathToModel = dirname+ '/ai/skipBotModelDataColorv22TF2_0_0BigColorv12.h5'
pathToImage =dirname+ '/holdImages/img.jpg'
print(pathToModel)
print(pathToImage)
model = keras.models.load_model(pathToModel, compile=False)

def action() :
  con = sqlite3.connect("skippi.db")
  con.row_factory = sqlite3.Row  
  cur = con.cursor()  
  cur.execute("SELECT running FROM run_status")  
  runStatus = cur.fetchall() 

  con.row_factory = sqlite3.Row  
  cur = con.cursor()  
  cur.execute("SELECT ip FROM tv_ip")  
  selectedIP = cur.fetchall() 

  con.row_factory = sqlite3.Row  
  cur = con.cursor()  
  cur.execute("SELECT cameraType, cameraNumber FROM camera_type")  
  cameraInfo = cur.fetchall() 

  con.row_factory = sqlite3.Row  
  cur = con.cursor()  
  cur.execute("SELECT skipMethod FROM skip_method")  
  skipMethodInfo = cur.fetchall() 

  con.row_factory = sqlite3.Row  
  cur = con.cursor()  
  cur.execute("SELECT hour , endTime FROM end_timer")  
  endTimerInfo = cur.fetchall() 

  if len(selectedIP)>0:
    selectedIP = selectedIP[0][0] 
  #need test here
  print('test')
  print(runStatus[0][0])

  if endTimerInfo[0][1] != 0:
    if datetime.datetime.strptime(endTimerInfo[0][1], "%Y-%m-%dT%H:%M:%S") < datetime.datetime.now():
        con.execute("DELETE FROM end_timer")
        cur = con.cursor()  
        cur.execute("INSERT into end_timer (hour,endTime) values (?,?)",("0","0"))  
        con.commit()

        con.execute("DELETE FROM run_status")
        cur = con.cursor()  
        cur.execute("INSERT into run_status (running) values (?)",("0"))  
        con.commit()   



  if runStatus[0][0] == "1":
    if cameraInfo[0][0] == 0:
      camera = PiCamera()
      camera.capture(pathToImage)
      camera.close()
    elif cameraInfo[0][0] == 1:
      #else use USB webcam
      cam = VideoCapture(cameraInfo[0][1])
      s, img = cam.read()

      if s:    # frame captured without any errors
        namedWindow("cam-test",CV_WINDOW_AUTOSIZE)
        imshow("cam-test",img)
        waitKey(0)
        destroyWindow("cam-test")
        imwrite(pathToImage,img) #save image


    img = image.load_img(pathToImage, target_size=(256,256) ,  grayscale=True) #,  grayscale=True
            
    X= image.img_to_array(img)
    X = np.expand_dims(X,axis=0)
    images = np.vstack([X])
   
    val = model.predict(images)
    print(softmax(val[0]))
    print(sum(val))
    val = sum(val)
   
    if val[1] == 1:
        print('SKIP')
        #if HID Microcontroller selected
        if skipMethodInfo[0][0] == 1:
          ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)
          ser.flush()
          ser.write(str(1).encode('utf-8'))
        #if WiFi over Roku is selected (Default)
        elif skipMethodInfo[0][0] == 0:
          print("http://" + selectedIP + ":8060/keypress/enter" )
          try:
              url =  "http://" + selectedIP + ":8060/keypress/enter" 
              res = requests.post(url, json='')
              print('response from server:',res.text)
          except:
              print('error on skip post')
              
          #shutil.move('/home/pi/Desktop/reactFlaskFinal/api/holdImages/img.jpg', "/media/pi/A986-6E38/MentoredTrainingData/Skip/img_S"+str(randrange(99999999999999))+".jpg")
          cur = con.cursor()
          cur.execute("UPDATE skip_count set skips = skips + 1 ")
          con.commit()   
    else:
        print('no skip')
        #shutil.move('/home/pi/Desktop/reactFlaskFinal/api/holdImages/img.jpg', "/media/pi/A986-6E38/MentoredTrainingData/NoSkip/img_S"+str(randrange(99999999999999))+".jpg")
        cur = con.cursor()
        cur.execute("UPDATE NOskip_count set NOskips = NOskips + 1 ")
        con.commit() 
    con.close()
    

def softmax(x):
    e_x = np.exp(x - np.max(x))
    return e_x / e_x.sum(axis=0)
 

class setInterval :
    def __init__(self,interval,action) :
        self.interval=interval
        self.action=action
        self.stopEvent=threading.Event()
        thread=threading.Thread(target=self.__setInterval)
        thread.start()

    def __setInterval(self) :
          nextTime=time.time()+self.interval
          while not self.stopEvent.wait(nextTime-time.time()) :
              nextTime+=self.interval
              self.action()

    def cancel(self) :
          self.stopEvent.set()



# start action every 0.6s
inter=setInterval(4,action)
#print('just after setInterval -> time : {:.1f}s'.format(time.time()-StartTime))

# will stop interval in 5s
#t=threading.Timer(0,inter.cancel)
#t.start()

class StartSkip(Resource):
 

  def post(self):
    con = sqlite3.connect("skippi.db")
    con.row_factory = sqlite3.Row  
    cur = con.cursor()  
    cur.execute("SELECT running FROM run_status")  
    runStatus = cur.fetchall() 
    print(runStatus[0][0])

    con.row_factory = sqlite3.Row  
    cur = con.cursor()  
    cur.execute("SELECT ip FROM tv_ip")  
    selectedIP = cur.fetchall() 
    selectedIP = selectedIP[0][0]
    print(selectedIP[0][0])

    if runStatus[0][0] == "0" :
      cur = con.cursor()
      cur.execute("UPDATE run_status set running = 1")
      con.commit() 
    else:
      cur = con.cursor()
      cur.execute("UPDATE run_status set running = 0")
      con.commit() 
    
          


    final_ret = {"runStatus":runStatus[0][0] }

    return final_ret
 

 
