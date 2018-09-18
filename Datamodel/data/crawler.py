import requests
from bs4 import BeautifulSoup
import pandas as pd

def framework(URL):
    '''爬虫通用代码框架'''
    try:
        r = requests.get(URL)
        r.raise_for_status()
        r.encoding = r.apparent_encoding
        return r.text
    except:
        return "产生异常"

def getBS(address):
    return BeautifulSoup(framework(address), "html.parser")


'''
URLRandwick = "http://www.street-directory.com.au/nsw/randwick/a"
## inter the homepage
soup = getBS(URLRandwick)
## get the Tag of the alphabet list
alphabet = soup.find("div", id="alphabet")
for tags1 in alphabet.find_all('a'):
    firstURL =  tags1.get("href")
    firstSoup = getBS(firstURL)'''


URL = "http://www.street-directory.com.au/nsw"

alphabetSet = ["A","B","C","D","E","F","G","H","I","J","K","L","M",
               'N','O','P','Q','R','S','T']
remainderSet = ["M", "T"]
## inter the homepage
soup = getBS(URL)
## get the Tag of the alphabet list
alphabet = soup.find("div", id="alphabet")
for tags1 in alphabet.find_all('a'):
    list1 = []
    list2 = []
    ## "E", "M", "T"
    if tags1.string not in remainderSet:
        continue
    print ("Start crawler Suburb...", tags1.string)
    firstURL =  tags1.get("href")
    firstSoup = getBS(firstURL)

    surburbsList = firstSoup.find("div", id="suburbs_by_id")
    for suburbTag in surburbsList.find_all("a"):
        suburbName = suburbTag.string
        secondURL = suburbTag.get('href')

        ## inter the homepage
        soup = getBS(secondURL)
        ## get the Tag of the alphabet list
        alphabet = soup.find("div", id="alphabet")
        for tags2 in alphabet.find_all('a'):
            #print (tags2.string, end=' ')
            thirdURL =  tags2.get("href")
            firstSoup = getBS(thirdURL)

            streetNameList = firstSoup.find("div", id="suburbs_by_id")
            for streetNameTag in streetNameList.find_all("a"):
                streetName = streetNameTag.string

                list1.append(suburbName)
                list2.append(streetName)
    print ("   ...Saving Suburb", tags1.string)
    newdata = pd.DataFrame({"suburb":list1,
                            "address name":list2})
    newdata.to_csv("street_name" + tags1.string + ".csv")
    del list1[:]
    del list2[:]
