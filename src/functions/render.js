import axios from "axios";
import fs from "fs";
import stringPipe from "../utilities/string.js";

export default async function render({ download_url, fileName, name }) {
   try {
      console.log("downloading...");
      let { data } = await axios.get(download_url);
      if (data) {
         if (name) {
            // placeholder for fileName
            fileName = fileName.replace("[placeholder]", stringPipe(name, "t-t-l"));
            fileName = fileName.replace("[Placeholder]", stringPipe(name, "t-t-c"));
            fileName = fileName.replace("[PLACEHOLDER]", stringPipe(name, "t-t-u"));
            // placeholder in code

            data = data.replace(/placeholder/g, stringPipe(name, "t-t-l"));
            data = data.replace(/Placeholder/g, stringPipe(name, "t-t-c"));
            data = data.replace(/PLACEHOLDER/g, stringPipe(name, "t-t-u"));
            createFile({ fileName: fileName, code: data, folder: name });
         } else {
            createFile({ fileName: fileName, code: data });
         }
      }
   } catch (error) {
      console.log(error);
   }
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
