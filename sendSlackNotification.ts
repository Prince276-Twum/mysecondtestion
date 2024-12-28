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

const summary = report.summary;

if (!summary) {
  console.error("Summary not found in report:", report);
  process.exit(1);
}

const passed = summary.passed;
const failed = summary.failed;
const total = summary.total;

const message = {
  text: `Jest Test Results:\nPassed: ${passed}\nFailed: ${failed}\nTotal: ${total}`,
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
