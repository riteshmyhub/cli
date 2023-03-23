import axios from "axios";
import { environment } from "../../environment/environment.js";

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
         let baseUrl = endpoint.startsWith("###") ? endpoint.replace(/###/g, "") : environment.baseUrl.concat(endpoint ? endpoint : "");
         setTimeout(async () => {
            let { data } = await axios.get(baseUrl);
            clearInterval(loading);
            callback(data);
         }, 1000);
      } catch (error) {
         console.log("error");
         clearInterval(loading);
      }
   },
};

export default http;
