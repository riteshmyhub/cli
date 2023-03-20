import inputPrompt from "./cli-prompt/input.prompt.js";
import listPrompt from "./cli-prompt/list.prompt.js";
import { mode_view_component, _componentCreate, _hookCreate } from "./functions/functions.js";
import CLIService from "./services/cli.service.js";

// listPrompt((list) => {
//    inputPrompt((input) => {
//       if (list?.answers === "component") {
//          _componentCreate({ name: input?.answers });
//       }
//       if (list?.answers === "hook") {
//          _hookCreate({ name: input?.answers });
//       }
//       if (list?.answers === "mode-view-component") {
//          mode_view_component({ name: input?.answers });
//       }
//    });
// });

const api = new CLIService();
api._test(({ loading, data, error }) => {
   if (loading) {
      console.log("loading....");
   }
   if (data) {
      console.log(data);
   }
   if (error) {
      console.log(error);
   }
});
