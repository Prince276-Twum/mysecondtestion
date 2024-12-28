import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: "coverage",
  reporters: [
    "default",
    ["jest-junit", { outputDirectory: "./reports", outputName: "junit.xml" }],
    [
      "jest-stare",
      {
        resultDir: "./reports/jest-stare",
        reportTitle: "Test Report",
        resultJson: "result.json", // Corrected path
      },
    ],
  ],
};

export default createJestConfig(config);
