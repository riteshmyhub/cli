#!/usr/bin/env node
import inputPrompt from "./cli-prompt/input.prompt.js";
import listPrompt from "./cli-prompt/list.prompt.js";
import CliService from "./services/cli.service.js";

const { _get_frameworks_list, _get_action_list, _get_element_list, _get_element, _file_downlaod } = new CliService();

// step : 1
_get_frameworks_list(({ loading, data, error }) => {
   if (loading) {
      console.log("loading...");
   }
   if (data) {
      console.log(data);
      listPrompt({
         questionObj: {
            type: "list",
            message: "please select framework",
            name: "framework",
            choices: data,
         },
         callback: ({ answers, error }) => {
            if (error) {
               console.log(error);
            }
            actionType(answers?.framework);
         },
      });
   }
   if (error) {
      console.log(error);
   }
});

// step : 2
function actionType(framework) {
   _get_action_list({
      framework: framework,
      response: ({ loading, data, error }) => {
         if (loading) {
            console.log("loading...");
         }
         if (data) {
            listPrompt({
               questionObj: {
                  type: "list",
                  message: `what are your action type in ${framework}?`,
                  name: "actionType",
                  choices: data,
               },
               callback: ({ answers, error }) => {
                  if (error) {
                     console.log(error);
                  }
                  if (answers) {
                     elementList({
                        framework: framework,
                        actionType: answers?.actionType,
                     });
                  }
               },
            });
         }
         if (error) {
            console.log("error");
         }
      },
   });
}

// step : 3
function elementList({ framework, actionType }) {
   _get_element_list({
      framework,
      actionType,
      response: ({ loading, data, error }) => {
         if (loading) {
            console.log("loading...");
         }
         if (data) {
            listPrompt({
               questionObj: {
                  type: "list",
                  message: `select ${actionType} element in ${framework}?`,
                  name: "element",
                  choices: actionType === "creating" ? data : data.concat("download-all"),
               },
               callback: ({ answers, error }) => {
                  if (error) {
                     console.log(error);
                  }
                  download_file({
                     framework,
                     actionType,
                     element: answers.element,
                  });
               },
            });
         }
         if (error) {
            console.log(error);
         }
      },
   });
}
// step : 4
function download_file({ framework, actionType, element }) {
   if (actionType === "creating") {
      inputPrompt({
         questionObj: {
            type: "input",
            message: `enter ${element} name?`,
            name: "name",
         },
         callback: ({ error, answers }) => {
            if (error) {
               console.log(error);
            }
            if (answers.name) {
               _file_downlaod({
                  name: answers.name,
                  framework,
                  element,
                  actionType,
                  response: ({ loading, data, error }) => {
                     if (loading) {
                        console.log("loading...");
                     }
                     if (data) {
                        console.log(data);
                     }
                     if (error) {
                        console.log(error);
                     }
                  },
               });
            }
         },
      });
   }
   if (actionType === "fetching") {
   }
}
