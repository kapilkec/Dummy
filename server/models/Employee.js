const mongoose = require('mongoose')

const Employee =new  mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    }
})

const EmployeeTable = mongoose.model("Employees",Employee)

module.exports = EmployeeTable