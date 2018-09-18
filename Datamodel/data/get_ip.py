
import json
from urllib2 import urlopen

def get_info_on_ip():
    """
    return suburb(string), region(string), lat(float), lng(float)

    data like the following:
    {
      "ip": "129.94.8.169",
      "hostname": "uniwide-pat-pool-129-94-8-169.gw.unsw.edu.au",
      "city": "Kingsford",
      "region": "New South Wales",
      "country": "AU",
      "loc": "-33.9240,151.2270",
      "org": "AS23859 University of New South Wales"
    }
    """
    url = "http://ipinfo.io/json"
    response = urlopen(url)
    data = json.load(response)

    ip = data['ip']
    suburb = data['city']
    region = data['region']

    loc = data['loc'].split(",")
    lat, lng = float(loc[0]), float(loc[1])
    return suburb, region, lat, lng
