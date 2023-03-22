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

            createFile({ fileName: fileName, code: data });
         } else {
            createFile({ fileName: fileName, code: data });
         }
      }
   } catch (error) {
      console.log(error);
   }
}

function createFile({ fileName, code }) {
   fs.createWriteStream(`${process.cwd()}/${fileName}`);
   fs.appendFile(`${process.cwd()}/${fileName}`, code, (error, data) => {
      if (data) {
         console.log(data);
      }
      if (error) {
         console.log(error);
      }
   });
}
