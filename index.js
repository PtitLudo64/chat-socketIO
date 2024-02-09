import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

const portNumber = 1234;

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(join(__dirname, "www")));
app.get("/", (req, res) => {
  res.sendFile(join(__dirname + "/www", "index.html"));
});

io.on("connection", (socket) => {
  let user = socket.id;
  console.log("a user connected", user);
  // socket.broadcast.emit('chat message','SALUT!');
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on('chat message', (msg) => {
    io.emit('chat message', {user: user} , msg);
  });
//   let timer = setInterval(() => {io.emit("chat message", "C'est chiant hein?")}, 1500);
  let timer = setTimeout(() => {io.to(user).emit('myID',user)}, 2000);
});

server.listen(portNumber, () => {
  console.log(`Server is running on port ${portNumber}`);
});
