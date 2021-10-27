const express = require('express')

const app = express()

var indexRouter = require('./index');
var catalogRouter = require('./catalog');  //Import routes for "catalog" area of site

app.use('/', indexRouter);
app.use('/catalog', catalogRouter);  // Add catalog routes to middleware chain.