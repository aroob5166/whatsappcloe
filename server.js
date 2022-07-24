// importing
import  express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from 'pusher'
import cors from 'cors';



// app config
const app= express();


const pusher = new Pusher({
    appId: "1439194",
    key: "3dc003aee16a33ac4cc1",
    secret: "ebacc0d00ef52f259ee3",
    cluster: "ap2",
    useTLS: true
  });

// middleware
app.use(express.json());
app.use(cors())
// kPe7f4nBnwXLE0Yh
// aFYmQV5ELAfsxxxH
// DB config
const connection_url='mongodb+srv://admin3:aFYmQV5ELAfsxxxH@cluster0.gouev.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
    
})

const db = mongoose.connection

db.once('open', () => {
    console.log('DB connected');

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        console.log("A Change occured", change);

        if(change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted',
            {
                name:messageDetails.name,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
                received:messageDetails.received,
                

            });
    } else {
        console.log('Error triggering Pusher')
    }
    });
});





//????

// api routes
app.get('/',(req,res)=> res.status(200).send('hello world'));
app.get('/messages/sync',(req,res)=>{
    Messages.find((err,data) => {
        if(err){
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
    
})
app.post('/messages/new',(req,res)=>{
    const dbMessage=req.body

    Messages.create(dbMessage,(err,data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})
const PORT = process.env.PORT||9000;

if(process.env.NODE_ENV == "production"){
    app.use(express.static("whatsapp-mern/build"));

   
}




//listen
app.listen(port,()=>console.log(`Listening on localhost : ${port}`));
