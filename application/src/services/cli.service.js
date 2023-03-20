import axios from "axios";

export default class CliService {
   constructor() {
      this.baseUrl = `https://raw.githubusercontent.com/riteshmyhub/cli/master`;
   }

   async _fetching_api({ framework, element }) {
      try {
         const { data } = await axios.get(`${this.baseUrl}/source-code/${framework}/fetching/component.jsx`);
         console.log(data);
      } catch (error) {
         console.log(error.response.data);
      }
   }

   async _creating_api({ framework, element }) {
      try {
         const { data } = await axios.get(`${this.baseUrl}/source-code/${framework}/creating/${element}/component.jsx`);
         console.log(data);
      } catch (error) {
         console.log(error.response.data);
      }
   }
}
