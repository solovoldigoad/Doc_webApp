
import mongoose, { Mongoose, model } from "mongoose";

const SlotSchema = new mongoose.Schema({
    date: { type: String , required: true },
    day:{type: String , required: true},
    StartTime: { type: String , required: true },
    EndTime: { type: String , required: true},
    username:{ type: String , required: true},
    booked: {type: Boolean , default: false},
    location:{ type: String},
    phone: {type : Number},
    gender: {type: String}
} ,{
    timestamps: true
}
);


export const Slot = mongoose.model('Slot' , SlotSchema)
