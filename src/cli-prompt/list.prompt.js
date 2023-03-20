import inquirer from "inquirer";

export default async function listPrompt(actionCB) {
   try {
      let answers = await inquirer.prompt([
         {
            type: "list",
            message: "what do you want create in react",
            name: "answers",
            choices: ["hook", "component", "mode-view-component"],
         },
      ]);
      actionCB(answers);
   } catch (error) {
      console.log(error);
   }
}
