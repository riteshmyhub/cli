import fs from "fs";
import http from "../http/http.js";
import stringPipe from "../utilities/string.js";

export default async function render({ download_url, fileName, name }) {
   http.get(`###${download_url}`, (data) => {
      if (data) {
         if (name) {
            // placeholder for fileName
            fileName = fileName.replace("[placeholder]", stringPipe(name, "t-t-l"));
            fileName = fileName.replace("[Placeholder]", stringPipe(name, "t-t-c"));
            fileName = fileName.replace("[PLACEHOLDER]", stringPipe(name, "t-t-u"));
            console.log(`\n ${fileName} download`);
            // placeholder in code

            data = data.replace(/placeholder/g, stringPipe(name, "t-t-l"));
            data = data.replace(/Placeholder/g, stringPipe(name, "t-t-c"));
            data = data.replace(/PLACEHOLDER/g, stringPipe(name, "t-t-u"));
            createFile({ fileName: fileName, code: data, folder: name });
         }
      }
   });
}

function createFile({ fileName, code, folder }) {
   if (folder) {
      let directory_path = process.cwd() + "/" + folder;
      if (!fs.existsSync(directory_path)) {
         fs.mkdirSync(directory_path);
      }
      if (fs.existsSync(directory_path)) {
         fs.createWriteStream(`${directory_path}/${fileName}`);
         fs.appendFile(`${directory_path}/${fileName}`, code, (error, data) => {
            if (data) {
               console.log(data);
            }
            if (error) {
               console.log(error);
            }
         });
      }
   }
}
