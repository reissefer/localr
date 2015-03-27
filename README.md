#Localr Documentation

##Introduction
Localr is a location based rewards system built using to Node.js. NOSql databases have been used, Neo4j for the group/relationship aspects and CouchDB for storage of documents like, users, businesses and offers. The API offers the ability for businesses to sign up and add new offers. The users can then checkin to businesses and get points which can then be used to redeem the offers other the businesses have entered through the API.

##Users

###Add New User:

URL:
```json
http://api.adam-holt.co.uk/users
```
METHOD: `POST`

#####(Username will be taken from the auth header)

HEADERS:
```json
{"authorization": "Basic xxxxxx", "content-type": "application/json"}
```

BODY:
```json
{
     "city": "Birmingham",
     "dob": "31.05.1991",
     "firstname": "Adam",
     "surname": "Holt",
     "email": "adamholt@me.com"
}
```

RESPONSE: `201 Created`
```json
{
    "register": "OK",
    "date_joined": "Fri, 27 Mar 2015 11:08:59 GMT",
    "last_modified": "Fri, 27 Mar 2015 11:08:59 GMT",
    "nodeid": 128,
    "username": "adam5",
    "firstname": "Adam",
    "surname": "Holt",
    "city": "Birmingham",
    "dob": "31.05.1991",
    "email": "test@email.com"
}
```
RESPONSE: `406 Not Acceptable`
```json
{
    "code": "NotAcceptableError",
    "message": "Not all requirements supplied!"
}
```

RESPONSE: `409 Conflict`
```json
{
    "code": "ConflictError",
    "message": "User already exists!"
}
```


###Get User:

URL:
```json
http://api.adam-holt.co.uk/users/get?username=USERNAME
```

METHOD: `GET`

###Check in user:

URL:
```json
http://api.adam-holt.co.uk/users/checkin
```

METHOD: `PUT`

###Delete User:

URL:
```json
http://api.adam-holt.co.uk/users/delete?username=USERNAME
```

METHOD: `DEL`

##Businesses

These all assume you have set the basic auth headers and ('content-type' = 'application/json')

###Add Business:

url: http://api.adam-holt.co.uk/business/

authorization: getBasic('testbusiness', 'test'), "content-type": "application/json"

body: points: 50, city: "coventry", address: "blahhh", postcode: "B23 5XR", longitude: 40.000, latitude: 1.020, email: "adamholt@me.com"

method: PUT

###Delete Business

url: http://api.adam-holt.co.uk/business/delete?businessname=BUSINESSNAME

method: DEL


##Offers

###Add Offers

URL:
```json
http://api.adam-holt.co.uk/business/offers
```
METHOD: `POST`

#####(Business will be taken from the auth header)
HEADERS:
```json
{"authorization": "Basic xxxxxx", "content-type": "application/json"}
```
BODY:
```json
{
     "businessname": "testbusiness",
     "description": "description",
     "title": "test offer",
     "cost": 25
}
```
RESPONSE `201 Created`
```json
{
    "Added": "OK",
    "Offer_Title": "Friday - thursday",
    "Offer_Description": "testestest",
    "Date_Added": "Fri, 27 Mar 2015 11:25:28 GMT"
}
```

RESPONSE: `401 Unauthorized`
```json
{
    "code": "UnauthorizedError",
    "message": "You must only add your own offers"
}
```

###Get Offers
######Here a user can get all the offers available
URL:
```json
http://api.adam-holt.co.uk/business/offers/all
```
HEADERS:
```json
{"authorization": "Basic xxxxxx", "content-type": "application/json"}
```
METHOD: `GET`

RESPONSE: `200 OK`
```json
{
    "total_Offers": 2,
    "offers": [
        {
        "title": "Tuesday test - coventry",
        "description": "Tuesday test",
        "points_cost": 100,
        "businessname": "coventry",
        "last_modified": "Tue, 24 Mar 2015 10:40:53 GMT"
        },
        {
        "title": "testst - rfthurdsday",
        "description": "testestest",
        "points_cost": 20,
        "businessname": "rfthurdsday",
        "last_modified": "Thu, 26 Mar 2015 16:42:57 GMT"
        }
    ]
}
```
###Get Businesses Offers
######Here a user can get all the offers available from a specific business
URL:
```json
http://api.adam-holt.co.uk/business/offers/BUSINESS-NAME-HERE
```
HEADERS:
```json
 {"authorization": "Basic xxxxxx", "content-type": "application/json"}
```
METHOD: `GET`

RESPONSE: `200 OK`
```json
{
    "total_Offers": 1,
    "offers": [
        {
        "title": "Fridady - thursday",
        "description": "testestest",
        "businessname": "thursday",
        "last_modified": "Fri, 27 Mar 2015 11:26:00 GMT"
        }
    ]
}
```
###Redeem Offers 
######This part of the API allows users to redeem offers that they want to by supplying the 'offerTitle' in the body that is sent to the server.

URL:
```json
http://api.adam-holt.co.uk/business/offers/redeem
```
HEADERS:
```json
{"authorization": "Basic xxxxxx", "content-type": "application/json"}
```
METHOD: `PUT`

BODY: 
```json
{"offerTitle": "test offer - testbusiness"}
```

RESPONSE: `202 Accepted`

```json
{
    "Redeem": "OK",
    "username": "adam",
    "business": "tesco",
    "points_taken": 20,
    "total_points": 3890
    }
```

RESPONSE: `401 Unauthorized`

```json
{
    "code": "UnauthorizedError",
    "message": "Invalid username/password"
}
```

RESPONSE `403 Forbidden`

```json
{
    "code": "ForbiddenError",
    "message": "You don't have enough points to redeem this offer"
}
```

RESPONSE: `404 Not Found`

```json
{
    "code": "NotFoundError",
    "message": "Offer Not Found"
}
```




###Check Offers Redeemed

URL:
```json
http://api.adam-holt.co.uk/users/get
```
HEADERS:
```json
{"authorization": "Basic xxxxxx", "content-type": "application/json"}
```
METHOD: `GET`

RESPONSE: `200 OK`

 ```json
{
    "id": "adam5",
    "date_joined": "Fri, 27 Mar 2015 11:08:59 GMT",
    "last_modified": "Fri, 27 Mar 2015 11:44:02 GMT",
    "points": 30,
    "transactions": [
        {
        "transactionid": "906e1380-d476-11e4-a248-374a0843ba7b",
        "date": "Fri, 27 Mar 2015 11:44:02 GMT",
        "amount_of_points": 50,
        "checked_in_at": "coventry"
        },
        {
        "transactionid": "998cd2d0-d476-11e4-a248-374a0843ba7b",
        "date": "Fri, 27 Mar 2015 11:44:17 GMT",
        "offer": "Wednesday 2 - tesco",
        "amount_of_points": -20,
        "business_redeemed": "tesco"
        }
    ]
}
```

##Groups

###Add Groups

RL:
```json
http://api.adam-holt.co.uk:8080/groups
```
METHOD: `POST`

#####(Username will be taken from the auth header)

HEADERS:
```json
{"authorization": "Basic xxxxxx", "content-type": "application/json"}
```

BODY:
```json
{
     "username": "testuser",
     "groupname": "testgroup",
     "description": "This is a Test Group",
     "competition": "freshers"
}
```

RESPONSE: `201 Created`
```json
{
    "Group": {
        "uri": "http://localhost:5984/groups/testgroup",
        "body": "{"groupname":"testgroup",
        "description":"This is a Test Group",
        "date_joined\":\"Fri, 27 Mar 2015 13:52:01 GMT",
        "last_modified":"Fri, 27 Mar 2015 13:52:01 GMT",
        "createdby":"testuser",
        "grouppoints":0,
        "transactions":[],
        "usersjoined":["testuser"],
        "competition":"freshers",
        "groupnodeid":133
        }"
    }
}
```
RESPONSE: `406 Not Acceptable`
```json
{
    "code": "NotAcceptableError",
    "message": "Not all requirements supplied!"
}
```

RESPONSE: `400 Bad Request`
```json
{
    "code": "BadRequest",
    "message": "Competition Not Found"
}
```

###Join Groups

url: http://api.adam-holt.co.uk/groups

headers: authorization: getBasic('testuser2', 'test'), "content-type": "application/json"

body:  username: "testuser2", groupname: "testgroup2", description: "This is a Test Group 2", competition: "freshers"

method: PUT

###Get Groups

url: http://api.adam-holt.co.uk/groups/testgroup

headers: authorization: getBasic('testbusiness', 'test'), "content-type": "application/json"

method: GET

###View Groups

url: http://api.adam-holt.co.uk/groups?competition=freshers

headers:  authorization: getBasic('testuser', 'test'), "content-type": "application/json"

method: GET



##FOR GETTING ALL OFFERS FROM CODIO WITH BUSINESSNAME
http://api.adam-holt.co.uk:5984/offers/_design/offers/_view/business?startkey=%22codio%22&endkey=%22codio%22

##READ THIS:
http://mark-kirby.co.uk/2013/creating-a-true-rest-api/



