const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');

const connectDB = require('./config/db');
const transactions = require('./routes/transactions');

dotenv.config({ path: './config/config.env' });

connectDB();

const corsOptions = {
  origin: 'https://shradhakatyal.github.io/expense-tracker'
}

const app = express();

app.use(express.json());

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors(corsOptions));
app.use('/api/v1/transactions', transactions);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode`.yellow.bold);
  console.log(`Running on port ${PORT}`.yellow.bold);
});
