const socket = io();

let myId = '';

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");


form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

socket.on("chat message", (u, msg) => {
  const item = document.createElement("li");
  item.textContent = u.user +': '+ msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('myID', ident => {
  myId = ident;
  console.log('Mon Id:',myId);
})
