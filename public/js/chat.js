const socket = io();

// post login
window.onload = () => {
  const data = JSON.parse(localStorage.getItem("data"));

  !data ? (window.location = "/login") : socket.emit("login", data);

  document.querySelector(".card-header h2").innerHTML = `Room : ${data.room}`;
};

// soceket get online user
socket.on("online_user", (res) => (document.querySelector(".card-header h5").innerHTML = `${res} Online`));

// socket get login
socket.on("new_user", (res) => {
  const data = JSON.parse(localStorage.getItem("data"));
  const li = document.createElement("li");
  const p = document.createElement("p");

  li.classList.add("text-center");
  p.classList.add("my-1");

  if (res.username != data.username) {
    p.textContent = `User ${res.username} join`;
    li.append(p);
    document.querySelector(".card-body").append(li);
  }
});

// socket get message
socket.on("new_message", ({ username, message }) => {
  const data = JSON.parse(localStorage.getItem("data"));

  const li = document.createElement("li");
  const div = document.createElement("div");
  const p = document.createElement("p");
  const h6 = document.createElement("h6");

  h6.textContent = username;
  p.textContent = message;

  if (username != data.username) div.append(h6);

  li.classList.add(username == data.username ? "mychat" : "message");

  div.append(p);
  li.append(div);
  document.querySelector(".card-body").append(li);
});

// post message
document.querySelector(".input-group").addEventListener("submit", (e) => {
  e.preventDefault();

  const { username, room } = JSON.parse(localStorage.getItem("data"));
  const data = {
    username,
    room,
    message: document.querySelector(".input-group input").value,
  };

  document.querySelector(".input-group input").value ? socket.emit("message", data) : alert("No Message");

  document.querySelector(".input-group input").value = "";
});
