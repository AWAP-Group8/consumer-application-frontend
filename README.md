# consumer-application-frontend

## Introduction of the project: 
The GoGoShip is a web-based application that simulates an automated parcel delivery locker system. The system includes applications for `consumer users`, `delivery drivers`, a `parcel locker touchscreen simulator`, and a `parcel generator "robot"`. Parcels are transported more efficiently from senders to receivers with the help of a parcel delivery service, guaranteeing prompt and safe delivery. These services provide easy door-to-door solutions for both consumers and corporations by utilizing a network of carriers. This test plan outlines the testing approach, test cases, and requirements for ensuring the system's functionality, performance, and security.  

## Technologies used in the project:
### User Interface: 
   We designed a draft in notebook pen and tried to proceed accordingly for save time.
### Front-end:
   - `React.js`
   - `Framework`
### Back-end:
   - `Node.js`
   - `Express.js`
   - `Axios.js`
### Database:
   - `MySQL`
### Deployment:
   - `Microsoft Azure Cloud Service`
   - `Render Service`
### Testing:
   - `Selenium`
   - `Postman`
   - `JIRA`

## Implementation tools for the Project:
- Version Control System: `Git & GitHub`
- Project Management Tool: `Kanban Board`
- Code Editor: `Visual Studio Code`
- API Testing: `Postman`
- Database Design Tool: `MySQL Workbench`

## The architecture of The Project:
<img width="452" alt="image" src="https://github.com/AWAP-Group8/consumer-application-frontend/assets/143256533/3af80d1f-4ab2-4c0c-927a-69cbcc33fea9">

## Project Interface Description:
In this project, three parts of the front-end portion have been worked such as `consumer user’s application`, `driver application` and `touchscreen view`. For these three parts, we developed one backend and store date in database. We create a parcel generator robot, which shows how a parcel can be automatically created. We also use testing. 

  ### Consumer service:
  This part we have added `register` and `login` functionality for users. After login, a user can `create parcel` according to his/her needs, `delete` own account, `track parcels`, `view the history` of receiving or `sending parcels` and users also `receive reminders` when there is a parcel waiting to be picked up. 

## Testing: 
In the automated testing phase, the front-end React application underwent testing for two consumer functionalities: user registration and login. The back-end API was tested for three endpoints, covering registration, login, and account deletion. Additionally, automated tests were conducted for rendering components related to the touchscreen functionality.
Link of this Test Document:  https://github.com/AWAP-Group8/Test-plan-document.git

## Deployment:
For deployment, we use Render Service.

## GitHub Link: 
   `https://github.com/orgs/AWAP-Group8/repositories`
## Front-end application links:
  ### Consumer users: 
   `https://consumer-application-frontend.onrender.com/`

## How to install and use this Application:
### Step 1:
  `Clone` the project form the project repository.
  
### Step 2:
  #### Install the following dependencies:
    Axios.js
    Bootstrap
    react
    React-dom
    React-router-dom
    Stream-http
    Stream-browserify
    
### Step 3:
  Go to the server folder and do: `npm init-y` and npm install express.
  #### Install the following dependencies:
  - Chai
  - Chai-http
  - Mocha
  - Cors
  - Dotenv
  - Express
  - Express-jwt
  - Jsonwebtoken
  - Mysql 
  - Nodemailer

### Step 4:
  #### Create local database: Start mysql and create a database.js file in the server folder and modify the “aaa” portion as needed:
    const mysql = require(“mysql”)
    const connection = mysql.createConnection({
    host: “aaa”
    user: “aaa”
    password: “aaa”
    database: “aaa”
    });
    module.exports = connection;
    
### Step 5:
  When start application, run the following command:
   - cd server
   - `node index.js`
   - `cd ..`
   - `npm start or yarn start`
