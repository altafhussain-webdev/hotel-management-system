console.log("Script connected");
fetch("/api/room")
.then(res =>res.json())
.then(rooms =>{
    console.log(rooms);
    const roomList =document.getElementById("roomList");
    const viproomList =document.getElementById("viproomList");
     roomList.innerHTML ="";
     viproomList.innerHTML ="";

    rooms.forEach((room) =>{
         const card =`
                <div class="card" style="width: 18rem;">
  <img src="${room.Image}" class="card-img-top" alt="...">
  <div class="card-body  id="room-btn">
    <h5 class="card-title">Room No:${room.RoomNo}</h5>
    <h5 class="card-text">Price:${room.Price}</h5>
 <a href="#" class="btn btn-primary"
 onclick =buyroom('${room._id}') >Order Now</a>
  </div>
</div>
`
if([13,14,15,16,17,18,19,20]
    .includes(Number(room.RoomNo))){
    viproomList.innerHTML +=card;
}
else{
    roomList.innerHTML +=card;
}
    })
});

function buyroom(id){
    window.location.href =`booking.html?id =${id}`;
}