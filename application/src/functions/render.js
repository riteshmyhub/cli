import fs from "fs";

export default function render({ response, name }) {
   fs.createWriteStream(`${name}`);
   fs.appendFile(`${name}`, response, (error, data) => {
      if (data) {
         console.log(data);
      }
      if (error) {
         console.log(error);
      }
   });
}
