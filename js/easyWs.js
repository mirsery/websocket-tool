let ws = require("ws");

let sock = new ws("ws://localhost:8081")

sock.on("open", function () {
    console.log("open");
})

sock.on("error", function () {
    console.log("error");
})


sock.on("close", function () {
    console.log("close");
})

sock.on("message", function (data) {
    console.log(data);
})
