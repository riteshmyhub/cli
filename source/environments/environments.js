import authConfig from "../../auth.config.js";

const environment = {
   BASE_URL: `https://api.github.com/repos/${authConfig.USERNAME}`,
   headers: {
      Authorization: `Bearer ${authConfig.TOKEN}`,
      ["X-GitHub-Api-Version"]: authConfig.API_VERSION,
   },
};
export default environment;
