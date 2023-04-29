import axios from "axios";
import environment from "../environments/environments.js";
import chalk from "chalk";

const http = {
   get: async (endpoint, callback) => {
      let loading = (function () {
         let frames = ["|", "/", "-", "\\"];
         let i = 0;
         return setInterval(() => {
            i = i > 3 ? 0 : i;
            process.stdout.write("\r" + frames[i] + " ");
            i++;
         }, 300);
      })();
      try {
         let baseUrl = endpoint.startsWith("https://") //
            ? endpoint
            : environment.BASE_URL.concat(endpoint);
         let { data } = await axios.get(baseUrl, {
            headers: environment.headers,
         });
         clearInterval(loading);
         callback(data);
      } catch (error) {
         console.log(error);
         console.log(chalk.bgRed(`\nerror : ${error?.response?.status} ${error?.response?.statusText}`));
         clearInterval(loading);
      }
   },
};

export default http;
