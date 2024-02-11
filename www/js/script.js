const socket = io();

let myId = "";

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
const online = document.querySelector("#online");
const onlineTitle = online.querySelector('#title');
const users = document.querySelector('#online #users');

const header = document.querySelector("header");
const headerPseudo = header.querySelector("form #pseudo");
const headerCnxBtn = header.querySelector("form #headerConnectBtn");

const emojis = [
  { ":-)": "🙂" },
  { ":-(": "😞" },
  { XD: "😂" },
  { ":')": "😂" },
  { "3:)": "😈" },
  { "8D": "🥳" },
  { "\\o/": "🎉" },
  { "<3": "❤️" },
  { "to/": "🖕" },
];

// Position da la div message.
messages.style.marginTop = header.offsetHeight + "px";
messages.style.height = window.innerHeight - header.offsetHeight - form.offsetHeight - online.offsetHeight + 'px';
users.addEventListener('click', () => {
  console.log('Users')
});
onlineTitle.addEventListener('click', () => {
  // console.log(online.style.height, parseInt(online.style.height))
  if (parseInt(online.style.height) < 42 || online.style.height === '')
    online.style.height = window.innerHeight * 0.5 + 'px';
  else
    online.style.height = '41px';
});


let user = "";

// Connection button
headerCnxBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (headerPseudo.value) {
    user = headerPseudo.value;
    socket.emit("ref user", myId, user);
    //TODO: disable header form, enable Send button
    document.querySelector("#form #sendMessage").removeAttribute("disabled");
    document.querySelector("#form #input").removeAttribute("disabled");
    document
      .querySelector("header #userName #headerConnectBtn")
      .setAttribute("disabled", true);
    document
      .querySelector("header #userName #pseudo")
      .setAttribute("disabled", true);
    document.title = user + " logged in successfully";
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    let msg = input.value;
    for (let emj of emojis) {
      msg = msg.replace(Object.keys(emj), emj[Object.keys(emj)]);
    }
    socket.emit("chat message", msg);
    input.value = "";
  }
});

socket.on("chat message", (u, msg) => {
  const figure = document.createElement("figure");
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = u.user + ": ";
  figure.textContent = msg;
  figure.appendChild(figcaption);
  messages.appendChild(figure);
  messages.scrollTo(0, messages.scrollHeight);
});

socket.on("myID", (ident) => {
  myId = ident;
  console.log("Mon Id:", myId);
});
