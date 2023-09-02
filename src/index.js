const cors = require("cors");
const http = require("http");
const path = require("path");
const express = require("express");
const { Server } = require("socket.io");
const favicon = require("serve-favicon");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let onlieneUser = 0;

// set favicon
app.use(favicon(path.join(__dirname, "../public/img/favicon.ico")));

// set cors
app.use(cors());

// set views
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "pages"));

// set bootstrap
app.use("/assets", express.static(path.join(__dirname, "../public")));
app.use("/assets/js", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));

// route express
app
  .get("/", (req, res, next) => res.render("index"))
  .get("/login", (rex, res, next) => res.render("login"))
  .get("/chat", (req, res, next) => res.render("chat"));

// route socket.io
io.on("connection", (socket) => {
  onlieneUser++;
  io.emit("online_user", onlieneUser);
  socket.on("disconnect", () => {
    onlieneUser--;
    io.emit("online_user", onlieneUser);
  });

  socket.on("login", (res) => {
    // console.log(res.room);
    socket.join(res.room);
    io.to(res.room).emit("new_user", res);
  });

  socket.on("message", (res) => {
    // console.log(res.room);
    io.to(res.room).emit("new_message", res);
  });
});

server.listen(5000, () => console.info("app listen on port : 5000"));
