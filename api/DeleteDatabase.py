from flask_restful import Api, Resource, reqparse
import sqlite3 

con = sqlite3.connect("skippi.db")

class DeleteDatabase(Resource):
  def get(self):
    con = sqlite3.connect("skippi.db")
  
    cur = con.cursor()
    cur.execute("UPDATE skip_count set skips = skips * 0 ")
    con.commit() 

   
    cur = con.cursor()
    cur.execute("UPDATE NOskip_count set NOskips = NOskips * 0 ")
    con.commit() 

    return {
      'deleted': 200
      }

 
  
  