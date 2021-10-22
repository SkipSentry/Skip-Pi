from flask_restful import Api, Resource, reqparse
from flask import request , jsonify

parser = reqparse.RequestParser()
parser.add_argument("selectedIpAddress", type=str)
class IPPost(Resource):
 
  def post(self):
    #print(self)
    
  

    args = parser.parse_args()

    print(args)
    # note, the post req from frontend needs to match the strings here (e.g. 'type and 'message')

    t = args['selectedIpAddress']
   
    # ret_status, ret_msg = ReturnData(request_type, request_json)
    # currently just returning the req straight
    print(t)
   
    
    final_ret = {"status": "Success", "message": t}

    return final_ret
 