import credentialConfig from "../../credential.config.js";

const environment = {
   BASE_URL: `https://api.github.com/repos/${credentialConfig.USERNAME}`,
   headers: {
      Authorization: `Bearer ${credentialConfig.TOKEN}`,
      ["X-GitHub-Api-Version"]: credentialConfig.API_VERSION,
   },
};
export default environment;
