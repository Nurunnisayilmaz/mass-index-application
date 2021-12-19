const express = require('express');
const app = express()
const mongoose = require('mongoose');
const port = 3000
const cors = require('cors')
const bodyParser = require('body-parser');

app.use(cors())
app.use(bodyParser.json());
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/member');

const userRouter = require('./routes/userRouter');
const massRouter = require('./routes/massRouter');


app.use('/user', userRouter);
app.use('/mass',massRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})