from flask_restful import Api, Resource, reqparse
import sqlite3 

con = sqlite3.connect("skippi.db")

class IP(Resource):
  def get(self):
    con = sqlite3.connect("skippi.db")
    con.row_factory = sqlite3.Row  
    cur = con.cursor()  
    cur.execute("SELECT ip FROM tv_ip")  
    selectedIP = cur.fetchall() 
    if len(selectedIP) > 0:
      return {
        'tvIP': selectedIP[0][0]
        }
    else:
       return {
        'tvIP': ""
        }

 

 
