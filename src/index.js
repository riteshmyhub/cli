import inputPrompt from "./cli-prompt/input.prompt.js";
import listPrompt from "./cli-prompt/list.prompt.js";
import { mode_view_component, _componentCreate, _hookCreate } from "./functions/functions.js";
import CLIService from "./services/cli.service.js";

// listPrompt((list) => {
//    // inputPrompt((input) => {
//    //    if (list?.answers === "component") {
//    //       //_componentCreate({ name: input?.answers });
//    //    }
//    //    if (list?.answers === "hook") {
//    //       // _hookCreate({ name: input?.answers });
//    //    }
//    //    if (list?.answers === "mode-view-component") {
//    //       // mode_view_component({ name: input?.answers });
//    //    }
//    // });
// });

function selectFramework() {
   listPrompt({
      questionObj: {
         type: "list",
         message: "please select framework",
         name: "framework",
         choices: ["react", "angular"],
      },
      callback: ({ answers, error }) => {
         if (error) {
            console.log("error");
         }
         actionType(answers?.framework);
      },
   });
}

function actionType(framework) {
   listPrompt({
      questionObj: {
         type: "list",
         message: `what are your action type in ${framework}?`,
         name: "actionType",
         choices: ["create", "fetching"],
      },
      callback: ({ answers, error }) => {
         if (error) {
            console.log("error");
         }
         if (answers.actionType === "create") {
            creating(framework);
         }
         if (answers.actionType === "fetching") {
            fetching(framework);
         }
      },
   });
}

function fetching(framework) {
   console.log(framework);
}

function creating(framework) {
   let list = [];
   if (framework === "react") {
      let array = list.concat(["component", "hook", "mv-component"]);
      listPrompt({
         questionObj: {
            type: "list",
            message: `select creating element in ${framework}?`,
            name: "element",
            choices: array,
         },
         callback: ({ answers, error }) => {
            if (error) {
               console.log("error");
            }
            name_Elememt(answers.element);
         },
      });
   }
   if (framework === "angular") {
      let array = list.concat(["@component", "@directive"]);
      listPrompt({
         questionObj: {
            type: "list",
            message: `select creating element in ${framework}?`,
            name: "element",
            choices: array,
         },
         callback: ({ answers, error }) => {
            if (error) {
               console.log("error");
            }
            name_Elememt(answers.element);
         },
      });
   }
}

function name_Elememt(elememt) {
   inputPrompt({
      questionObj: {
         type: "input",
         name: "name",
         message: `enter ${elememt} name`,
      },
      callback: ({ answers, error }) => {
         if (error) {
            console.log("error");
         }
         const api = new CLIService();
         api._creating_api({
            framework: "react",
            element: answers.name,
         });
      },
   });
}
selectFramework();
