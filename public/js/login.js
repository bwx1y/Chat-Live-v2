(() => {
  if (JSON.parse(localStorage.getItem("data"))) window.location = "/chat";
})();

document.getElementById("setRoom").addEventListener("click", (e) => {
  e.target.innerHTML === "Use Room" ? (e.target.innerHTML = "No Use Room") : (e.target.innerHTML = "Use Room");
  document.querySelectorAll(".form-floating")[1].classList.toggle("d-none");
});

document.getElementById("login").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = JSON.stringify({
    username: document.getElementById("inputUsername").value,
    room: document.getElementById("inputRoom").value ? document.getElementById("inputRoom").value : "Global",
  });
  if (document.getElementById("inputUsername").value) {
    localStorage.setItem("data", data);
    window.location = "/chat";
  } else {
    alert("No Username");
  }
});
