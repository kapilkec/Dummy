const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const Employee = require('./models/Employee.js')
const app = express();
app.use(express.json())
app.use(cors())

//mongodb connection
mongoose.connect("mongodb+srv://kapil:kapil@crud.uwvjbel.mongodb.net/EmployeeDetails?retryWrites=true&w=majority",{
    useNewUrlParser: true,
}).then( ()=>console.log('db connected'))
.catch ( e => console.log("```not connected to db``"+e))


//adding data 
app.post('/add',async (req,res) => {
    console.log("post method called")
    const  newEmployee = new Employee({
        name:req.body.name,
        age:req.body.age,
        email:req.body.email,
        mobile:req.body.mobile,
        gender:req.body.gender
    })
    try{
        await newEmployee.save()
        res.send("new Data succesfully added")
    }catch( e){
        console.log("```````````"+e)
        res.send(e)
    }
    
})



//reading data
app.get('/read', async (req,res) => {
    Employee.find({}, (err,result) => {
        if(err) res.send(err)
        res.send(result)
    })
})

//update
app.put('/update',async (req,res) => {
   
    try{ 
        console.log(req.body)
        
        if(req.body._id == null ) {
            res.send("invalid id");
            return;
            }   
        await  Employee.findById(req.body._id,async (err,obj) => {
        obj.name = req.body.name,
        obj.age = req.body.age,
        obj.email = req.body.email,
        obj.mobile = req.body.mobile,
        obj.gender  = req.body.gender
        await obj.save()
        res.send("updated")
       
     
        }) 
        
    }
    catch( e){
        console.log("error in updating to db"+e);
         
    }
})


// app.put('/update',async (req,res) => {
   
//     try{ 
//         await  FoodModel.findById(req.body.id, (err,obj) => {
    
//             obj.name = req.body.name,
//             obj.age = req.body.age,
//             obj.email = req.body.email,
//             obj.mobile = req.body.mobile,
//             obj.gender  = req.body.gender
//             obj.save()
//             res.send("success")
//         })
        
//     }
//     catch( e){
//         console.log("error in updating to db"+e);
//     }
// })


//deleting data
app.delete('/delete/:id',async (req,res) => {
    await Employee.findByIdAndRemove(req.params.id).exec();
    res.send("deleted")
})



app.listen(3001, () => {
    console.log("port listening to 3001")
})
