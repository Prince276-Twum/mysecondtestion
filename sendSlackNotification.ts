import fs from "fs";
import axios from "axios";

const reportPath = "./reports/jest-stare/result.json";
const webhookUrl = process.env.SLACK_WEBHOOK_URL;

if (!fs.existsSync(reportPath)) {
  console.error("Report file not found:", reportPath);
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));

// Debugging: Log the structure of the report
console.log("Report structure:", JSON.stringify(report, null, 2));

// Extract summary information from the report
const passed = report.numPassedTests;
const failed = report.numFailedTests;
const total = report.numTotalTests;

const message = {
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*Jest Test Results*",
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Passed Tests:*\n${passed}`,
        },
        {
          type: "mrkdwn",
          text: `*Failed Tests:*\n${failed}`,
        },
        {
          type: "mrkdwn",
          text: `*Total Tests:*\n${total}`,
        },
      ],
    },
  ],
};

axios
  .post(webhookUrl!, message)
  .then((response) => {
    console.log("Slack notification sent:", response.data);
  })
  .catch((error) => {
    console.error("Error sending Slack notification:", error);
    process.exit(1);
  });
