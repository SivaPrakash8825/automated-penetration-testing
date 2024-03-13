const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const register = require("./schema/register");
const path = require("path");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { exec } = require("child_process");

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
  const val = req.cookies.pentest;
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

app.post("/scan", (req, res) => {
  const { url } = req.body;
  const command = `nmap -sV -oG - ${url}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Error:", error);
      return;
    }

    if (stderr) {
      console.error("stderr:", stderr);
      return;
    }

    console.log("Output:", stdout);
    return res.status(200).send(stdout);
  });
});

app.listen(3030, () => {
  console.log(`listening on 3030`);
});
