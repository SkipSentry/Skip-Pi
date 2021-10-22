from flask_restful import Api, Resource, reqparse
import sqlite3 

con = sqlite3.connect("skippi.db")
class Count(Resource):
  def get(self):
    con = sqlite3.connect("skippi.db")
    con.row_factory = sqlite3.Row  
    cur = con.cursor()  
    cur.execute("SELECT skips FROM skip_count")  
    skipCount = cur.fetchall() 
    skipCount = skipCount[0][0]

    con.row_factory = sqlite3.Row  
    cur = con.cursor()  
    cur.execute("SELECT NOskips FROM NOskip_count")  
    noSkipCount = cur.fetchall() 
    noSkipCount = noSkipCount[0][0]
    
    return {
      'skip':skipCount ,
      'NOskip': noSkipCount
      }

  
