# Forum App
This is a App for Securities app with front end in Vuejs and Backend in NodeJs so to run it please follow the below Backend & Front End Setup.
- [Nodejs](Folder: backend) 
- [VueJs](Folder: frontend)

Backend Setup
------------

Clone the codebase from git
```bash
git clone https://github.com/AshhadS/securities_app.git
```

Import all dependancies backend
```bash
cd backend

npm install
```

Setup the database
 The backend has been written to access mysql table name is "securities" a sample export has been added. follow below steps to setup database.

1. Create a mysql database with the name "securities" user name "root" password "" this can be changed in the /config/db.js file
2. Import the file secirities.sql to the database


Run the backend
```bash
npx nodemon server.js
```

The backend will be running on http://localhost:5000


Front End Setup
---------------


Import React Dependancies
```bash
cd frontend

npm install
```

Run the app
```bash
npm run serve
```

The front end will be accessible at http://localhost:8080/
