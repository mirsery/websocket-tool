let ws = require("ws");

let openListener = null;

let messageListener = null;

let closeListener = null;

let errorListener = null;


function loadListener(sock) {
    if (sock === null) return;
    sock.on("open", function () {
        if (openListener === null) return;
        openListener.onOpen(sock);
    })

    sock.on("error", function (err) {
        if (errorListener === null) return;
        errorListener.onError(err);
    })

    sock.on("close", function () {
        if (closeListener === null) return;
        closeListener.onClose();
    })

    sock.on("message", function (data) {
        if (messageListener === null) return;
        messageListener.onMessage(sock, data);
    })
}

function clearSock(sock) {
    if (sock != null) {
        sock.removeListener("open");
        sock.removeListener("error");
        sock.removeListener("close");
        sock.removeListener("message");
    }
}


let easyClient = {

    sock: null,

    uri: null,

    setURL: function (url) {
        this.uri = url;
    },

    init: function (_openListener = {
                        onOpen: function (sock) {
                            console.log("sock connect to server success")
                        }
                    },
                    _messageListener = {
                        onMessage: function (sock, data) {
                            console.log("[receive] " + data);
                        }
                    },
                    _closeListener = {
                        onClose: function () {
                            console.log("disconnect the server.")
                        }
                    },
                    _errorListener = {
                        onError: function (err) {
                            console.log(err)
                        }
                    }) {
        openListener = _openListener;
        messageListener = _messageListener;
        closeListener = _closeListener;
        errorListener = _errorListener;
    },

    connect: function () {
        if (this.uri === null) return;

        if (this.sock != null) {
            clearSock(this.sock);
            this.sock.close();
        }
        this.sock = new ws(this.uri);
        loadListener(this.sock)
    },

    send: function (msg) {
        if (this.sock != null) {
            this.sock.send(msg);
        }
    },

    close: function () {
        if (this.sock != null) {
            this.sock.close();
        }
    }

}

export default easyClient;
