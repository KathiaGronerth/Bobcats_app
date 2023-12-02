const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8000 });

wss.on("connection", function connection(ws, req) {
  const roomName = req.url.split("/")[3]; // Get room name from URL

  ws.on("message", function incoming(message) {
    wss.clients.forEach(function each(client) {
      if (
        client !== ws &&
        client.readyState === WebSocket.OPEN &&
        req.url === client.url
      ) {
        client.send(message);
      }
    });
  });

  ws.send("You are connected to room: " + roomName);
});

console.log("WebSocket server started on ws://localhost:8000");
