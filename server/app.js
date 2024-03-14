const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const register = require("./schema/register");
const { Server } = require("socket.io");
const path = require("path");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { exec } = require("child_process");
const http = require("http");
const amqp = require("amqplib/callback_api");
const https = require("https");
const urlvalid = require("valid-url");

let indicator;
dotenv.config({
  path: "./.env",
});

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
const socket = http.createServer(app);
const io = new Server(socket, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", (server) => {
  indicator = server;

  server.on("join_team", (value) => {
    console.log(value);
    server.join(value);
  });
  // server.on("send_mes", (value) => {
  //   server.to(value.curchat).emit("rec_mes", {
  //     user: value.sender,
  //     sendermsg: value.msg,
  //     roomno: value.curchat,
  //   });
  //   console.log(value.sender);
  // });
});
app.use(cookieparser());

async function checkConnection() {
  try {
    await mongoose.connect(process.env.ATLAS_URL);
    console.log("Connected");
  } catch (error) {
    console.log("Not Connected :", error.message);
  }
}
checkConnection();
app.use(cookieparser());
app.get("/health", (req, res) => {
  console.log("checked");
  res.status(200).json("checked");
});

app.get("/getcookie", async (req, res) => {
  const val = req.cookies;
  console.log(val);
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username);

  try {
    const exist = await register.findOne({ email: email });
    if (exist) {
      res.status(200).send("MailId is already exist!!");
    }
    const create = await register.create({
      username: username,
      email: email,
      password: password,
    });
    if (create) {
      res.status(200).send(create);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await register.findOne({ email: email, password: password });
    if (user) {
      const token = jwt.sign(
        { username: user.username, email: user.email },
        process.env.SECRET,
        {
          expiresIn: "9d",
        }
      );
      const option = {
        expires: new Date(Date.now() + 90 * 60 * 60 * 24 * 1000),
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      };
      res.cookie("pentest", token, option);
      console.log(user);
      return res.status(200).send(user);
    }

    return res.status(200).send("invalid");
  } catch (e) {
    // console.log(e);
    res.status(400).send(e);
  }
});

function extractIPv4Addresses(dnsResponse) {
  const ipv4Addresses = [];

  for (const line of dnsResponse) {
    const matches = line.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/);
    if (matches) {
      ipv4Addresses.push(matches[0]);
    }
  }
  return ipv4Addresses;
}

function validateUrl(url, callback) {
  console.log(url);
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    callback(null, false); // URL must start with http:// or https://
  }

  const protocol = url.startsWith("https://") ? https : http;

  const req = protocol.get(url, (res) => {
    // console.log(res.statusCode);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      callback(null, true); // URL is valid
    } else {
      callback(null, false); // URL is not valid
    }
  });

  req.on("error", (err) => {
    callback(err); // Error occurred during the request
  });
}

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

amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    const queue = "user_requests";
    channel.assertQueue(queue, {
      durable: false,
    });
    channel.prefetch(1);
    app.post("/scan", (req, res) => {
      const { userId, url } = req.body;

      channel.sendToQueue(queue, Buffer.from(JSON.stringify({ userId, url })));
      console.log(` [x] Request from user ${userId} added to queue`);

      res.status(200).send("Request received and added to the queue");
    });

    channel.consume(
      queue,
      function (msg) {
        const { userId, url } = JSON.parse(msg.content.toString());
        console.log(` [x] Processing request from user ${userId}:`, url);
        if (urlvalid.isUri(url)) {
          exec(`nslookup ${url}`, (error, stdout, stderr) => {
            if (error) {
              console.error(error);
              return res.status(500).send("Error performing DNS lookup");
            }

            if (stderr) {
              console.error(stderr);
            }

            const lines = stdout
              .split("\n")
              .filter((line) => line.trim() !== "");
            const ipAddress = extractIPv4Addresses(lines);
            console.log(ipAddress);
            exec(
              `nmap -sV -oG - ${ipAddress[ipAddress.length - 1]}`,
              (error1, stdout1, stderr1) => {
                if (error1) {
                  console.error("Error:", error1);
                  return res.status(500).send("Error performing port scan");
                }

                if (stderr1) {
                  console.error("stderr:", stderr1);
                }

                const openPorts = [];
                const lines = stdout1
                  .split("\n")
                  .filter((line) => line.trim() !== "");
                console.log(lines);
                for (const line of lines) {
                  let parts = line.split("\t");
                  if (parts[0].startsWith("Host")) {
                    for (const value of parts) {
                      if (value.trim().startsWith("Status")) {
                        console.log(value.trim());
                      }
                      if (value.trim().startsWith("Ports")) {
                        const arr = value.split(",");
                        console.log(arr.length);
                      }
                    }
                  }
                }
                // lines.forEach((line) => {
                //   if (parts.length >= 4 && parts[parts.length - 1].includes("open")) {
                //     console.log(parts);
                //     const port = {
                //       portNumber: parts[1].split("/")[0],
                //       protocol: parts[1].split("/")[1],
                //       service: parts[2],
                //     };
                //     openPorts.push(port);
                //   }
                // });
                console.log(openPorts);
                // Generating report
                const report = {
                  numberOfVulnerablePorts: openPorts.length,
                  detailedReport: openPorts.map((port) => ({
                    portNumber: port.portNumber,
                    protocol: port.protocol,
                    service: port.service,
                    recommendedAction: "Recommendation goes here", // Add your recommendation here
                  })),
                };
                indicator.emit("status", "completed");
                channel.ack(msg);
              }
            );
          });
        } else {
          indicator.emit("status", "error");
          channel.ack(msg);
        }
        // Simulate processing time (e.g., 5 seconds)
      },
      {
        noAck: false,
      }
    );
  });
});

socket.listen(3030, () => {
  console.log(`listening on 3030`);
});
