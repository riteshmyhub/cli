import axios from "axios";
import render from "../functions/render.js";

export default class CliService {
   constructor() {}
   async test() {
      let { data } = await axios.get("https://api.github.com/repos/riteshmyhub/cli/contents/source-code");
      console.log(data);
   }
   async _creating_api({ framework, element, name }) {
      try {
         process.stdout.write("loading.....");
         const { data } = await axios.get(`https://raw.githubusercontent.com/riteshmyhub/cli/master/source-code/${framework}/creating/${element}/${element}.jsx`);
         if (data) {
            let modifiedData = data.replace(/PlaceHolder/g, name);
            render({ response: modifiedData, name: name + ".jsx" });
         }
      } catch (error) {
         console.log(error.response.data);
      }
   }

   async _fetching_api({ framework, element }) {
      try {
         const { data } = await axios.get(`https://raw.githubusercontent.com/riteshmyhub/cli/master/source-code/${framework}/fetching/component.jsx`);
         console.log(data);
      } catch (error) {
         console.log(error.response.data);
      }
   }
}
