# To do Fancy
Manage your Task

## REST API

List of user routes:

Route | HTTPS | Description
-------- |---------|----------
/signup | POST | Sign up with new user info
/signin | POST |Sign in while get an access token based on credentials
/user/todo | POST |Create to do for user
/users/todo | GET |Get list to do for user
/users/todo/:id | PUT | Edit selected to do
/users/todo/:id | DELETE | Delete selected to do



## Usage
With only npm:
```
npm install
npm start
```
Access the website via https://todo.maxville.net/.
