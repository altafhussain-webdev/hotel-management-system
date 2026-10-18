const params =new URLSearchParams(window.location.search);
const bookingId =params.get("id");
console.log("Selected BookingId",bookingId);
const orderForm =document.getElementById("orderForm");
orderForm.addEventListener("submit",async(event)=>{
    event.preventDefault();
    const name =document.getElementById("name").value
    const contact =document.getElementById("contact").value
    const address =document.getElementById("address").value
    const TotalGuests =document.getElementById("TotalGuests").value
    const booking ={
        RoomID:bookingId,
        Name:name,
        Contact:contact,
        Address:address,
        TotalGuests:TotalGuests

    }
    console.log(booking)
    const response =await fetch("/api/booking",{
        method:"POST",
        headers:{
            "content-Type":"application/json"
        },
        body:JSON.stringify(booking)
    });
    const savedbooking =await response.json();
    alert("Order placed Successfully")
    orderForm.reset();
    
})