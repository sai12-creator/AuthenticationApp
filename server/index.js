const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRouter = require('./Routes/authRoute')
const bodyParser = require("body-parser")


const app = express();



//MIDDLE WARE
dotenv.config()
app.use(cors());
app.use(express.json())



//ROUTES
app.use('/api/auth', authRouter)

//MONGO DB CONNECTION
mongoose.connect(process.env.DB_CONNECT).then(()=> console.log("MONGODB connected"))
.catch((error) => console.log("Failed to connect DB", error));


//SERVER
const PORT = 3000;
app.listen(PORT, ()=> console.log("server Up and running"))



//GLOBAL ERROR HANDLING
// app.use((err, req, res, next)=>{
//  err.statusCode = err.statusCode || 500;
//  err.status = err.status || 'error';

//  res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message
//  });
// })
app.use((err, req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });

    next(); // Pass the error to the next error handler, if any
});