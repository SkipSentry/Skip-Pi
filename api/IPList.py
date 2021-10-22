from flask_restful import Api, Resource, reqparse
import requests

class IPList(Resource):
  def get(self):
    listOfIP = []
    for x in range(1, 51):
      print(x) 
      try:
        url =  "http://192.168.1." + str(x) + ":8060" 
        res = requests.get(url, json='', timeout=1)
        print('response from server:',res.text)
        if res.status_code == requests.codes.ok:
          listOfIP.append("192.168.1."+str(x))
      except:
        continue

    return {
      'listOfIP': listOfIP,
      
      }

  