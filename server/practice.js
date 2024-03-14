const validUrl = require("valid-url");

// Function to check if a URL is valid
function checkUrl(url) {
  if (validUrl.isUri(url)) {
    console.log(`${url} is a valid URL.`);
  } else {
    console.log(`${url} is not a valid URL.`);
  }
}

// Test cases
const urls = [
  "https://www.example.com",
  "ftp://ftp.example.com",
  "invalid-url",
  "http://localhost:3000",
];

urls.forEach((url) => {
  checkUrl(url);
});
