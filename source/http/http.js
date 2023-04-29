import axios from "axios";
import environment from "../environments/environments.js";
import { createSpinner } from "nanospinner";
import url from "url";
import * as fs from "fs";
import path from "path";

let __dirname = path.dirname(url.fileURLToPath(import.meta.url));
let appurl = path.join(__dirname, "..", "..");
const http = {
   get: async (endpoint, callback) => {
      let spinner = createSpinner("please wait....").start();
      try {
         let baseUrl = endpoint.startsWith("https://") //
            ? endpoint
            : environment.BASE_URL.concat(endpoint);
         let { data } = await axios.get(baseUrl, {
            headers: environment.headers,
         });
         spinner.success({ text: "done" });
         callback(data);
      } catch (error) {
         if (error?.response?.status === 401) {
            fs.rmdirSync(appurl + "/auth.config.js", { recursive: true });
         }
         spinner.error({
            text: `error : ${error?.response?.status} ${error?.response?.statusText}`,
         });
         process.exit();
      }
   },
};

export default http;

/* 
// let loading = (function () {
      //    let frames = [".", "..", "..", "...", "....", ".....", "....."];
      //    let i = 0;
      //    return setInterval(() => {
      //       i = i > 6 ? 0 : i;
      //       process.stdout.write("\r" + frames[i] + " ");
      //       i++;
      //    }, 300);
      // })();

        //clearInterval(loading);
*/
