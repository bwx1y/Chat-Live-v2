(() => {
  const data = JSON.parse(localStorage.getItem("data"));
  document.querySelector(".container-fluid button").textContent = data ? "Log Out" : "Login";
})();

document.querySelector(".container-fluid button").addEventListener("click", (e) => {
  if (e.target.textContent == "Log Out") {
    window.location = "/login";
    localStorage.clear();
  } else window.location = "/login";
});
