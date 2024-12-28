// filepath: /C:/Users/princ/Desktop/New folder/mysecondtestion/sendSlackNotification.ts
import fs from "fs";
import axios from "axios";

const reportPath = "./reports/jest-stare/result.json";
const webhookUrl = process.env.SLACK_WEBHOOK_URL;

if (!fs.existsSync(reportPath)) {
  console.error("Report file not found:", reportPath);
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));

const summary = report.summary;
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
