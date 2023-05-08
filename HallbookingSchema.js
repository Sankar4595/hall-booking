const mongoose = require('mongoose');

const HollbookingSchema = new mongoose.Schema({
    noofSeats : {type : String,required: false},
    amenities : {type : String,required: true},
    price : {type : String,required: true},
    customerName : {type : String,required: false},
    ifBooked : {type : String,required: false},
    date : {type : String,required:false},
    startTime : {type : String,required: false},
    endTime : {type : String,required: false},
    roomId : {type : String,required: true},
    roomName : {type : String,required: true}

})

const HollBook = mongoose.model(('halls'),HollbookingSchema);
module.exports = HollBook;