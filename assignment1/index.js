import express from 'express';
const app = express();
const port = 3000;
app.use(express.json());

let bookings = [
    {
        id:1,
        name:"Devhost",
        place:"ground floor seminar hall"
    },
    {
        id:2,
        name:"Hackfest",
        place:"first floor conference room"
    },
    {
        id:3,
        name:"TechTalk",
        place:"second floor auditorium"
    },
    {
        id:4,
        name:"InnoTech",
        place:"third floor innovation lab"
    }
];
app.get('/', (req, res) => {
    const {name, place} = req.query;
    if(!name || !place) {
        return res.status(400).send("Please provide both 'name' and 'place' query parameters.");
    }
    const filteredBookings = bookings.filter(booking => 
        booking.name.toLowerCase().includes(name.toLowerCase()) &&
        booking.place.toLowerCase().includes(place.toLowerCase())
    );
    res.json(filteredBookings);
});
app.post('/bookings', (req, res) => {
    const { name, place } = req.body;
    if (!name || !place) {
        return res.status(400).send("Please provide both 'name' and 'place' in the request body.");
    }
    const newBooking = {
        id: bookings.length + 1,
        name,
        place
    };
    bookings.push(newBooking);
    res.status(201).json(newBooking);
});

app.get('/bookings/:id', (req, res) => {
    const bookingId = parseInt(req.params.id);
    const booking = bookings.find(booking => booking.id === bookingId);
    if (!booking) {
        return res.status(404).send("Booking not found.");
    }
    res.json(booking);
});

app.put('/bookings/:id', (req, res) => {
    const bookingId = parseInt(req.params.id);
    const { name, place } = req.body;
    const booking = bookings.find(booking => booking.id === bookingId);
    if (!booking) {
        return res.status(404).send("Booking not found.");
    }
    if (name) booking.name = name;
    if (place) booking.place = place;
    res.json(booking);
}); 

app.delete('/bookings/:id', (req, res) => { 
    const bookingId = parseInt(req.params.id);
    const bookingIndex = bookings.findIndex(booking => booking.id === bookingId);   
    if (bookingIndex === -1) {
        return res.status(404).send("Booking not found.");
    }
    bookings.splice(bookingIndex, 1);
    res.status(204).send();
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});