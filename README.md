# Automated Penetration Testing
### Overview
Automated Penetration Testing is a web application designed to streamline the process of identifying and exploiting vulnerabilities in web applications. Customers can submit the URL of their web application, and upon validation, the system conducts automated penetration testing using command-line interface (CLI) commands of Zed Attack Proxy (ZAP) and Nmap tools.

The application generates comprehensive reports for customers to download, providing detailed insights into potential vulnerabilities discovered during the testing process. By automating these security assessments, Automated Penetration Testing empowers customers to proactively identify and address security weaknesses in their web applications, ultimately enhancing their overall cybersecurity posture.

<img width="416" alt="image" src="https://github.com/SivaPrakash8825/automated-penetration-testing/assets/122080340/b711dba9-2c7b-4592-ae13-14efd2d389c0">

# Components
**Automated Penetration Testing comprises the following components:**

**Client-Side Application:** Provides a user-friendly interface for customers to submit their web application URLs and retrieve reports.<br><br>
**Server-Side Application:** Handles the validation of submitted URLs, initiates automated penetration testing using ZAP and Nmap CLI commands, and generates comprehensive reports.<br><br>
**ZAP Server:** Utilized for automated security scanning and vulnerability detection within the target web applications.<br><br>
**Nmap Tool:** Used for network discovery and security scanning to complement the vulnerability assessment conducted by ZAP.

# Client Overview
### Setting Up and Running the Client Application<br>

To set up and run the client application, follow these steps:<br>

1. Move to the Client Folder:<br>
   cd client
2. Install the Dependencies:<br>
   npm i
3. Run the Client Application in Development Mode:<br>
   npm run dev
# Server
### Setting Up and Running the Server Application<br>
To set up and run the server application:

1. Move to the server folder:<br>
   cd server
2. Install the Dependencies:<br>
   npm i
3. Run the Server Application in Development Mode:<br>
   npm run dev
   
# ZAP Server
#### To start the ZAP Server:

Open the ***ZAP Server application*** and click ***START***.

(OR)

Use the following command in the terminal:<br><br>
Zap.bat

# RabbitMQ Server
#### To start the RabbitMQ Server:

Open the ***RabbitMQ Server application.*** It should ***automatically start the server.***

# Features
**Automated Vulnerability Scanning:** Utilizes advanced scanning techniques to identify potential vulnerabilities across target systems.<br><br>
**Exploitation Framework Integration:** Integrates with popular exploitation frameworks to automatically exploit discovered vulnerabilities.<br><br>
**Reporting and Documentation:** Generates detailed reports and documentation of penetration testing results, including identified vulnerabilities, exploited systems, and recommended remediation steps.<br><br>
**Customization and Extensibility:** Offers flexibility for users to customize and extend the toolset according to specific requirements and preferences.<br><br>
**Scheduled Scans:** Allows users to schedule automated penetration tests at regular intervals to continuously monitor and assess the security posture of target environments.<br><br>




**Clone this repository:**<br><br>
https://github.com/SivaPrakash8825/automated-penetration-testing.git
