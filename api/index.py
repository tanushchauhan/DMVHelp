from flask import Flask
from flask import request
from flask import jsonify   
import json
from datetime import datetime



app = Flask(__name__)

@app.route("/api/pincode", methods = ['POST'])
def pincode():
    if request.method == 'POST':
        data = json.loads(str(request.data, encoding='utf-8'))

        pincode = data["pincode"]

        

        return jsonify({"pincode": pincode})
