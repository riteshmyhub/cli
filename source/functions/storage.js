import * as fs from "fs";

export default function storage({ path, data }) {
   if (!fs.existsSync(path)) {
      fs.writeFileSync(path, data);
   }
}
