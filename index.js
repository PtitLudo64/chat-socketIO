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
  let userSocket = socket.id;
  socket.on("disconnect", () => {
    let toDelete = users.findIndex((u) => u.socketId == userSocket);
    users.splice(toDelete, 1);
    console.table(users);
  });
  socket.on("chat message", (msg) => {
    let ps = users.find((u) => u.socketId == userSocket);
    let pseudo = ps ? ps.pseudo : "Anonymous";
    io.emit("chat message", { user: pseudo }, msg);
  });
  socket.on("ref user", (socketId, pseudo) => {
    users.push({ socketId, pseudo });
    console.table(users);
  });
  //   let timer = setInterval(() => {io.emit("chat message", "C'est chiant hein?")}, 1500);
  let timer = setTimeout(() => {
    io.to(userSocket).emit("myID", userSocket);
  }, 1000);
});

server.listen(portNumber, () => {
  console.log(`Server is running on port ${portNumber}`);
});
