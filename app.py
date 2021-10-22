#!/usr/bin/python3
from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
import sqlite3  
from flask import request , jsonify
from api.StartSkip import StartSkip
from api.RunStatus import RunStatus
from api.Count import Count
from api.IPPost import IPPost
from api.IPList import IPList
from api.IP import IP
from api.DeleteDatabase import DeleteDatabase
from api.CameraConfig import CameraConfig
from api.SkipMethod import SkipMethod
from api.EndTimer import EndTimer
import json
import requests

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
api = Api(app)

con = sqlite3.connect("skippi.db")

@app.route("/", defaults={'path':''})
@app.route("/<path:path>")
@app.errorhandler(404)   
def serve(path):
    return send_from_directory(app.static_folder,'index.html')


api.add_resource(StartSkip, '/api/skip/skip') 
api.add_resource(Count, '/api/skip/count') 
api.add_resource(RunStatus, '/api/skip/runStatus') 
api.add_resource(DeleteDatabase, '/api/database/delete') 
#api.add_resource(IPPost, '/api/ipAddress/ipp') 
api.add_resource(IPList, '/api/ipAddress/ipList') 
api.add_resource(IP, '/api/ipAddress/ip') 
api.add_resource(CameraConfig, '/api/camera/cameraConfig') 
api.add_resource(SkipMethod, '/api/skip/method') 
api.add_resource(EndTimer, '/api/skip/timer') 

@app.route('/api/ipAddress/ipp', methods=['POST'])
def add_entry():
    print("p0")
    con = sqlite3.connect("skippi.db")
    request_json = request.data
    request_json = request_json.decode("utf-8")
  
    request_json = json.loads(request_json)
    print(request_json['selectedIpAddress'])
    con.execute("DELETE FROM tv_ip")
    cur = con.cursor()
    ipStr = request_json['selectedIpAddress']
    cur.execute("INSERT INTO tv_ip values (?)",(ipStr,))
    con.commit() 
    #request_json = json.loads(request_json )
    #value1           = request_json.get('selectedIpAddress')
    try:
        url =  "http://"+request_json['selectedIpAddress'] + ":8060" 
        print(url)
        res = requests.get(url, timeout=5)
        
        if res.status_code == requests.codes.ok:
            return '{"ipValid":true}'
        else:
            return '{"ipValid":false}'
    except:
         return '{"ipValid":false}'


    #return jsonify(request_json.decode("utf-8"))
    #return jsonify(request_json)



def databaseSetup():
    con.execute("CREATE TABLE IF NOT EXISTS run_status (running TEXT)")  
    con.execute("CREATE TABLE IF NOT EXISTS tv_ip (ip TEXT)")
    con.execute("CREATE TABLE IF NOT EXISTS skip_count (skips INT DEFAULT 0)")
    con.execute("CREATE TABLE IF NOT EXISTS NOskip_count (NOskips INT DEFAULT 0)")
    con.execute("CREATE TABLE IF NOT EXISTS camera_type (cameraType INTEGER DEFAULT 0, cameraNumber INTEGER DEFAULT 0)")
    con.execute("CREATE TABLE IF NOT EXISTS skip_method (skipMethod INTEGER DEFAULT 0)")
    con.execute("CREATE TABLE IF NOT EXISTS end_timer (hour INTEGER DEFAULT 0, endTime INTEGER DEFAULT 0)")
    con.execute("DELETE FROM run_status")

    con.row_factory = sqlite3.Row  
    cur = con.cursor()  
    cur.execute("SELECT hour FROM end_timer")  
    endTimerRows = cur.fetchall() 

    if len(endTimerRows) == 0:
        cur = con.cursor()  
        cur.execute("INSERT into end_timer (hour,endTime) values (?,?)",("0","0"))  
        con.commit()

    con.row_factory = sqlite3.Row  
    cur = con.cursor()  
    cur.execute("SELECT skipMethod FROM skip_method")  
    rowsMethod = cur.fetchall() 

    if len(rowsMethod) == 0:
        cur = con.cursor()  
        cur.execute("INSERT into skip_method (skipMethod) values (?)",("0"))  
        con.commit() 
    
    con.row_factory = sqlite3.Row  
    cur = con.cursor()  
    cur.execute("SELECT cameraType, cameraNumber FROM camera_type")  
    rowsCameraType = cur.fetchall() 

    if len(rowsCameraType) == 0:
        cur = con.cursor()  
        cur.execute("INSERT into camera_type (cameraType,cameraNumber) values (?,?)",("0","0"))  
        con.commit()  
     
    con.row_factory = sqlite3.Row  
    cur = con.cursor()  
    cur.execute("SELECT NOskips FROM NOskip_count")  
    rowsNoSkip = cur.fetchall() 

    if len(rowsNoSkip) == 0:
        cur = con.cursor()  
        cur.execute("INSERT into NOskip_count (NOskips) values (?)",("0"))  
        con.commit()   
    
    con.row_factory = sqlite3.Row  
    cur = con.cursor()  
    cur.execute("SELECT skips FROM skip_count")  
    rowsSkip = cur.fetchall() 
   
    if len(rowsSkip) == 0:
        cur = con.cursor()  
        cur.execute("INSERT into skip_count (skips) values (?)",("0"))  
        con.commit()  
          
   
    cur = con.cursor()  
    cur.execute("INSERT into run_status (running) values (?)",("0"))  
    con.commit()   
    
          




databaseSetup()
