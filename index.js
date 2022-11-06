require('dotenv').config()
require('./config/dbConfig')();
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5500

app.use(cors(corsOptions))

app.use(helmet())
app.use(morgan('common'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

//routes
app.use('/user', require('./routes/userRoutes'))
app.use('/resume', require('./routes/resumeRoutes'))

app.all('*', (req, res) => {
   res.status(404).json({ status: false, message: 'resource not found'})
})

mongoose.connection.once('open', () => {
   console.log('Database connected')
   app.listen(PORT, () => console.log(`server running on port - ${PORT}`))
})

