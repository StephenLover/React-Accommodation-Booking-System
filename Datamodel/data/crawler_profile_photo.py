#!/usr/bin python
# -*- coding: utf-8 -*-

'''
This module is to crawler the profile photo from the specific website.
'''

import requests
from bs4 import BeautifulSoup
import os
import re
from time import sleep

def save_jpg(picUrl, name):
    ''''''
    fileName = str(name) + '.jpg'
    path = os.sep.join(["photo", fileName])
    with open(path, "wb") as f:
        f.write(requests.get(picUrl).content)

headers={
'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 BIDUBrowser/8.7 Safari/537.36'
}

# http://www.gx8899.com/touxiang/153391.html
#pages = ['http://www.gx8899.com/touxiang/151398.html', 'http://www.gx8899.com/touxiang/148210.html']
pages = ['http://www.gx8899.com/touxiang/155191.html']
count = 95
for page in pages:

    print (page)
    html = requests.get(page, headers=headers, stream=True).text
    sleep(0.5)
    tags = BeautifulSoup(html, "html.parser").findAll('img')

    for tag in tags:
        #print (tag)
        url = tag['src']
        if "http" in url:
            save_jpg(url, count)
            count += 1




'''pages = [\'https://pixabay.com/en/photos/inside%20house/?&pagi={}\'.format(x) for x in range(1,5)]
count = 1
for page in pages:

    html = requests.get(page, headers=headers, stream=True).text
    tags = BeautifulSoup(html, "html.parser").findAll("img") ## for .. in bs

    for tag in tags:
        picUrlAttrs = tag.attrs
        #print (picUrlAttrs)
        for ky,vl in picUrlAttrs.items():
            if vl[-3:] == 'jpg':
                #picUrl = picUrlAttrs['srcset'].split()[-2]
                save_jpg(vl, count)
                count += 1'''
