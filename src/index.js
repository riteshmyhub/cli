#!/usr/bin/env node
import inputPrompt from "./cli-prompt/input.prompt.js";
import listPrompt from "./cli-prompt/list.prompt.js";
import { environment } from "../environment/environment.js";
import CliService from "./services/cli.service.js";

if (!environment.disabled) {
   const { _get_frameworks_list, _get_action_list, _get_element_list, _get_fetching_element_list, _file_downlaod } = new CliService();

   // step : 1
   _get_frameworks_list({
      response: (data) => {
         listPrompt({
            questionObj: {
               type: "list",
               message: "please select framework",
               name: "framework",
               choices: data,
            },
            callback: (answer) => {
               actionType(answer?.framework);
            },
         });
      },
   });

   // step : 2
   function actionType(framework) {
      _get_action_list({
         framework: framework,
         response: (data) => {
            if (data) {
               listPrompt({
                  questionObj: {
                     type: "list",
                     message: `what are your action type in ${framework}?`,
                     name: "actionType",
                     choices: data,
                  },
                  callback: (answer) => {
                     if (answer) {
                        elementList({
                           framework: framework,
                           actionType: answer?.actionType,
                        });
                     }
                  },
               });
            }
         },
      });
   }

   // step : 3
   function elementList({ framework, actionType }) {
      _get_element_list({
         framework,
         actionType,
         response: (data) => {
            if (data) {
               listPrompt({
                  questionObj: {
                     type: "list",
                     message: `select ${actionType} element in ${framework}?`,
                     name: "element",
                     choices: data,
                  },
                  callback: (answer) => {
                     create_and_download_file({
                        framework,
                        actionType,
                        element: answer.element,
                     });
                  },
               });
            }
         },
      });
   }
   // step : 4
   function create_and_download_file({ framework, actionType, element }) {
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
               if (answer.name) {
                  _file_downlaod({
                     name: answer.name,
                     framework,
                     element,
                     actionType,
                     response: (data) => {
                        console.log(data);
                     },
                  });
               } else {
                  console.log("Invalue input");
               }
            },
         });
      }
      if (actionType === "fetching") {
         _get_fetching_element_list({
            framework,
            actionType,
            element,
            response: (data) => {
               if (data) {
                  listPrompt({
                     questionObj: {
                        type: "list",
                        message: `which ${element} type do you want?`,
                        name: "list",
                        choices: data,
                     },
                     callback: (answer) => {
                        if (answer) {
                           _file_downlaod({
                              framework,
                              actionType,
                              element,
                              fileName: answer?.list,
                              response: (data) => {
                                 console.log(data);
                              },
                           });
                        }
                     },
                  });
               }
            },
         });
      }
   }
}
