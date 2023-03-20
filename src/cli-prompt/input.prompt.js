import inquirer from "inquirer";

export default async function inputPrompt({ questionObj, callback }) {
   try {
      let answers = await inquirer.prompt([questionObj]);
      callback({ answers });
   } catch (error) {
      callback({ error });
   }
}
