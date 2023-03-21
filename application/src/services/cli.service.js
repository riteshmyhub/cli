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
            error: error?.response?.data,
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
            error: error?.response?.data,
         });
      }
   }

   async _get_element({ framework, actionType, element, name, response }) {
      try {
         response({
            loading: true,
         });
         let { data } = await axios.get(`https://api.github.com/repos/riteshmyhub/cli/contents/source-code/${framework}/${actionType}/${element}`);

         if (data) {
            let res_array = [];
            data.forEach((item) => {
               if (item?.type === "file") {
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
   async _file_downlaod({ framework, actionType, element, file, name, response }) {
      try {
         response({
            loading: true,
         });
         let res = await axios.get(`https://api.github.com/repos/riteshmyhub/cli/contents/source-code/${framework}/${actionType}/${element}/${file}`);

         if (res.data) {
            render({
               download_url: res?.data?.download_url,
               fileName: file,
               name: name,
            });
            response({
               loading: false,
               data: "data",
            });
         }
      } catch (error) {
         response({
            loading: false,
            error: error?.response?.data,
         });
      }
   }

   async _multi_file_downlaod({ framework, actionType, response }) {
      try {
         response({
            loading: true,
         });
         let { data } = await axios.get(`https://api.github.com/repos/riteshmyhub/cli/contents/source-code/${framework}/${actionType}`);
         if (data) {
            let res = await axios.get(data[0].url);
            if (res?.data) {
               res?.data.forEach((element) => {
                  render({
                     download_url: element.download_url,
                     fileName: element.name,
                  });
               });
               response({
                  loading: false,
                  data: "file successfully download",
               });
            }
         }
      } catch (error) {
         response({
            loading: false,
            error: error?.response?.data,
         });
      }
   }
}
