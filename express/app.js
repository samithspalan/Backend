import express from 'express';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
const app = express();
const port = 3000;
app.use(express.json());

connectDB();
app.get('/',(req,res)=>{
    res.send('Welcome to the Student Management API');
});







app.listen(port,()=>{
    console.log(`Express server running at http://localhost:${port}`);
    connectDB();
});

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


