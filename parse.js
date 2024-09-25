import fetch from "node-fetch";
import csv from "csvtojson";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config();

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const languageKeyList = [
  "ENG",
  "SCH",
  "TCH",
  "CZE",
  "DAN",
  "GER",
  "SPA",
  "FRE",
  "ITA",
  "JPN",
  "KOR",
  "NOR",
  "POL",
  "RUS",
  "FIN",
  "SWE",
  "DUT",
  "ESM",
  "TUR",
  "THA",
  "HUN",
  "POR",
  "GRK",
  "ROM",
];
const result = {};

/**
 * Parse original JSON to specific format
 *
 * @example
 *
 * // result
 * {
 *   ENG: {
 *     "test_key_1": "11",
 *     "test_key_2": "22",
 *     "test_key_3": "33"
 *   },
 *   TCH: {
 *     "test_key_1": "44",
 *     "test_key_2": "55",
 *     "test_key_3": "66"
 *   },
 *   ...
 * }
 */
const parseJsonData = (originalJsonData) => {
  originalJsonData.forEach((rowData) => {
    const i18nKey = rowData["Key/ID"];
    languageKeyList.forEach((langKey) => {
      if (!(langKey in result)) {
        result[langKey] = {};
      }
      result[langKey][i18nKey] = rowData[langKey];
    });
  });
};

/**
 * Save JSON data to files by language name and use language name as file name
 *
 * @example
 *
 * // ENG.json
 * {
 *   "test_key_1": "11",
 *   "test_key_2": "22",
 *   "test_key_3": "33"
 * }
 *
 * // TCH.json
 * {
 *   "test_key_1": "44",
 *   "test_key_2": "55",
 *   "test_key_3": "66"
 * }
 */

const saveToJsonFiles = () => {
  const folderPath = path.join(process.cwd(), "lang");
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  languageKeyList.forEach((langKey) => {
    const filePath = path.join(folderPath, `${langKey}.json`);
    const fileData = result[langKey];

    fs.writeFile(filePath, JSON.stringify(fileData, null, 2), (err) => {
      if (err) {
        console.error("[Write File Error]:", err);
        console.error("[File name]:", langKey);
        console.error("[File content]:", fileData);
      }
    });
  });
};

async function fetchCSVandConvertToJSON() {
  const csvUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv`;

  try {
    const response = await fetch(csvUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const csvData = await response.text(); // 取得 CSV 原始文本
    const jsonData = await csv().fromString(csvData);

    parseJsonData(jsonData);
    saveToJsonFiles();
  } catch (error) {
    console.error("Error fetching or converting CSV:", error);
  }
}

fetchCSVandConvertToJSON();
