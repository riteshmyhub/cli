import chalk from "chalk";
const message = {
   //text
   primary: (str) => console.log(chalk.hex("#007BFF").bold(str)),
   secondary: (str) => console.log(chalk.hex("#6C757D").bold(str)),
   done: (str) => console.log(chalk.hex("#28A745").bold(str)),
   error: (str) => console.log(chalk.hex("#DC3545").bold(str)),
   warn: (str) => console.log(chalk.hex("#FFC107").bold(str)),
   //bg
   bg_primary: (str) => console.log(chalk.bgHex("#007BFF").bold(str)),
   bg_secondary: (str) => console.log(chalk.bgHex("#6C757D").bold(str)),
   bg_done: (str) => console.log(chalk.bgHex("#28A745").bold(str)),
   bg_error: (str) => console.log(chalk.bgHex("#DC3545").bold(str)),
   bg_warn: (str) => console.log(chalk.bgHex("#FFC107").bold(str)),
};

export default message;
