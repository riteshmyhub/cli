import inputPrompt from "./cli-prompt/input.prompt.js";
import listPrompt from "./cli-prompt/list.prompt.js";
import CliService from "./services/cli.service.js";
import CLIService from "./services/cli.service.js";

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
            create_element(framework, answers.element);
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
            create_element(framework, answers.element);
         },
      });
   }
}

function create_element(framework, elememt) {
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
         const { _creating_api } = new CLIService();
         _creating_api({
            framework: framework,
            element: elememt,
            name: answers.name,
         });
      },
   });
}
//selectFramework();
const name = new CliService();
name.test();
