const data = [
  {
    port: 20,
    protocol: "TCP",
    service: "FTP",
    recommendation: "Disable always. Use SSHv2 or deploy the O&M audit system.",
  },
  {
    port: 21,
    protocol: "TCP",
    service: "FTP",
    recommendation: "Disable always. Use SSHv2 or deploy the O&M audit system.",
  },
  {
    port: 22,
    protocol: "TCP",
    service: "SSH",
    recommendation:
      "Disable recommended. If the port must be used, use SSHv2 and strong authentication.",
  },
  {
    port: 23,
    protocol: "TCP",
    service: "Telnet",
    recommendation: "Disable always. Use SSHv2 or deploy the O&M audit system.",
  },
  {
    service: "FTP",
    ports: [20, 21],
    protocol: "TCP",
    recommendation: "Disable always. Use SSHv2 or deploy the O&M audit system.",
  },
  {
    service: "SSH",
    port: 22,
    protocol: "TCP",
    recommendation:
      "Disable recommended. If the port must be used, use SSHv2 and strong authentication.",
  },
  {
    service: "Telnet",
    port: 23,
    protocol: "TCP",
    recommendation: "Disable always. Use SSHv2 or deploy the O&M audit system.",
  },
  {
    service: "TFTP",
    port: 69,
    protocol: "TCP",
    recommendation: "Disable always. Use SSHv2 or deploy the O&M audit system.",
  },
  {
    service: "RDP",
    port: 3389,
    protocol: "TCP",
    recommendation:
      "Disable always. If remote O&M is required, deploy the O&M audit system.",
  },
  {
    service: "VNC",
    ports: ["5900-5902"],
    protocol: "TCP",
    recommendation:
      "Disable always. If remote O&M is required, deploy the O&M audit system.",
  },
  {
    service: "Linux rexec (remote login)",
    ports: ["512-514"],
    protocol: "TCP",
    recommendation:
      "Disable always. If remote O&M is required, deploy the O&M audit system.",
  },
  {
    service: "Rsync (data mirror backup tool)",
    port: 873,
    protocol: "TCP",
    recommendation:
      "Disable always. If remote O&M is required, deploy the O&M audit system.",
  },
  {
    service: "DNS",
    port: 53,
    protocol: ["TCP", "UDP"],
    recommendation: "Disable always.",
  },
  {
    service: "Network File System",
    ports: [111, 2049],
    protocol: "TCP",
    recommendation: "Disable always.",
  },
  {
    service: "RPC",
    port: 135,
    protocol: ["TCP", "UDP"],
    recommendation: "Disable always.",
  },
  {
    service: "NetBIOS",
    port: 137,
    protocol: ["TCP", "UDP"],
    recommendation: "Disable always.",
  },
  {
    service: "NBDS",
    port: 138,
    protocol: ["TCP", "UDP"],
    recommendation: "Disable always.",
  },
  {
    service: "NBSS",
    port: 139,
    protocol: ["TCP", "UDP"],
    recommendation: "Disable always.",
  },
  {
    service: "SMB",
    port: 445,
    protocol: ["TCP", "UDP"],
    recommendation: "Disable always.",
  },
  {
    service: "SNMP",
    port: 161,
    protocol: ["TCP", "UDP"],
    recommendation: "Disable always.",
  },
  {
    service: "LDAP",
    port: 389,
    protocol: ["TCP", "UDP"],
    recommendation: "Disable always.",
  },
  {
    service: "SQL Server (database management system)",
    port: 1433,
    protocol: "TCP",
    recommendation: "Disable always.",
  },
  {
    service: "Oracle (Oracle database)",
    port: 1521,
    protocol: "TCP",
    recommendation: "Disable always.",
  },
  {
    service: "MySQL (database)",
    port: 3306,
    protocol: "TCP",
    recommendation: "Disable always.",
  },
  {
    service: "Sybase/DB2 (database)",
    port: 5000,
    protocol: "TCP",
    recommendation: "Disable always.",
  },
  {
    service: "PostgreSQL (database)",
    port: 5432,
    protocol: "TCP",
    recommendation: "Disable always.",
  },
  {
    service: "Redis (database)",
    port: 6379,
    protocol: "TCP",
    recommendation: "Disable always.",
  },
  {
    service: "MongoDB (database)",
    ports: ["27017-27018"],
    protocol: "TCP",
    recommendation: "Disable always.",
  },
  {
    service: "SMTP",
    port: 25,
    protocol: "TCP",
    recommendation: "Disable always. Use SMTPS instead.",
  },
  {
    service: "POP3",
    port: 110,
    protocol: "TCP",
    recommendation: "Disable always. Use POP3S instead.",
  },
  {
    service: "IMAP",
    port: 143,
    protocol: "TCP",
    recommendation: "Disable always. Use IMAPS instead.",
  },
  {
    service: "HTTP",
    ports: [80, 8000, 8080, 8888],
    protocol: "TCP",
    recommendation: "Disable recommended. Use HTTPS instead.",
  },
  {
    service: "HTTPS",
    port: 443,
    protocol: "TCP",
    recommendation: "Enable. Use HTTPS for secure communication.",
  },
];

export default data;
