import dotenv from "dotenv";
dotenv.config();

export const environment = Object.freeze({
   disabled: false,
   production: true,
   baseUrl: process.env.BASE_URL,
});
