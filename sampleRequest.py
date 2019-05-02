import requests, json, pprint

url = 'http://10.40.104.70:8000/api/hosts/'
headers = {
    'Content-Type': 'application/json; charset=utf-8'
}
data = {
    'hosts': ['3.3.3.3', '4.4.4.4']
}

response = requests.post(url, data=json.dumps(data), headers=headers)

print('-----------------------------status------------------------------')
pprint.pprint(response.status_code)
print('-----------------------------type--------------------------------')
pprint.pprint(type(response.text))
print('-----------------------------data--------------------------------')
# pprint.pprint(type(response.text))
print(json.loads(response.text))
print('-----------------------------json--------------------------------')
pprint.pprint(response.json)

