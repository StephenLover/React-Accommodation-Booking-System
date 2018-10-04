import os
import pandas as pd

import random
import string
import numpy as np
import time
import urllib
from urllib.request import urlopen
import json


with open("success_json.json") as f:
    responseJson = json.load(f)
    print (responseJson)
    print (responseJson.get("status") == "OK")
