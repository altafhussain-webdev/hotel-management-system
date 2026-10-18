
let editbutton =null;
const rooms =document.getElementById("rooms");
rooms.addEventListener("submit",async function(event){
    event.preventDefault();
    const roomno =document.getElementById("roomno").value;
    const price =document.getElementById("price").value;
    const category =document.getElementById("category").value;
    const image =document.getElementById("image").value;

    const booking ={
        RoomNo:roomno,
        Price:price,
        Category:category,
        Image:image
    }
    console.log(booking)
    const response =await fetch("/api/room",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(booking)
    });
    const savedroom =await response.json();
    console.log(savedroom);
    alert("Rooms Added Successfully")
    rooms.reset();
    editbutton =null;
    document.getElementById("submit-button").textContent="Add room";

})



//DISPLAY ROOMS
fetch("/api/room")
.then(res =>res.json())
.then(rooms =>{
    console.log(rooms)
    const roomList =document.getElementById("admin-room-list");
    rooms.forEach((room) =>{
        roomList.innerHTML +=`  
        <tr>
        <td><img src="${room.Image}"class ="card-img-top" style="height:80px; width:80px; object-fit:cover"
        </td>
        <td>${room.RoomNo}</td>
        <td>${room.Price}</td>
        <td>${room.Category}</td>
        <td>${room._id}</td>

        <td><button class="btn btn-success" onclick ="editroom('${room._id}')">edit</button></td>
        <td><button class="btn btn-danger" onclick ="deleteroom('${room._id}')">delete</button></td>
</tr>
        `
    })
});

//Edit Rooms
async function editroom(id)
{
    const response =await fetch(`/api/room/${id}`);
    const booking =await response.json();
    console.log(booking);
    document.getElementById("roomno").value=booking.RoomNo;
    document.getElementById("price").value=booking.Price;
    document.getElementById("category").value=booking.Category;
    document.getElementById("image").value=booking.Image;
    editbutton =id;
    document.getElementById("submit-button").textContent ="update room";

}

//Delete Rooms
async function deleteroom(id){
    const response =await fetch(`/api/delete/${id}`,{
 method:"Delete"
    });
    const result =await response.json();
    console.log(result);
    alert("Room Deleted");
    location.reload();
}

//Customer Booking
fetch("/api/booking")
.then(res => res.json())
.then(bookings=>{
    console.log(bookings)
    const roomList =document.getElementById("admin-rooms-list")
    bookings.forEach((booking) =>{
         roomList.innerHTML +=`  
        <tr>
    
        <td>${booking.Name}</td>
        <td>${booking.Contact}</td>
        <td>${booking.Address}</td>
        <td>${booking.RoomID}</td>
        <td>${booking.TotalGuests}</td>


</tr>`
        
    })
});
