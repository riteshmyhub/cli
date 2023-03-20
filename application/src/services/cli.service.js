import axios from "axios";
import render from "../functions/render.js";

export default class CliService {
   constructor() {}

   //1  _frameworks_list
   async _get_frameworks_list(response) {
      try {
         response({
            loading: true,
         });
         let { data } = await axios.get("https://api.github.com/repos/riteshmyhub/cli/contents/source-code");
         let res_array = [];
         if (data) {
            data.forEach((item) => {
               if (item?.type === "dir") {
                  res_array.push(item.name);
               }
            });
            response({
               loading: false,
               data: res_array,
            });
         }
      } catch (error) {
         console.log(error?.response?.data?.message);
         response({
            loading: false,
            error: "error",
         });
      }
   }

   //2  _get_action_list
   async _get_action_list({ framework, response }) {
      try {
         response({
            loading: true,
         });
         let { data } = await axios.get(`https://api.github.com/repos/riteshmyhub/cli/contents/source-code/${framework}`);
         let res_array = [];
         if (data) {
            data.forEach((item) => {
               if (item?.type === "dir") {
                  res_array.push(item.name);
               }
            });
            response({
               loading: false,
               data: res_array,
            });
         }
      } catch (error) {
         response({
            loading: false,
            error: "error",
         });
      }
   }

   async _get_element_list({ framework, actionType, response }) {
      try {
         response({
            loading: true,
         });
         let { data } = await axios.get(`https://api.github.com/repos/riteshmyhub/cli/contents/source-code/${framework}/${actionType}`);
         let res_array = [];
         if (data) {
            data.forEach((item) => {
               if (item?.type === "dir") {
                  res_array.push(item.name);
               }
            });
            response({
               loading: false,
               data: res_array,
            });
         }
      } catch (error) {
         response({
            loading: false,
            error: "error",
         });
      }
   }
   async _fetching_element({ framework, actionType, element, name, response }) {
      try {
         response({
            loading: true,
         });
         let { data } = await axios.get(`https://api.github.com/repos/riteshmyhub/cli/contents/source-code/${framework}/${actionType}/${element}`);

         if (data) {
            //creating
            if (name) {
               let [file] = data;
               console.log(file);
               response({
                  loading: false,
                  data: data,
               });
            }
            //fetching
            else {
               let [file] = data;
               console.log(file);
               response({
                  loading: false,
                  data: data,
               });
            }
         }
      } catch (error) {
         console.log(error);
         response({
            loading: false,
            error: "error",
         });
      }
   }

   async _creating_api({ framework, element, name }) {
      try {
         process.stdout.write("loading.....");
         const { data } = await axios.get(`https://raw.githubusercontent.com/riteshmyhub/cli/master/source-code/${framework}/creating/${element}/${element}.jsx`);
         if (data) {
            let modifiedData = data.replace(/PlaceHolder/g, name);
            render({ response: modifiedData, name: name + ".jsx" });
         }
      } catch (error) {
         console.log(error.response.data);
      }
   }

   async _fetching_api({ framework, element }) {
      try {
         const { data } = await axios.get(`https://raw.githubusercontent.com/riteshmyhub/cli/master/source-code/${framework}/fetching/component.jsx`);
         console.log(data);
      } catch (error) {
         console.log(error.response.data);
      }
   }
}
