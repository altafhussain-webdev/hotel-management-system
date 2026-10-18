const mongoose = require('mongoose');

module.exports = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const Room = mongoose.model('Room', new mongoose.Schema({
      RoomNo: String, Price: String, Image: String, Category: String
    }), 'rooms');
    await Room.deleteMany({});
    await Room.insertMany([
      { RoomNo: "101", Price: "5000", Image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32", Category: "Standard" },
      { RoomNo: "102", Price: "6000", Image: "https://images.unsplash.com/photo-1590490360182-c33d57733427", Category: "Deluxe" },
      { RoomNo: "201", Price: "10000", Image: "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db", Category: "VIP" },
      { RoomNo: "202", Price: "12000", Image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39", Category: "VIP" }
    ]);
    res.json({ success: true, message: "4 Rooms Added to Atlas from Vercel!" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}