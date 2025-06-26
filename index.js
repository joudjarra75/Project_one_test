//import
const express = require('express');
//obj from express
const app = express();
const lectureRouter = require('./router/lecture');
app.use(express.json());

app.use('/lectures',lectureRouter);
const port = 5000

//run server
app.listen(port,()=> console.log("server is running"));

//127.0.0.1:3000/


//localhost/lectures/1