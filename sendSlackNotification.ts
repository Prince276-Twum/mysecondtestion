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
      type: "header",
      text: {
        type: "plain_text",
        text: "Jest Test Results",
        emoji: true,
      },
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
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*Detailed Results:*",
      },
    },
    ...report.testResults.map((testResult: any) => {
      const fileName = testResult.testFilePath.split("\\").pop(); // Extract the file name
      return {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*${fileName}*\n${testResult.testResults
            .map(
              (result: any) =>
                `- ${result.title}: ${
                  result.status === "passed" ? ":white_check_mark:" : ":x:"
                }`
            )
            .join("\n")}`,
        },
      };
    }),
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
