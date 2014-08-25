# -*- coding: utf-8 -*-

import json
import urllib
import urllib2

import oauth2

API_HOST = 'api.yelp.com'
SEARCH_LIMIT = 1
SEARCH_PATH = '/v2/search/'
BUSINESS_PATH = '/v2/business/'

CONSUMER_KEY = 'wVk6-B-l7IOVgsrAa7g7Vg'
CONSUMER_SECRET = '1elMJNH54elPP1X8PO7I4p5l-rM'
TOKEN = 'Y-u3iZzZvSeuTwqVx1gQhosq8NxT08ci'
TOKEN_SECRET = 'n3lpAZfKydq-ji8Pukuyu94h26I'


def request(host, path, url_params=None):

    url_params = url_params or {}
    encoded_params = urllib.urlencode(url_params)

    url = 'http://{0}{1}?{2}'.format(host, path, encoded_params)

    consumer = oauth2.Consumer(CONSUMER_KEY, CONSUMER_SECRET)
    oauth_request = oauth2.Request('GET', url, {})
    oauth_request.update(
        {
            'oauth_nonce': oauth2.generate_nonce(),
            'oauth_timestamp': oauth2.generate_timestamp(),
            'oauth_token': TOKEN,
            'oauth_consumer_key': CONSUMER_KEY
        }
    )
    token = oauth2.Token(TOKEN, TOKEN_SECRET)
    oauth_request.sign_request(oauth2.SignatureMethod_HMAC_SHA1(), consumer, token)
    signed_url = oauth_request.to_url()

    conn = urllib2.urlopen(signed_url, None)
    try:
        response = json.loads(conn.read())
    finally:
        conn.close()

    return response

def get_business(business_id):

    business_path = BUSINESS_PATH + business_id

    return request(API_HOST, business_path)

def query_api(name):

    url_params = {
        'location': 'San Francisco, CA',
        'term': name,
        'limit': SEARCH_LIMIT
    }
    response = request(API_HOST, SEARCH_PATH, url_params=url_params)

    businesses = response.get('businesses')

    if not businesses:
        return

    business_id = businesses[0]['id']

    response = get_business(business_id)

    return response

