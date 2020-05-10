import fs from "fs";
export const snooze = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const saveToJson = (path: String, filename: String, jsonData) => {
  const payload = JSON.stringify(jsonData, null, 4);
  fs.writeFile(`${path}/${filename}.json`, payload, function (err) {
    if (err) {
      console.log(err);
    }
  });
};
