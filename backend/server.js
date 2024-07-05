const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');
const db = require('./config/db');

const app = express();

app.use(bodyParser.json());
app.use(cors());

db.authenticate()
  .then(() => console.log('MySQL connected'))
  .catch(err => console.log('Error: ' + err));

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
