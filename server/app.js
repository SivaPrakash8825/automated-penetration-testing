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
const requestmodel = require("./schema/request");
const ZapClient = require("zaproxy");

const zapOptions = {
  apiKey: "rki1o56ofug84lcnt9d76gths2",
  proxy: {
    host: "127.0.0.1",
    port: 8080,
  },
};

const zaproxy = new ZapClient(zapOptions);

let indicator;
dotenv.config({
  path: "./.env",
});

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3001"],
    credentials: true,
  })
);
const socket = http.createServer(app);
const io = new Server(socket, {
  cors: {
    origin: "http://localhost:3001",
    credentials: true,
  },
});

io.on("connection", (server) => {
  indicator = server;

  server.on("join_team", (value) => {
    console.log(value);
    server.join(value);
  });
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
    app.post("/scan", AddUserRequest, (req, res) => {
      const { userId, url } = req.body;

      channel.sendToQueue(queue, Buffer.from(JSON.stringify({ userId, url })));
      console.log(` [x] Request from user ${userId} added to queue`);

      res.status(200).send("Request received and added to the queue");
    });

    channel.consume(
      queue,
      async function (msg) {
        const { userId, url } = JSON.parse(msg.content.toString());
        
        if (urlvalid.isUri(url)) {
          const [result1, result2] = await Promise.all([
            forNmap(url),
            forZap(url),
          ]);
          if(result1 && result2){
            await request.findOneUpdate({url:url},{$set:{status:"completed",nmap:result1,zap:result2}})
            indicator.emit("status", "complete");
            channel.ack(msg);
          }
          
        } else {
          
          channel.ack(msg);
        }
      },
      {
        noAck: false,
      }
    );
  });
});

const forZap = async (url) => {
  const vulnerabilitiesByRisk = {};
  await new Promise(async(resolve, reject) => {
    try {
      const response = await zaproxy.spider.scan({
        url:url,
      });
      let spiderStatus,activestatus;
      do {
        spiderStatus = await zaproxy.spider.status(response.scan);
        // console.log();
      } while (spiderStatus.status !== "100");
      const activeScanResponse = await zaproxy.ascan.scan({
        url: url,
      });
      do {
        activestatus = await zaproxy.ascan.status(activeScanResponse.scan);
        // console.log();
      } while (activestatus.status !== "100");
     if(activestatus.status === "100"){
      const alerts = (await zaproxy.core.alerts({
        baseurl: url,
      })).alerts;
    
    
    alerts.forEach(alert => {
        if (!vulnerabilitiesByRisk[alert.risk]) {
            vulnerabilitiesByRisk[alert.risk] = 0;
        }
        vulnerabilitiesByRisk[alert.risk]++;
        const detailsToReproduce = alerts.map(alert => ({
          name:alert.name,
          riskrate:alert.risk,
          confidence:alert.confidence,
          vulsummar:alert.description,
      solution:alert.solution,
      reference:alert.reference,
      }));
      vulnerabilitiesByRisk["details"] = detailsToReproduce;
    });
     }
      // const jsonResponse = JSON.stringify(response);
      // fs.writeFile("report.json", jsonResponse, (err) => {
      //   if (err) throw err;
      //   console.log("Report saved successfully!");
      // });
      resolve()
    } catch (error) {
      console.error("Error:", error);
    }
  })
  return vulnerabilitiesByRisk;
};

const forNmap = async (url) => {
  let lines2;
  await new Promise((resolve, reject) => {
    exec(`nslookup ${url}`, (error, stdout, stderr) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error performing DNS lookup");
      }

      if (stderr) {
        console.error(stderr);
      }

      const lines = stdout.split("\n").filter((line) => line.trim() !== "");
      const ipAddress = extractIPv4Addresses(lines);
      console.log("adsf" + ipAddress);

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

          lines2 = stdout1.split("\n").filter((line) => line.trim() !== "");

          const openPorts = [];
          for (const line of lines2) {
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

          // Generating report
          // const report = {
          //   numberOfVulnerablePorts: openPorts.length,
          //   detailedReport: openPorts.map((port) => ({
          //     portNumber: port.portNumber,
          //     protocol: port.protocol,
          //     service: port.service,
          //     recommendedAction: "Recommendation goes here", // Add your recommendation here
          //   })),
          // };
        
          resolve();
        }
      );
    });
  });
  return lines2;
};

const AddUserRequest = async (req, res, next) => {
  const { userId, url } = req.body;
  try {
    const result = await requestmodel.create({
      userid: userId,
      url: url,
      status: "scheduled",
    });
    if (result) {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message });
  }
};

app.post("/getuserrequest", async (req, res) => {
  const { userId } = req.body;
  try {
    const result = await requestmodel.find({ userid: userId });
    return res.status(200).send(result);
  } catch (e) {
    return res.status(400).send(e);
  }
});

socket.listen(3030, () => {
  console.log(`listening on 3030`);
});

