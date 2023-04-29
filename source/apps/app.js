import listPrompt from "../prompts/list.prompt.js";
import filesBuilder from "./files-builder/files-builder.js";
import projectBuilder from "./projects-builder/projects-builder.js";

export default function app() {
   listPrompt({
      questionObj: {
         type: "list",
         message: "what is your action",
         name: "action",
         choices: ["create-app", "fetching-and-create-file"],
      },
      callback: (answer) => {
         if (answer?.action === "create-app") {
            projectBuilder();
         }
         if (answer?.action === "fetching-and-create-file") {
            filesBuilder();
         }
      },
   });
}
