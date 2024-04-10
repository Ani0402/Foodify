import express from 'express';
import connectDB from './db.js';
import createRouter from './routes/CreateUser.js';
import displayRouter from './routes/DisplayData.js';
import orderRouter from './routes/OrderData.js';

const app = express();
 
app.use((req,res,next)=>{
   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");

   res.header("Access-Control-Allow-Headers",
     "Origin,X-Requested-With,Content-Type,Accept"
    ) 
    next();
})

const PORT=4000;

connectDB()

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use('/api',createRouter)

app.use('/api',displayRouter)

app.use('/api',orderRouter)

app.listen(PORT,()=>{
    console.log('listening on port '+PORT)
})