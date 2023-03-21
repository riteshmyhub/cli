import axios from "axios";

const environment = Object.freeze({
   //baseURL: `${window.location.origin}/api/v1`,
   baseURL: `http://localhost:8000/api/v1`,
});

function auth_header() {
   let token = localStorage.getItem("token");
   return { Authorization: `Bearer ${token}` };
}
function removeToken(error) {
   let status = error?.response?.data?.error?.status;
   if (status === 401) {
      localStorage.clear();
   }
}
const http = {
   get: async ({ endpoint, queryObj, callback }) => {
      try {
         callback(true, null, null);
         let { data } = await axios.get(`${environment.baseURL + endpoint}`, {
            params: queryObj ? queryObj : {}, //
            headers: auth_header(),
         });
         callback(false, data, null);
      } catch (error) {
         if (error) {
            callback(false, null, error?.response?.data?.error);
            removeToken(error);
         }
      }
   },
   post: async ({ endpoint, queryObj, body, callback }) => {
      callback(true, null, null);
      try {
         const { data } = await axios.post(`${environment.baseURL + endpoint}`, body, { params: queryObj ? queryObj : {}, headers: auth_header() });
         callback(false, data, null);
      } catch (error) {
         callback(false, null, error?.response?.data?.error);
         removeToken(error);
      }
   },
   put: async ({ endpoint, queryObj, body, callback }) => {
      callback(true, null, null);
      try {
         const { data } = await axios.put(`${environment.baseURL + endpoint}`, body, { params: queryObj ? queryObj : {}, headers: auth_header() });
         callback(false, data, null);
      } catch (error) {
         callback(false, null, error?.response?.data?.error);
         removeToken(error);
      }
   },
   delete: async ({ endpoint, queryObj, callback }) => {
      try {
         callback(true, null, null);
         const { data } = await axios.delete(`${environment.baseURL + endpoint}`, { params: queryObj, headers: auth_header() });
         callback(false, data, null);
      } catch (error) {
         callback(false, null, error?.response?.data?.error);
         removeToken(error);
      }
   },
};

export default http;
