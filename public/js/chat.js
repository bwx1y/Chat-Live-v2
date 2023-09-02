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
socket.on("new_message", (res) => {
  const data = JSON.parse(localStorage.getItem("data"));

  const li = document.createElement("li");
  const p = document.createElement("p");
  const h5 = document.createElement("h5");

  li.classList.add(data.username === res.username ? "text-end" : "text-start");
  li.classList.add("w-100");
  p.classList.add("m-0");

  p.innerHTML = data.username === res.username ? "Me" : res.username;
  h5.innerHTML = res.message;

  li.append(p);
  li.append(h5);

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
