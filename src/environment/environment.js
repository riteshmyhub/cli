import dotenv from "dotenv";
dotenv.config();

export const environment = Object.freeze({
   disabled: false,
   production: true,
   baseUrl: "https://api.github.com/repos/riteshmyhub/cli-source-code/contents/code",
});
