#!/usr/bin/env node
import listPrompt from "./prompts/list.prompt.js";
import projectBuilder from "./apps/projects-builder/projects-builder.js";
import filesBuilder from "./apps/files-builder/files-builder.js";

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
