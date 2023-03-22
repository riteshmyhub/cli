import axios from "axios";
import fs from "fs";
import stringPipe from "../utilities/string.js";

export default async function render({ download_url, fileName, name }) {
   try {
      let { data } = await axios.get(download_url);
      if (data) {
         if (name) {
            // placeholder for fileName
            let fName =
               fileName.replace("[placeholder]", stringPipe(name, "t-t-l")) || //
               fileName.replace("[Placeholder]", stringPipe(name, "t-t-c")) || //
               fileName.replace("[PLACEHOLDER]", stringPipe(name, "t-t-u"));
            // placeholder in code
            let code =
               data.replace(/placeholder/g, stringPipe(name, "t-t-l")) || //
               data.replace(/Placeholder/g, stringPipe(name, "t-t-c")) || //
               data.replace(/PLACEHOLDER/g, stringPipe(name, "t-t-u"));

            createFile({ fileName: fName, code: code });
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
