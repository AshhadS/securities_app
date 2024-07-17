# Securities App
This is a App for Securities app with front end in Vuejs and Backend in NodeJs so to run it please follow the below Backend & Front End Setup.
- [Nodejs] Folder: backend
- [VueJs] Folder: frontend


Cloning Codebase
------------

Clone the codebase from git
```bash
git clone https://github.com/AshhadS/securities_app.git
```

Database Setup
------------
 The backend has been written to access mysql table name is "securities" a sample export has been added. follow below steps to setup database.

1. Create a mysql database with the name "securities" user name "root" password "" this can be changed in the /config/db.js file
2. Import the file secirities.sql (found in the root) to the securities database


Backend Setup
------------

Import all dependancies backend
```bash
cd backend

npm install
```

Run the backend
```bash
npx nodemon server.js
```

The backend will be running on http://localhost:5000


Front End Setup
---------------

Import Vue Dependancies
```bash
cd frontend

npm install
```

Run the app
```bash
npm run serve
```

The front end will be accessible at http://localhost:8080/

Pages
- Login http://localhost:8080/login
- Register http://localhost:8080/register
- Users List http://localhost:8080/users
- Securities Table http://localhost:8080/securities



CoreUI Front End Setup
---------------

Import Vue Dependancies
```bash
cd frontend_coreui

npm install
```

Run the app
```bash
npm run serve
