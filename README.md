# To do Fancy


List of user routes:

Route | HTTP | Description
-------- |---------|----------
/signup | GET | Sign up with new user info
/signin | GET |Sign in while get an access token based on credentials
user/todo | GET |Get all the task ( authenticated user only)
user/todo | POST | Create a task( authenticated user only)
user/todo/:id | DELETE | Delete a task( authenticated user only)
user/todo/:id | PUT | Update a task with new info( authenticated user only)
user/todo/status/:id | PUT | Update a status with new info(authenticated user only)


## Usage
With only npm:
```
npm install
npm start
```
Access the website via http://localhost:3000/ and http://localhost:3000/user .
