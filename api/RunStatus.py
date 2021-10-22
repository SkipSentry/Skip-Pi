from flask_restful import Api, Resource, reqparse
import sqlite3 

con = sqlite3.connect("skippi.db")

class RunStatus(Resource):
  def get(self):
    con = sqlite3.connect("skippi.db")
    con.row_factory = sqlite3.Row  
    cur = con.cursor()  
    cur.execute("SELECT running FROM run_status")  
    runStatus = cur.fetchall() 

    return {
      'runStatus': runStatus[0][0]
      }

 
  
  