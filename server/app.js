const express = require("express");
const app = express();
const cors = require("cors");
const cookieparser = require("cookie-parser");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const { initializeSocket, router } = require("./router/pentest.js");

dotenv.config({
  path: "./.env",
});

app.use(express.json());

app.use(
  cors({
    origin: [process.env.ENDPOINT],
    credentials: true,
  })
);

app.use(cookieparser());

app.get("/health", (req, res) => {
  console.log("checked");
  res.status(200).json("checked");
});

app.get("/getcookie", async (req, res) => {
  const val = req.cookies;
  console.log(val);
});

app.use("/auth", require("./router/auth.js"));
app.use("/test", router);
app.use("/store", require("./router/store.js"));

function parseNmapOutput(nmapOutput) {
  // Parsing Nmap output to extract vulnerable ports and details
  const lines = nmapOutput.split("\n");
  const vulnerablePorts = [];

  lines.forEach((line) => {
    if (line.includes("Ports:")) {
      const portInfo = line.split("\t");
      const portNumber = portInfo[1].split("/")[0];
      const protocol = portInfo[1].split("/")[1];
      const services = portInfo[2];
      const recommendedAction = "Perform further investigation";

      vulnerablePorts.push({
        portNumber,
        protocol,
        services,
        recommendedAction,
      });
    }
  });

  return vulnerablePorts;
}

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.ENDPOINT,
    credentials: true,
  },
});
initializeSocket(io);

server.listen(3030, () => {
  console.log(`listening on 3030`);
});
