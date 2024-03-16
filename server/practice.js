const { exec } = require("child_process");
const newFun = async () => {
  const [result1, result2] = await Promise.all([
      forNmap("https://chatwithchatboteva.streamlit.app"),
      forZap(),
  ]);
  console.log(result1);
  console.log(result2);
};

const forNmap =  (mainurl) => {
  
  return new Promise((resolve, reject) => {
    const url = mainurl;
    const domain = new URL(url).hostname.replace("www.", "");
    console.log(domain);
    exec(`nmap  ${domain}`, (error1, stdout1, stderr1) => {
     
      if (stderr1 || error1) {
        return resolve("error")
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
      console.log(data);
      // Print the extracted data
      return resolve(data);
      // Iterate over the remaining lines to extract values
    });
  });
};

const forZap =  (url) => {
  return new Promise((resolve,reject)=>{
    resolve("error")
  })
  
};

newFun()