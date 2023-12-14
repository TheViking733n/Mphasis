'''
This file contains default values for various configuration options.

'''


# Input dataset google sheet urls
INVENTORY_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1abfWjKouFxD_erzhdnam8tCtFC5G_956/edit#gid=2096778584'
SCHEDULE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/19jmopenGv7VnXOWeBmPpsicmCZycEfOl/edit#gid=2051886986'
PNR_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1E3Vnx5WA0ntOG42A_oyNI1VCNMn_UY6938mt9Mxz2gs/edit#gid=0'
PASSENGER_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1SB4k3Rf3dzIskoJfLFByiqjA3SFiSwlj/edit#gid=1455340004'
RESCHEUDLE_SHEET_URL = ''


#Rules for ranking    
PNR_RANKING = {
    'score' : [ 200, 1750, 1750, 1750, 750, 750, 750, 100, 200, 500, 50, 1750 ],
    'enabled' : [ True, True, True, True, True, True, True, True, True, True, True, True ],
}