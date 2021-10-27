const express = require('express')

const app = express()

const port  = 3000
const indexRouter = require('./index');
const catalogRouter = require('./catalog');  //Import routes for "catalog" area of site

app.use('/', indexRouter);
app.use('/catalog', catalogRouter);  // Add catalog routes to middleware chain.

app.listen(port, () =>{
    console.log(`Server is running on ${port}`)
})