import os
import pandas as pd
from collections import Counter
import numpy as np

dataPath = './data/'
fileMergedName = 'street_name_popular.csv'
path = 'street_name/'
files = os.listdir(dataPath + path)

## merge all the data
Data = pd.DataFrame()
for file in files:
    tempData = pd.read_csv(dataPath + path +file)
    Data = pd.concat([Data, tempData])
Data = Data.drop('Unnamed: 0', axis=1)
Data.to_csv(fileMergedName, index=False)

## clean the data
fileName = 'street_name_popular.csv'
data = pd.read_csv(fileName)
## clean the road name
street_name = data['address name'].tolist()
possible = []
## remove 'Highway', 'Trail', 'Track',
roadType = ['Avenue', 'Crescent', 'Lane', 'Parade', 'Place', 'Road', \
'Street', 'Alley', 'Alleyway', 'Amble', 'Anchorage', 'Approach', 'Arcade', 'Artery', \
'Basin', 'Beach', 'Bend', 'Block', 'Boulevard', 'Brace', 'Brae', 'Break', 'Bridge', \
'Broadway', 'Brow', 'Bypass', 'Byway', 'Causeway', 'Centre', 'Centreway', 'Chase', \
'Circle', 'Circlet', 'Circuit', 'Circus', 'Close', 'Colonnade', 'Common', 'Concourse', \
'Copse', 'Corner', 'Corso', 'Court', 'Courtyard', 'Cove', 'Crest', 'Cross', 'Crossing', \
'Crossroad', 'Crossway', 'Cruiseway', 'Cutting', 'Dale', 'Dell', 'Deviation', 'Dip', \
'Distributor', 'Drive', 'Driveway', 'Edge', 'Elbow', 'End', 'Entrance', 'Esplanade', \
'Estate', 'Expressway', 'Extension', 'Fairway', 'Firetrail', 'Flat', 'Follow', 'Footway', \
'Foreshore', 'Formation', 'Freeway', 'Front', 'Frontage', 'Gap', 'Garden', 'Gardens', \
'Gate', 'Gates', 'Glade', 'Glen', 'Grange', 'Green', 'Ground', 'Grove', 'Gully', 'Heights', \
'Highroad', 'Hill', 'Interchange', 'Intersection', 'Junction', 'Key', 'Landing', 'Laneway', \
'Lees', 'Line', 'Link', 'Little', 'Lookout', 'Loop', 'Lower', 'Mall', 'Meander', 'Mew', \
'Mews', 'Motorway', 'Mount', 'Nook', 'Outlook', 'Park', 'Parklands', 'Parkway', 'Part', \
'Pass', 'Path', 'Pathway', 'Piazza', 'Plateau', 'Plaza', 'Pocket', 'Point', 'Port', \
'Promenade', 'Quad', 'Quadrangle', 'Quadrant', 'Quay', 'Quays', 'Ramble', 'Ramp', 'Range', \
'Reach', 'Reserve', 'Rest', 'Retreat', 'Ride', 'Ridge', 'Ridgeway', 'Ring', 'Rise', 'River', \
'Riverway', 'Riviera', 'Roads', 'Roadside', 'Roadway', 'Ronde', 'Rosebowl', 'Rotary', 'Round', \
'Route', 'Row', 'Rue', 'Run', 'Siding', 'Slope', 'Sound', 'Spur', 'Square', 'Stairs', 'Steps', \
'Strand', 'Strip', 'Subway', 'Tarn', 'Terrace', 'Thoroughfare', 'Tollway', 'Top', 'Tor', 'Towers', \
'Trailer', 'Triangle', 'Trunkway', 'Turn', 'Underpass', 'Upper', 'Vale', 'Viaduct', \
'View', 'Villas', 'Vista', 'Wade', 'Walk', 'Walkway', 'Way', 'Wharf', 'Wynd', 'Yard']
for street in street_name:
    streetSplit = street.split()
    if len(streetSplit) > 1 and streetSplit[-1] in roadType:
        possible.append(1)
    else:
        possible.append(0)
data['possible'] = possible

data = data[data['possible'] == 1]
data = data.drop(["possible"], axis=1)

## clean the suburb

popular_suburb = [
"Auburn",
"Bankstown",
"Baulkham Hills",
"Blacktown",
"Campbelltown",
"Castle Hill",
"Darlinghurst",
"Liverpool",
"Manly",
"Mascot",
"Newcastle",
"North Ryde",
"North Sydney",
"Parramatta",
"Penrith",
"Pyrmont",
"Randwick",
"Surry Hills",
"Sydney",
"Wollongong",
"Kingsford"
]
suburb_name = data['suburb'].tolist()
possible = []
'''for i in suburb_name:
    if "Creek" in i.split():
        possible.append(0)
    else:
        possible.append(1)'''
for i in suburb_name:
    if i in popular_suburb:
        possible.append(1)
    else:
        possible.append(0)
data['possible'] = possible

data = data[data['possible'] == 1]
data = data.drop(["possible"], axis=1)
print (data.shape)

## extend the data
roadNumber = [i for i in range(1, 30, 2)]
initiallList = [np.nan] * len(roadNumber) * data.shape[0]
streetNumberList = roadNumber * data.shape[0]
streetName = data['address name'].tolist()
streetNameList = [x for x in streetName for _ in range(len(roadNumber))]
suburbName = data['suburb'].tolist()
suburbNameList = [x for x in suburbName for _ in range(len(roadNumber))]
data = {"streetNumber": streetNumberList,
        "streetName": streetNameList,
        "suburbName": suburbNameList,
        "status": initiallList,
        "postcode": initiallList,
        "lat": initiallList,
        "lng": initiallList}

data = pd.DataFrame(data)

data.to_csv(fileName, index=False)
