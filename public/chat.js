// make connection
const socket = io.connect("http://localhost:4000");

// query dom
const message = document.getElementById("message");
const handle = document.getElementById("handle");
const button = document.getElementById("send");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");

// emit events
button.addEventListener("click", () => {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value,
  });
});

message.addEventListener("keypress", () => {
  socket.emit("typing", {
    handle: handle.value,
  });
});

// listen for events
socket.on("chat", (data) => {
  feedback.innerHTML = "";
  output.innerHTML =
    "<p><strong>" + data.handle + "</strong>: " + data.message + "</p>";
});

socket.on("typing", (data) => {
  feedback.innerHTML =
    "<p><em>" + data.handle + " is typing a message...</em></p>";
});
