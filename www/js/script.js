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
  const figure = document.createElement("figure");
  const figcaption = document.createElement('figcaption');
  figcaption.textContent= u.user + ': ';
  figure.textContent = msg;
  figure.appendChild(figcaption);
  messages.appendChild(figure);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('myID', ident => {
  myId = ident;
  console.log('Mon Id:',myId);
})
