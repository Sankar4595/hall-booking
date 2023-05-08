require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const {dbURL} = require('./db');
const HallBook = require('./HallbookingSchema');
const app = express();
mongoose.connect(dbURL);

const home = `
    <h1>Welcome to Hall Booking API 💡💡💡</h1>
    <br/>
    <p>GET - /hall-details</p>
    <p>POST - /new-hall</p>
    <p>PUT - /book-hall/:id</p>
`
app.get('/', (req, res) => res.send(home))
app.listen(process.env.PORT,()=>console.log(`App Listening ${process.env.PORT}`));

//Data Insert JSON TYPE in POST methode
app.use(express.json());

// const data = [
//     {
//         "id": "1",
//         "noOfSeats": "100",
//         "amenities": ["Ac", "Chairs"],
//         "price": "1000rs/hr",
//         "customerName": "Sankar",
//         "ifBooked": "true",
//         "date": "04-may-2022",
//         "startTime": "07-may-2022",
//         "endTime": "08-may-2022",
//         "roomId": "100",
//         "roomName": "duplex"
//     },
//     {
//         "id": "2",
//         "noOfSeats": "10",
//         "amenities": ["Ac", "Chairs"],
//         "price": "2000rs/hr",
//         "customerName": "Narayanan",
//         "ifBooked": "false",
//         "date": "04-may-2022",
//         "startTime": "07-may-2022",
//         "endTime": "08-may-2022",
//         "roomId": "102",
//         "roomName": "duplex"
//     },
//     {
//         "id": "3",
//         "noOfSeats": "103",
//         "amenities": ["Ac", "Chairs"],
//         "price": "2000rs/hr",
//         "customerName": "",
//         "ifBooked": "false",
//         "date": "",
//         "startTime": "",
//         "endTime": "",
//         "roomId": "107",
//         "roomName": "duplex"
//     }
// ];

//Get all Hall Details

app.get('/hall-details',async function(req,res){
    const result = await HallBook.find({})
        // console.log(result);
    res.send(result);
    
});

// New Hall Insert 

app.post('/new-hall',async (req,res)=>{
    try {
        const newHall = await HallBook.create({
            noOfSeats :req.body.noOfSeats,
            amenities :req.body.amenities,
            price :req.body.price,
            ifBooked : req.body.ifBooked,
            customerName :req.body.customerName,
            date: req.body.date,
            startTime : req.body.startTime,
            endTime :req.body.endTime,
            roomId : req.body.roomId,
            roomName : req.body.roomName,
        })
        res.status(201).send({
            message : 'Created a New Hall'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message : 'Internal Server Error'
        })
    }
    
});


//Book Hall

app.put('/book-hall/:id',async(req,res)=>{
    
    const halls = await HallBook.findOne({_id:req.params.id});

    if(halls.ifBooked==='true'){
      return res.status(400).send({
        message : 'Hall is already Booked'
      })
    }
    else{
        halls.date = req.body.date
        halls.startTime = req.body.startTime
        halls.endTime = req.body.endTime
        halls.customerName = req.body.customerName
        halls.ifBooked = 'true'

        await halls.save();

        return res.status(200).send({
            message : 'Hall is Booked ✌✌✌'
        });
    }
})

