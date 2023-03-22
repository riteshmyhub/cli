import inquirer from "inquirer";

export default async function inputPrompt({ questionObj, callback }) {
   try {
      let answer = await inquirer.prompt([questionObj]);
      callback({ answer });
   } catch (error) {
      callback({ error });
   }
}
