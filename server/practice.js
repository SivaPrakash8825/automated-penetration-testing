const { exec } = require("child_process");
const url = "https://www.tecmint.com/nmap-command-examples/";
const domain = new URL(url).hostname.replace("www.", "");

console.log(domain);
exec(`nmap  ${domain}`, (error1, stdout1, stderr1) => {
  if (error1) {
    console.error("Error:", error1);
    return res.status(500).send("Error performing port scan");
  }
  if (stderr1) {
    console.error("stderr:", stderr1);
  }
  const lines = stdout1.split("\n").filter((line) => line.trim() !== "");

  const headingsIndex = lines.findIndex((line) => line.includes("PORT"));

  // Extract headings
  const headings = lines[headingsIndex].trim().split(/\s+/);

  // Array to store the extracted data
  const data = [];

  // Iterate over the lines starting from the line after headings
  for (let i = headingsIndex + 1; i < lines.length - 1; i++) {
    const values = lines[i].trim().split(/\s+/);
    data.push(values);
  }

  // Prepend headings to the data array
  data.unshift(headings);

  // Print the extracted data
  console.log(data);

  // Iterate over the remaining lines to extract values
});

// function extractIPv4Addresses(dnsResponse) {
//   const ipv4Addresses = [];

//   for (const line of dnsResponse) {
//     const matches = line.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/);
//     if (matches) {
//       ipv4Addresses.push(matches[0]);
//     }
//   }
//   return ipv4Addresses;
// }

// const lines = [
//   "Starting Nmap 7.92 ( https://nmap.org ) at 2024-03-16 10:04 India Standard Time\r",
//   "Nmap scan report for ec2-13-228-199-255.ap-southeast-1.compute.amazonaws.com (13.228.199.255)\r",
//   "Host is up (0.048s latency).\r",
//   "Not shown: 998 filtered tcp ports (no-response)\r",
//   "PORT    STATE SERVICE\r",
//   "80/tcp  open  http\r",
//   "443/tcp open  https\r",
//   "Nmap done: 1 IP address (1 host up) scanned in 8.41 seconds\r",
// ];

// // Find the index of the line containing the headings
