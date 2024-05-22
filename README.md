API URL: https://stage-55gi.onrender.com


1. User Sign-Up

Endpoint: POST /api/user/signup

Description: This endpoint allows a new user to sign up by providing a username and password. It creates a new user account and returns an authentication token upon successful registration.
Request Body:
{ "username": "string", "password": "string" }

Response:

Success (201):
{ "token": "string", "message": "User registered successfully." }

Error (400):
User miss any of fields:{ "message": "please Enter all fields." }
User already exist:{
message: "user already exists please login" 
}

2. User Login

Endpoint: POST /api/user/login

Description: This endpoint allows an existing user to log in by providing a valid username and password. Upon successful authentication, it returns an authentication token. Request Body:
{ "username": "string", "password": "string" }

Response:

Success (201):
{ "token": "string", "message": "logged in sucessfully." }

Error (400):
For Invalid Email: { "message": "User dosent exist, Please signup and continue" }
For Invalid Password: {
message: "password is incorrect" 
} 

3. Add Show to List

Endpoint: POST /api/list/addList/:id

Description: This endpoint allows an authenticated user to add a TV show to their personal list by specifying the TV show's ID. The user must be logged in and provide the authentication token.
Parameters:
•	id (path): The ID of the show to add listed below.
•	use the authorization token in the header while sending the request.

List of movie Id:
{ '0': ObjectId("664ca3d872736a9fd43ab120"),
 '1': ObjectId("664ca3d872736a9fd43ab121"), 
'2': ObjectId("664ca3d872736a9fd43ab122"), 
'3': ObjectId("664ca3d872736a9fd43ab123"), 
'4': ObjectId("664ca3d872736a9fd43ab124"), 
'5': ObjectId("664ca3d872736a9fd43ab125"), 
'6': ObjectId("664ca3d872736a9fd43ab126"), 
'7': ObjectId("664ca3d872736a9fd43ab127"), 
'8': ObjectId("664ca3d872736a9fd43ab128"), 
'9': ObjectId("664ca3d872736a9fd43ab129") }

List of Tv Show Id:
{ '0': ObjectId("664caf7d72736a9fd43ab12a"), 
'1': ObjectId("664caf7d72736a9fd43ab12b"),
 '2': ObjectId("664caf7d72736a9fd43ab12c"),
 '3': ObjectId("664caf7d72736a9fd43ab12d"), 
'4': ObjectId("664caf7d72736a9fd43ab12e"),
 '5': ObjectId("664caf7d72736a9fd43ab12f"),
 '6': ObjectId("664caf7d72736a9fd43ab130"), 
'7': ObjectId("664caf7d72736a9fd43ab131"), 
'8': ObjectId("664caf7d72736a9fd43ab132"),
 '9': ObjectId("664caf7d72736a9fd43ab133") }

Headers:
•	Authorization: Bearer <token>

Response:

Success (200):
{ "message": "show added to list.", "user": {//user object } }

Error (401):
For Invalid User: { "message": "Authentication required." }

Error (400):
For Show not found: {
message: "No content found" 
}
For Show already in your list: {
message: "Show Was already in your List" 
}

4. Remove Show from List

Endpoint: POST /api/list/removeList/:id

Description: This endpoint allows an authenticated user to remove a TV show from their personal list by specifying the TV show's ID. The user must be logged in and provide the authentication token.

Parameters:
•	id (path): The ID of the show to remove listed below.
•	use the authorization token in the header while sending the request.

List of movie Id:
{ '0': ObjectId("664ca3d872736a9fd43ab120"),
 '1': ObjectId("664ca3d872736a9fd43ab121"), 
'2': ObjectId("664ca3d872736a9fd43ab122"), 
'3': ObjectId("664ca3d872736a9fd43ab123"), 
'4': ObjectId("664ca3d872736a9fd43ab124"),
 '5': ObjectId("664ca3d872736a9fd43ab125"),
 '6': ObjectId("664ca3d872736a9fd43ab126"),
 '7': ObjectId("664ca3d872736a9fd43ab127"), 
'8': ObjectId("664ca3d872736a9fd43ab128"),
 '9': ObjectId("664ca3d872736a9fd43ab129") }

List of Tv Show Id:
{ '0': ObjectId("664caf7d72736a9fd43ab12a"),
 '1': ObjectId("664caf7d72736a9fd43ab12b"),
 '2': ObjectId("664caf7d72736a9fd43ab12c"),
 '3': ObjectId("664caf7d72736a9fd43ab12d"),
 '4': ObjectId("664caf7d72736a9fd43ab12e"),
 '5': ObjectId("664caf7d72736a9fd43ab12f"),
 '6': ObjectId("664caf7d72736a9fd43ab130"),
 '7': ObjectId("664caf7d72736a9fd43ab131"),
 '8': ObjectId("664caf7d72736a9fd43ab132"),
 '9': ObjectId("664caf7d72736a9fd43ab133") }

Headers:
•	Authorization: Bearer <token>

Response:

Success (200):
{ "message": "show removed from list.", "user": {//user object } }

Error (401):
For Invalid User: { "message": "Authentication required." }

Error (400):
For Show not found in user List: {
message: "No content found in user List" 
}

5. Get User's List of Shows

Endpoint: GET /api/list/getList

Description: This endpoint allows an authenticated user to retrieve their personal list of TV shows. The user must be logged in and provide the authentication token.

Headers:
•	Authorization: Bearer <token>

Response:
Success (200):
{
message: "Fetched user's list",
myList:[ { "showId": "string", "title": "string", "description": "string", "genres": ["string"], "releaseDate": "date", "director": "string", "actors": ["string"] } ]
}

Error (401):
For Invalid User: { "message": "Authentication required." }

Error (400):
For Show not found in user List: {
message: "No show found in My list " 
}

