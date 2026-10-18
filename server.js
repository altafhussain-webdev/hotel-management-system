const express =require("express");
const mongoose =require("mongoose");
const app =express();
app.use(express.json());
app.use(express.static("public"))
async function connectDb(){
    await mongoose.connect("mongodb://localhost:27017/Maple_Hotel");
    console.log("mongodb connected");
}
connectDb();
const roomSchema =mongoose.Schema({
RoomNo:Number,
Price:Number,
Category:String,
Image:String
})
const room =mongoose.model("room",roomSchema)
const bookroom =mongoose.Schema({
RoomId:String,
Name:String,
Contact:Number,
Address:String,
TotalGuests:Number

})
const order =mongoose.model("order",bookroom)
app.get("/api/room",async(req,res)=>{
    const findroom =await room.find();
    res.json(findroom);
    console.log("room find successfully")
})
app.post("/api/room",async(req,res)=>{
    const saveroom =await new room(req.body);
    saveroom.save();
    res.json(saveroom);
    console.log("rooms save successfully")
})
app.get("/api/room/:id",async(req,res)=>{
const id =req.params.id;
const rooms =await room.findById(id);
res.json(rooms);
})
app.post("/api/booking",async(req,res)=>{
    const booking =new order(req.body)
    await booking.save();
    res.json(booking)
})
app.get("/api/booking",async(req,res)=>{
    const bookings =await order.find();
    res.json(bookings)
})

app.delete("/api/delete/:id",async(req,res)=>{
const id =req.params.id;
await room.findByIdAndDelete(id)
res.json({
    message:"Product Delete Successfully"
})
})

// app.get("/home",(req,res)=>{
//     console.log("Wellcome to home page")
// })



app.listen(3016,(req,res)=>{
console.log("server is running")
})