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

const users = [];

app.use(express.static(join(__dirname, "www")));
app.get("/", (req, res) => {
  res.sendFile(join(__dirname + "/www", "index.html"));
});

io.on("connection", (socket) => {
  let user = socket.id;
  console.log("a user connected", user);
  // socket.broadcast.emit('chat message','SALUT!');
  socket.on("disconnect", () => {
    console.info("user disconnected");
    //TODO : supprimer le user dans Users.
  });
  socket.on('chat message', (msg) => {
    let ps = users.find(pseudo => pseudo.id == socket.id);
    let pseudo = ps ? ps.user : 'Anonymous';
    io.emit('chat message', {user: pseudo} , msg);
  });
  socket.on('ref user', (id, user) => {
    users.push({id, user});
    console.table(users);
  });
//   let timer = setInterval(() => {io.emit("chat message", "C'est chiant hein?")}, 1500);
  let timer = setTimeout(() => {io.to(user).emit('myID', socket.id)}, 1000);
});

server.listen(portNumber, () => {
  console.log(`Server is running on port ${portNumber}`);
});
