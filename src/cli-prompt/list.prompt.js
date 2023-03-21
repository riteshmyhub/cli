import inquirer from "inquirer";

export default async function listPrompt({ questionObj, callback }) {
   try {
      let answers = await inquirer.prompt([questionObj]);
      callback({ answers: answers });
   } catch (error) {
      callback({ error: error });
   }
}
