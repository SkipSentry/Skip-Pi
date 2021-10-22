from flask_restful import Api, Resource, reqparse
from flask import request
import json
import sqlite3 

con = sqlite3.connect("skippi.db")

class EndTimer(Resource):
  def get(self):
    con = sqlite3.connect("skippi.db")
    con.row_factory = sqlite3.Row  
    cur = con.cursor()  
    cur.execute("SELECT hour FROM end_timer")  
    endTimerInfo = cur.fetchall() 
    if len(endTimerInfo) > 0:
      return {
        'hour': endTimerInfo[0][0],
        }
    else:
       return {
        'hour': "",
        }

  def post(self):
    con = sqlite3.connect("skippi.db")
    request_json = request.data
    request_json = request_json.decode("utf-8")
  
    request_json = json.loads(request_json)
    con.execute("DELETE FROM end_timer")
    cur = con.cursor()
    hourStr = request_json['hour']
    endTimeStr = request_json['endTime']
  
    cur.execute("INSERT INTO end_timer (hour,endTime) values (?,?)",(hourStr,endTimeStr,))
    con.commit() 
   

 

 
