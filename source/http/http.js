import axios from "axios";
import environment from "../environments/environments.js";
import chalk from "chalk";
import { createSpinner } from "nanospinner";

const http = {
   get: async (endpoint, callback) => {
      try {
         let spinner = createSpinner("please wait....").start();
         let baseUrl = endpoint.startsWith("https://") //
            ? endpoint
            : environment.BASE_URL.concat(endpoint);
         let { data } = await axios.get(baseUrl, {
            headers: environment.headers,
         });
         spinner.success({ text: "done" });
         callback(data);
      } catch (error) {
         spinner.error({
            text: `\nerror : ${error?.response?.status} ${error?.response?.statusText}`,
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
