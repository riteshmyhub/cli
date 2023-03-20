import inputPrompt from "./cli-prompt/input.prompt.js";
import listPrompt from "./cli-prompt/list.prompt.js";
import CliService from "./services/cli.service.js";

const { _get_frameworks_list, _get_action_list, _get_element_list, _get_element, _download_code } = new CliService();

// step : 1
_get_frameworks_list(({ loading, data, error }) => {
   if (loading) {
      console.log("loading...");
   }
   if (data) {
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
                  choices: data,
               },
               callback: ({ answers, error }) => {
                  if (error) {
                     console.log(error);
                  }
                  fetching_element({
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
function fetching_element({ framework, actionType, element }) {
   if (actionType === "creating") {
      inputPrompt({
         questionObj: {
            type: "input",
            name: "name",
            message: `enter ${element} name`,
         },
         callback: ({ answers, error }) => {
            if (error) {
               console.log(error);
            }
            _get_element({
               framework,
               actionType,
               element,
               name: answers.name,
               response: ({ loading, data, error }) => {
                  if (loading) {
                     console.log("loading...");
                  }
                  if (data) {
                     get_element_files({
                        framework,
                        actionType,
                        data: data,
                        name: answers.name,
                        element,
                     });
                  }
                  if (error) {
                     console.log(error);
                  }
               },
            });
         },
      });
   }
   if (actionType === "fetching") {
      _get_element({
         framework,
         actionType,
         element,
         response: ({ loading, data, error }) => {
            if (loading) {
               console.log("loading...");
            }
            if (data) {
               get_element_files({
                  framework,
                  actionType,
                  data: data,
                  element,
               });
            }
            if (error) {
               console.log(error);
            }
         },
      });
   }
}
// step : 5
function get_element_files({ framework, actionType, data, element, name }) {
   listPrompt({
      questionObj: {
         type: "list",
         message: `select ${element} file list?`,
         name: "file",
         choices: data,
      },
      callback: ({ answers, error }) => {
         if (error) {
            console.log(error);
         }
         _download_code({
            framework,
            actionType,
            file: answers.file,
            element: element,
            name: name,
            response: ({ loading, data, error }) => {
               if (loading) {
                  console.log("please wait...");
               }
               if (data) {
                  console.log(data);
               }
               if (error) {
                  console.log(error);
               }
            },
         });
      },
   });
}
