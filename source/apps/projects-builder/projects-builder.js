import * as fs from "fs";
import http from "../../http/http.js";
import chalk from "chalk";

export default function projectBuilder() {
   let directory_path = process.cwd();
   //1 get_app_tree
   const get_app_tree = () => {
      http.get("/vite-react-app/git/trees/master?recursive=true", (data) => {
         if (data) {
            console.log(chalk.bgGreen(`\nfind ${data?.tree?.length} files`));
            make_dir_and_file(data?.tree);
         }
      });
   };
   get_app_tree();

   // 2 make dir and file
   const make_dir_and_file = (data) => {
      data.forEach((elememt) => {
         if (!fs.existsSync(directory_path + "/" + elememt?.path)) {
            if (elememt.type === "tree") {
               fs.mkdirSync(directory_path + "/" + elememt?.path, () => {});
            }
            if (elememt.type === "blob") {
               fs.createWriteStream(directory_path + "/" + elememt?.path);
               appendContent(directory_path + "/" + elememt?.path, elememt?.url);
            }
         }
      });
   };

   const appendContent = (dir_path, content_url) => {
      http.get(content_url, (data) => {
         if (data) {
            let base64_data = Buffer.from(data?.content, "base64");
            fs.writeFileSync(dir_path, base64_data.toString(), () => {});
         }
      });
   };
}
