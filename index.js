import express from "express"
import dotenv from "dotenv"
import  cors from "cors"

app.use(cors())
dotenv.config()
const app = express()
app.use(express.json())

let users =[
    {
        id:1,
        name:"John Doe",
        email:"johndoe@example.com"
    },
    {
        id:2,
        name:"Jane Smith",
        email:"janesmith@example.com"
    }
]

app.get("/users",(req,res)=>{
    res.status(200).json({
        success:true,
        data:users
    })
})

app.get("/users/:id",(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=>user.id === id)

    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }

    res.status(200).json({
        success:true,
        data:user
    })

})

app.post("/users",(req,res)=>{
    const{name,email} = req.body
    const newUser ={
        id: users.length+1,
        name,
        email
    }
    users.push(newUser)
    res.status(201).json({
        success:true,
        data:newUser
    })
})
app.put("/users/:id",(req,res)=>{
    const id = Number(req.params.id);
    const {name ,email} = req.body;
    const user = users.find((user)=>user.id === id)
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    user.name = name ;
    user.email = email ;
    res.status(200).json({
        success:true,
        data:user
    })
})
app.listen(process.env.PORT,()=>{
     console.log("Server is running on port 3000")
})