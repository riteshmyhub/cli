import axios from "axios";
import { environment } from "../../environment/environment.js";
import render from "../functions/render.js";

export default class CliService {
   constructor() {}

   //1  _frameworks_list
   async _get_frameworks_list(response) {
      try {
         response({
            loading: true,
         });
         let { data } = await axios.get(environment.baseUrl);
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
            error: error?.response?.data,
         });
      }
   }

   //2  _get_action_list
   async _get_action_list({ framework, response }) {
      try {
         response({
            loading: true,
         });
         let { data } = await axios.get(`${environment.baseUrl}/${framework}`);
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
            error: error?.response?.data,
         });
      }
   }

   async _get_element_list({ framework, actionType, response }) {
      try {
         response({
            loading: true,
         });
         let { data } = await axios.get(`${environment.baseUrl}/${framework}/${actionType}`);
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
            error: error?.response?.data,
         });
      }
   }

   async _get_fetching_element_list({ framework, actionType, element, response }) {
      try {
         response({
            loading: true,
         });
         let { data } = await axios.get(`${environment.baseUrl}/${framework}/${actionType}/${element}`);

         if (data) {
            let res_array = [];
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
         console.log(error);
         response({
            loading: false,
            error: error?.response?.data,
         });
      }
   }

   async _file_downlaod({ framework, actionType, element, fileName, name, response }) {
      try {
         response({
            loading: true,
         });
         let { data } = await axios.get(`${environment.baseUrl}/${framework}/${actionType}/${element}`.concat(fileName ? `/${fileName}` : ""));

         if (data) {
            data.forEach((item) => {
               render({
                  download_url: item.download_url,
                  fileName: item.name,
                  name: name || fileName,
               });
            });
            response({
               loading: false,
               data: "file successfully download",
            });
         }
      } catch (error) {
         response({
            loading: false,
            error: error?.response?.data,
         });
      }
   }
}
