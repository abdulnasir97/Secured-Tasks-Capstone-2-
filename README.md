Secured Tasks App 
<br>
<br>
Here is the live link:
https://tasks-green.vercel.app/

The picture below shows the first page once the app is opened.

![1](https://github.com/abdulnasir97/tasks/assets/120065583/dcc17c60-e669-48fd-aa77-32647b6c1bf0)

The picture below shows the login screen.

![2](https://github.com/abdulnasir97/tasks/assets/120065583/5378caa2-c81f-4227-b2ae-8c9e01b0384c)

The picture below shows the sign up screen.

![3](https://github.com/abdulnasir97/tasks/assets/120065583/a841da4e-c27b-42e3-bf3f-be2e826453f4)

The picture below shows the user homepage once logged in, it shows a task already added to show the edit and delete functionality. You can also see the Logout button on the bottom right if user wants to logout so another user can log in.

![4](https://github.com/abdulnasir97/tasks/assets/120065583/2f209fd8-e40e-453f-bb71-6d94cca78e16)

App Summary:
<br>
This app allows you to create an account using an email and password of your choice to be able to create, read, update, and delete your own personalized list of multiple tasks. Each user has their own unique list which stays saved in the app for upto 30 days. Once created, each account stays saved in the app for 30 days as well. 

Simply login or sign up and you will be taken to your personal list. Once there, you can add as many tasks as you would like and edit and delete them as you wish while ensuring only you have access to them.
<br>
<br>
<br>
<br>

Technology used:
This app was creating by using the PERN stack. The RESTful API was created using the database made in PostgreSQL. 
Express was used to manage the server and routes.
React was used as the main framework to build the applicaiton. Javascript, HTML, and CSS were used within React. 
Node Js was also used to run the program and install the necessary dependencies. 
<br>
<br>
<br>
<br>




API Documentation for Secured Tasks App
Welcome to the API documentation for the Secured Tasks App. This API allows you to manage your tasks with authentication, utilizing JWT tokens for security. Below, you'll find detailed information on the available endpoints, their functionality, and how to interact with them.
<br>
<br>

Table of Contents 
<br>
<br>
Authentication
<br>

Endpoints
<br>

Create a Todo
<br>

Retrieve All Todos
<br>

Retrieve a Todo
<br>

Update a Todo
<br>

Delete a Todo
<br>

HTTP Status Codes
<br>

Glossary
<br>
<br>
Authentication
The API requires authentication using JWT tokens. Tokens should be included in the Authorization header of each request.
<br>
<br>

Endpoints
<br>
Create a Todo
<br>
<br>
Endpoint: POST /todo
<br>
Description: Creates a new todo for the authenticated user.
<br>

Request Body:
<br>

description: Todo description (string)
<br>

Response:
<br>

message: Success message
<br>

todo: Created todo object
<br>

HTTP Status: 200 OK
<br>
<br>
Retrieve All Todos
<br>
<br>

Endpoint: GET /todo
<br>
Description: Retrieves all todos for the authenticated user.
<br>
Response:
<br>
todos: Array of todo objects
<br>
HTTP Status: 200 OK
<br>
<br>
Retrieve a Todo
<br>
Endpoint: GET /todo/:id
<br>
Description: Retrieves a specific todo by ID for the authenticated user.
<br>
Response:
<br>
todo: Todo object
<br>
HTTP Status: 200 OK
<br>
<br>

Update a Todo
<br>
<br>
Endpoint: PUT /todo/:id
<br>
Description: Updates a specific todo by ID for the authenticated user.
<br>
Request Body:
<br>
description: Updated todo description (string)
<br>
Response:
<br>
message: Success message
<br>
todo: Updated todo object
<br>
HTTP Status: 200 OK
<br>
<br>
<br>

Delete a Todo
<br>
<br>
Endpoint: DELETE /todo/:id
<br>
Description: Deletes a specific todo by ID for the authenticated user.
<br>
Response:
<br>
message: Success message
<br>
HTTP Status: 200 OK
<br>
<br>
<br>

HTTP Status Codes
200 OK: Successful request
400 Bad Request: Malformed request
401 Unauthorized: Missing or invalid JWT token
404 Not Found: Resource not found
500 Internal Server Error: Server error
<br>
<br>

Glossary
JWT: JSON Web Token, a compact, URL-safe means of representing claims to be transferred between two parties.
Bcrypt: A password-hashing function designed to be slow and computationally intensive, suitable for securely hashing passwords.



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
