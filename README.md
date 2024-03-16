# Automated Penetration Testing
### Overview
Automated Penetration Testing is a web application designed to streamline the process of identifying and exploiting vulnerabilities in web applications. Customers can submit the URL of their web application, and upon validation, the system conducts automated penetration testing using command-line interface (CLI) commands of Zed Attack Proxy (ZAP) and Nmap tools.

The application generates comprehensive reports for customers to download, providing detailed insights into potential vulnerabilities discovered during the testing process. By automating these security assessments, Automated Penetration Testing empowers customers to proactively identify and address security weaknesses in their web applications, ultimately enhancing their overall cybersecurity posture.

<img width="416" alt="image" src="https://github.com/SivaPrakash8825/automated-penetration-testing/assets/122080340/b711dba9-2c7b-4592-ae13-14efd2d389c0">

### Components
**Automated Penetration Testing comprises the following components:**

**Client-Side Application:** Provides a user-friendly interface for customers to submit their web application URLs and retrieve reports.<br>
**Server-Side Application:** Handles the validation of submitted URLs, initiates automated penetration testing using ZAP and Nmap CLI commands, and generates comprehensive reports.<br>
**ZAP Server:** Utilized for automated security scanning and vulnerability detection within the target web applications.<br>
**Nmap Tool:** Used for network discovery and security scanning to complement the vulnerability assessment conducted by ZAP.

# Client Overview
### Setting Up and Running the Client Application<br>

To set up and run the client application, follow these steps:<br>

1. Move to the Client Folder:
   cd client
2. Install the Dependencies:
   npm i
3. Run the Client Application in Development Mode:
   npm run dev

