# -*- coding: utf-8 -*-

from flask import Flask, render_template
import urllib, urllib2, json
import yelp_api

app = Flask(__name__)
SF_TRUCK_API = 'http://data.sfgov.org/resource/rqzj-sfat.json?facilitytype=TRUCK&status=APPROVED&$$app_token='
SF_TRUCK_API_KEY = '0msvwSY2jAUo0rKXd4b1KKmX7'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/trucks')
def load_trucks():
    url = SF_TRUCK_API + SF_TRUCK_API_KEY
    data = json.load(urllib2.urlopen(url))
    return json.dumps(data)

@app.route('/trucks/<truck>')
def load_truck_data(truck):
    data = yelp_api.query_api(truck)
    return json.dumps(data)

app.run(debug=True)

if __name__ == '__main__':
    app.run()
