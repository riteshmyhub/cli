#!/usr/bin/env node
import inputPrompt from "./cli-prompt/input.prompt.js";
import listPrompt from "./cli-prompt/list.prompt.js";
import CliService from "./services/cli.service.js";

const { _get_frameworks_list, _get_action_list, _get_element_list, _get_fetching_element_list, _file_downlaod } = new CliService();

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
                  create_and_download_file({
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
function create_and_download_file({ framework, actionType, element }) {
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
      _get_fetching_element_list({
         framework,
         actionType,
         element,
         response: ({ loading, data, error }) => {
            if (loading) {
               console.log("loading...");
            }
            if (data) {
               listPrompt({
                  questionObj: {
                     type: "list",
                     message: `which ${element} type do you want?`,
                     name: "list",
                     choices: data,
                  },
                  callback: ({ error, answers }) => {
                     if (error) {
                        console.log(error);
                     }
                     if (answers) {
                        _file_downlaod({
                           framework,
                           actionType,
                           element,
                           fileName: answers?.list,
                           response: ({ loading, data, error }) => {
                              if (loading) {
                                 console.log();
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
            if (error) {
               console.log(error);
            }
         },
      });
   }
}
