const http=require("http")
const express=require("express");
const {Server}=require("socket.io")


const app=express();
const server=http.createServer(app);
const io=new Server(server)

app.use(express.static("./public"))

app.get('/',(req,res)=>{
    return res.sendFile("./public/index.html")
})

io.on("connection",(socket)=>{
    console.log(`A new user connected with id : ${socket.id}`)
    socket.on('message',(input)=>{
        socket.broadcast.emit("recieve",input)
    })
})

server.listen(9000, ()=>console.log("Serever is listening on port 9000"))