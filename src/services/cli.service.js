import axios from "axios";

export default class CLIService {
   constructor() {
      this.baseUrl = `https://raw.githubusercontent.com/riteshmyhub/dnhsecheron/master`;
   }

   async _test(actionCB) {
      try {
         actionCB({
            loading: true,
         });
         const { data } = await axios.get(`${this.baseUrl}/src/styles.css`);
         actionCB({
            loading: false,
            data: data,
         });
      } catch (error) {
         actionCB({
            loading: false,
            error: "fetch error",
         });
      }
   }
}
