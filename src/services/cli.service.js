import render from "../functions/render.js";
import http from "../http/http.js";

export default class CliService {
   constructor() {}

   //1  _frameworks_list
   _get_frameworks_list({ response }) {
      http.get("", (data) => {
         if (data) {
            let res_array = [];
            data.forEach((item) => {
               if (item?.type === "dir") {
                  res_array.push(item.name);
               }
            });
            response(res_array);
         }
      });
   }

   //2  _get_action_list
   _get_action_list({ framework, response }) {
      http.get(`/${framework}`, (data) => {
         if (data) {
            let res_array = [];
            data.forEach((item) => {
               if (item?.type === "dir") {
                  res_array.push(item.name);
               }
            });
            response(res_array);
         }
      });
   }

   _get_element_list({ framework, actionType, response }) {
      http.get(`/${framework}/${actionType}`, (data) => {
         if (data) {
            let res_array = [];
            data.forEach((item) => {
               if (item?.type === "dir") {
                  res_array.push(item.name);
               }
            });
            response(res_array);
         }
      });
   }

   _get_fetching_element_list({ framework, actionType, element, response }) {
      http.get(`/${framework}/${actionType}/${element}`, (data) => {
         if (data) {
            let res_array = [];
            data.forEach((item) => {
               if (item?.type === "dir") {
                  res_array.push(item.name);
               }
            });
            response(res_array);
         }
      });
   }

   _file_downlaod({ framework, actionType, element, fileName, name, response }) {
      let url = `/${framework}/${actionType}/${element}`;
      http.get(url.concat(fileName ? `/${fileName}` : ""), (data) => {
         if (data) {
            response(`\nfind ${data?.length} file.`);
            data.forEach((item, index) => {
               render({
                  download_url: item.download_url,
                  fileName: item.name,
                  name: name || fileName,
               });
            });
         }
      });
   }
}
