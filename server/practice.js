const { exec } = require("child_process");

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
    `nmap  ${ipAddress[ipAddress.length - 1]}`,
    (error1, stdout1, stderr1) => {
      if (error1) {
        console.error("Error:", error1);
        return res.status(500).send("Error performing port scan");
      }
      if (stderr1) {
        console.error("stderr:", stderr1);
      }
      const lines2 = stdout1.split("\n").filter((line) => line.trim() !== "");
      console.log(lines2);
    }
  );
});
