import requests
from bs4 import BeautifulSoup
import os
import re
from time import sleep

def save_jpg(picUrl, name):
    ''''''
    fileName = str(name) + '.jpg'
    path = os.sep.join(["image_", fileName])
    with open(path, "wb") as f:
        f.write(requests.get(picUrl).content)

headers={
'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 BIDUBrowser/8.7 Safari/537.36'
}


pages = ['https://www.houzz.com/photos/living/p/{}'.format(x * 18) for x in range(0,21)]
count = 757
for page in pages:
    print (page)
    html = requests.get(page, headers=headers, stream=True).text
    sleep(2)
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
