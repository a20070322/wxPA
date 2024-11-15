const DS = require("ds");
const { getLocalIPAddress } = require(".");
let ds = new DS();
exports.getConfig = () => {
  const localIp = getLocalIPAddress();
  const dsConfig = ds["config"] || {};
  const WXPA_PORT = process.env.WXPA_PORT || dsConfig.wxpaPort || 3000;
  const WXPA_HOST = process.env.WXPA_HOST || dsConfig.wxpaHost || localIp;
  const GEWE_HOST = process.env.GEWE_HOST || dsConfig.geweHost || localIp;
  const GEWE_PORT = process.env.GEWE_PORT || dsConfig.gewePort || 2531;
  const GEWE_DOWNLOAD_PORT =
    process.env.GEWE_DOWNLOAD_PORT || dsConfig.geweDownPort || 2532;
  const DEBUG = process.env.DEBUG || dsConfig.debug || false;
  const WEB_PORT = process.env.WEB_PORT || dsConfig.webPort || 3001;
  return {
    port: WXPA_PORT,
    proxy: `http://${WXPA_HOST}:${WXPA_PORT}`,
    debug: DEBUG,
    base_api: `http://${GEWE_HOST}:${GEWE_PORT}/v2/api`,
    file_api: `http://${GEWE_HOST}:${GEWE_DOWNLOAD_PORT}/download`,
    webPort: WEB_PORT,
    wxpa_host: WXPA_HOST,
  };
};
