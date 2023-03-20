import inquirer from "inquirer";

export default async function inputPrompt(actionCB) {
   try {
      let answers = await inquirer.prompt([
         {
            type: "input",
            name: "answers",
            message: "enter component name",
            choices: ["App"],
         },
      ]);
      actionCB(answers);
   } catch (error) {
      console.log(error);
   }
}
