#!/usr/bin/env node
import * as fs from "fs";
import url from "url";
import path from "path";
import axios from "axios";
import listPrompt from "./prompts/list.prompt.js";
import storage from "./functions/storage.js";
import message from "./utilities/message.js";

let __dirname = path.dirname(url.fileURLToPath(import.meta.url));
let appurl = path.join(__dirname, "..");

async function authentication() {
   if (!fs.existsSync(appurl + "/auth.config.js")) {
      // 1 : get user input
      const get_user_input = () => {
         listPrompt({
            questionObj: {
               type: "input",
               message: "please enter your github access token",
               name: "access_token",
            },
            callback: (answer) => {
               if (answer.access_token) {
                  verify_token(answer.access_token);
               }
            },
         });
      };
      get_user_input();

      // 2 access token
      const verify_token = async (token) => {
         try {
            let { data } = await axios.get("https://api.github.com/user", {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });
            if (data) {
               store_auth_user_info(token, data);
               message.bg_done(`your login successfully`);
            }
         } catch (error) {
            console.log(error);
            message.error(`\nerror : ${error?.response?.status} ${error?.response?.statusText}`);
         }
      };

      // 3 store_auth_user_info
      let store_auth_user_info = (token, user) => {
         storage({
            path: appurl + "/auth.config.js",
            data: `const authConfig = {
               TOKEN: "${token}",
               API_VERSION: "2022-11-28",
               USERNAME: "${user?.login}",
               FULL_NAME: "${user?.name}",
               USER_TYPE: "${user?.type}",
         }; 
         export default authConfig;
            `
               .trim()
               .toString(),
         });
         setTimeout(async () => {
            (await import("./apps/app.js")).default();
         }, 1000);
      };
   }
   if (fs.existsSync(appurl + "/auth.config.js")) {
      (await import("./apps/app.js")).default();
   }
}

authentication();
