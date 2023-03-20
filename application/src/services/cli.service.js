import axios from "axios";

export default class CliService {
   constructor() {}

   async _creating_api({ framework, element, name }) {
      try {
         const { data } = await axios.get(`https://raw.githubusercontent.com/riteshmyhub/cli/master/source-code/${framework}/creating/${element}/${element}.jsx`);
         // name
         console.log(data);
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
