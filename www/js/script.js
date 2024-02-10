const socket = io();

let myId = "";

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

const header = document.querySelector('header');
const headerPseudo = header.querySelector("form #pseudo");
const headerCnxBtn = header.querySelector("form #headerConnectBtn");

const emojis = [
  { ":-)": "🙂" },
  { ":-(": "😞" },
  { "XD": "😂" },
  { ":')": "😂" },
  { "3:)": "😈" },
  { "8D": "🥳" },
  { "\\o/": "🎉" },
  { "<3": "❤️" },
  { "to/": "🖕" },
];

// Position da la div message.
messages.style.marginTop = header.offsetHeight + 'px';
// TODO : bloquer la hauteur max-heigth a 100vh - header - online title - input

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
    };
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
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on("myID", (ident) => {
  myId = ident;
  console.log("Mon Id:", myId);
});
