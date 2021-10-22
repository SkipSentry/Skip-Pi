from flask_restful import Api, Resource, reqparse
from flask import request
import json
import sqlite3 

con = sqlite3.connect("skippi.db")

class SkipMethod(Resource):
  def get(self):
    con = sqlite3.connect("skippi.db")
    con.row_factory = sqlite3.Row  
    cur = con.cursor()  
    cur.execute("SELECT skipMethod FROM skip_method")  
    skipMethodInfo = cur.fetchall() 
    if len(skipMethodInfo) > 0:
      return {
        'skipMethod': skipMethodInfo[0][0],
        }
    else:
       return {
        'skipMethod': "",
        }

  def post(self):
    con = sqlite3.connect("skippi.db")
    request_json = request.data
    request_json = request_json.decode("utf-8")
  
    request_json = json.loads(request_json)
    con.execute("DELETE FROM skip_method")
    cur = con.cursor()
    skipMethodStr = request_json['skipMethod']
    print(skipMethodStr)
    cur.execute("INSERT INTO skip_method (skipMethod) values (?)",(skipMethodStr,))
    con.commit() 
   

 

 
