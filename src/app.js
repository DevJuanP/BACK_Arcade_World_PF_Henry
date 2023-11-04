const express = require('express') 
const morgan = require('morgan') 
const cors = require('cors') 
const Stripe = require('stripe')
const routes = require('./routes/index.js') 
require('dotenv').config()
const { STRIPE_KEY } = process.env
const stripe = Stripe(STRIPE_KEY)

const server = express()
//server.use(express.static('public'));

server.use(express.json())
server.use(morgan('dev'))
server.use(cors({
  origin: '*',
  credentials: true,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE']
}))

server.use('/', routes)

server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });

module.exports = server