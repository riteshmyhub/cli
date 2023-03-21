import axios from "axios";
import fs from "fs";

export default async function render({ download_url, fileName, name }) {
   try {
      let { data } = await axios.get(download_url);
      if (data) {
         if (name) {
            let [, extension] = file.split(".");
            let fileName = name + "." + extension;
            let modifiedData = data.replace(/PlaceHolder/g, name);
            createFile({ fileName: fileName, code: modifiedData });
         } else {
            createFile({ fileName: fileName, code: data });
         }
      }
   } catch (error) {
      console.log(error);
   }
}

function createFile({ fileName, code }) {
   fs.createWriteStream(`../${fileName}`);
   fs.appendFile(`../${fileName}`, code, (error, data) => {
      if (data) {
         console.log(data);
      }
      if (error) {
         console.log(error);
      }
   });
}
