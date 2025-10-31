import express from 'express';
import connectDB from './config/db.js';
import Booking from './models/Booking.js';

const router = express();
const port = process.env.PORT || 3000;
app.use(express.json());

connectDB();

router.get('/', (req, res) => {
  res.send('Welcome to the Synergia Event Booking API');
});

router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/bookings', async (req, res) => {
  try {
    const { name, email, event, ticketType } = req.body;
    if (!name || !email || !event) {
      return res.status(400).json({ message: 'name, email and event are required' });
    }
    const newBooking = await Booking.create({ name, email, event, ticketType });
    res.status(201).json(newBooking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json(booking);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid booking id' });
  }
});

router.put('/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = (({ name, email, event, ticketType }) => ({ name, email, event, ticketType }))(req.body);
    
    Object.keys(updates).forEach(k => updates[k] === undefined && delete updates[k]);
    const updated = await Booking.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid request' });
  }
});

router.delete('/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await Booking.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ message: 'Booking not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid booking id' });
  }
});

router.get('/bookings/search', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: 'email query parameter required' });
    const bookings = await Booking.find({ email: { $regex: email, $options: 'i' } });
    res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/bookings/filter', async (req, res) => {
  try {
    const { event } = req.query;
    if (!event) return res.status(400).json({ message: 'event query parameter required' });
    const bookings = await Booking.find({ event: { $regex: event, $options: 'i' } });
    res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});
// import express from 'express';
// import mongoose from 'mongoose';
// import connectDB from './config/db.js';
// const app = express();
// const port = 3000;
// app.use(express.json());

// connectDB();
// app.get('/',(req,res)=>{
//     res.send('Welcome to the Student Management API');
// });


// app.listen(port,()=>{
//     console.log(`Express server running at http://localhost:${port}`);
//     connectDB();
// });

// let students=[
//     {
//         id:1,
//         name:"alice",
//         age:20,
//         course:"cs" ,
//         grade:"a",
//         email:"alice@emample.com",
//     },
//     {
//         id:2,
//         name:"bob",
//         age:22,
//         course:"ee",
//         grade:"b",
//         email:"bob@eample.com"
//     }
//     ,{
//         id:3,
//         name:"charlie",
//         age:23,
//         course:"me",
//         grade:"b",
//         email:"charlie@example.com"
//     }
// ]

// app.post('/students',(req,res)=>{
//     const {name,age,course,grade,email}=req.body;
//     if(!name||!age||!course||!grade||!email){
//         return res.status(400).json({message:"All fields are req"});

//     }
//     const newStudent ={
//         id:students.length+1,
//         name,
//         age,
//         course,
//         grade,
//         email
//     };
//     students.push(newStudent);
//     res.status(201).json({message:"student added",student:newStudent});
// });

// app.get('/students',(req,res)=>{
//     res.status(200).json(students);
// });
// app.put('/students/:name',(req,res)=>{
//     const index=students.findIndex((s)=>s.name==req.params.name);

//     if(index===-1){
//         return res.status(404).json({message:"student not found"});

//     }
//   const {name,age,course,grade,email}=req.body;
//     students[index]={
//         ...students[index],
//           name,
//         age,
//         course,
//         grade,
//         email
//     }
//     res.status(200).json({message:"student updated",student:students[index]});
// })
// app.delete('/students/:name',(req,res)=>{
//     const name=req.params.name;
//     const index=students.findIndex((s)=>s.name===name);
//     if (index===-1){
//         return res.status(404).json({message:"student not found"});
//     }
//     students.splice(index,1);
//     res.status(200).json({message:"student deleted"});
// });


