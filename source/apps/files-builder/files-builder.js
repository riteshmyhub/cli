import http from "../../http/http.js";
import inputPrompt from "../../prompts/input.prompt.js";
import listPrompt from "../../prompts/list.prompt.js";
import render from "./functions/render.js";
import chalk from "chalk";

export default function filesBuilder() {
   let base_endpoint = "/cli-source-code/contents/code";
   //1 select framework
   const select_framework = () => {
      http.get(base_endpoint, (data) => {
         if (data) {
            listPrompt({
               questionObj: {
                  type: "list",
                  message: "please select framework",
                  name: "framework",
                  choices: data.map((m) => m?.type === "dir" && m.name),
               },
               callback: (answer) => {
                  select_action_type(answer?.framework);
               },
            });
         }
      });
   };
   select_framework();

   // 2 select_action_type
   const select_action_type = (framework) => {
      http.get(base_endpoint + "/" + framework, (data) => {
         if (data) {
            listPrompt({
               questionObj: {
                  type: "list",
                  message: `what are your action type in ${framework}?`,
                  name: "actionType",
                  choices: data.map((m) => m?.type === "dir" && m.name),
               },
               callback: (answer) => {
                  element_list(framework, answer?.actionType);
               },
            });
         }
      });
   };

   // 3 element_list
   const element_list = (framework, actionType) => {
      http.get(base_endpoint + "/" + framework + "/" + actionType, (data) => {
         if (data) {
            listPrompt({
               questionObj: {
                  type: "list",
                  message: `select ${actionType} element in ${framework}?`,
                  name: "element",
                  choices: data.map((m) => m?.type === "dir" && m.name),
               },
               callback: (answer) => {
                  child_element_list(framework, actionType, answer.element);
               },
            });
         }
      });
   };

   //4 child element list
   const child_element_list = (framework, actionType, element) => {
      // creating
      let url = `${base_endpoint}/${framework}/${actionType}/${element}`;
      if (actionType === "creating") {
         inputPrompt({
            questionObj: {
               type: "input",
               message: `enter ${element} name?`,
               name: "name",
               validate: async (input) => {
                  if (input.match(/^[a-z\-]+$/)) {
                     return true;
                  } else {
                     return "input must be like example : foo or foo-bar";
                  }
               },
            },
            callback: (answer) => {
               http.get(url, (data) => {
                  if (data) {
                     download_file({
                        framework: framework,
                        actionType: actionType,
                        element: element,
                        input_name: answer?.name,
                     });
                  }
               });
            },
         });
      }
      if (actionType === "fetching") {
         http.get(url, (data) => {
            if (data) {
               listPrompt({
                  questionObj: {
                     type: "list",
                     message: `which ${element} type do you want?`,
                     name: "list",
                     choices: data.map((m) => m?.type === "dir" && m.name),
                  },
                  callback: (answer) => {
                     download_file({
                        framework: framework,
                        actionType: actionType,
                        element: element,
                        child_element: answer?.list,
                     });
                  },
               });
            }
         });
      }
   };

   //5 dowmload file
   const download_file = ({ framework, actionType, element, child_element, input_name }) => {
      let child_ele = child_element ? `/${child_element}` : "";
      let url = `${base_endpoint}/${framework}/${actionType}/${element}`.concat(child_ele);
      http.get(url, (data) => {
         if (data) {
            console.log(chalk.bgGreen(`\nfind ${data?.length} file.`));
            data.forEach((item, index) => {
               render({
                  download_url: item.download_url,
                  fileName: item.name,
                  name: input_name || child_element,
               });
            });
         }
      });
   };
}
