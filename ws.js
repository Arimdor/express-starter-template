const WebSocket = require('ws');

module.exports =
    (function (server) {
        const wss = new WebSocket.Server(server);

        wss.on('connection', function (ws) {
            ws.on('message', function (message) {
                console.log(`recived: ${message}`)
            });

            ws.send('something');
        })
    })();

