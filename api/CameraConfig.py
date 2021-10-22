from flask_restful import Api, Resource, reqparse
from flask import request
import json
import sqlite3 

con = sqlite3.connect("skippi.db")

class CameraConfig(Resource):
  def get(self):
    con = sqlite3.connect("skippi.db")
    con.row_factory = sqlite3.Row  
    cur = con.cursor()  
    cur.execute("SELECT cameraType,cameraNumber FROM camera_type")  
    cameraInfo = cur.fetchall() 
    if len(cameraInfo) > 0:
      return {
        'cameraType': cameraInfo[0][0],
        'cameraNumber': cameraInfo[0][1]
        }
    else:
       return {
        'cameraType': "",
        'cameraInfo':""
        }

  def post(self):
    con = sqlite3.connect("skippi.db")
    request_json = request.data
    request_json = request_json.decode("utf-8")
  
    request_json = json.loads(request_json)
    print(request_json['cameraType'])
    con.execute("DELETE FROM camera_type")
    cur = con.cursor()
    cameraTypeStr = request_json['cameraType']
    cameraNumberStr = request_json['cameraNumber']
    cur.execute("INSERT INTO camera_type (cameraType,cameraNumber) values (?,?)",(cameraTypeStr,cameraNumberStr))
    con.commit() 
   

 

 
