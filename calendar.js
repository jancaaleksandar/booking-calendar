const { HttpsProxyAgent } = require("https-proxy-agent");
const getConfig = require("./config");
const fs = require("fs");

async function BookingCalendar(args) {
  const fetch = (await import("node-fetch")).default;
  let response;
  let responseData;

  const proxy =
    "http://55b1b1397f189667fd5522445df00e1e1026d4a3:custom_headers=true@proxy.zenrows.com:8001";
  const httpsAgent = new HttpsProxyAgent(proxy);

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const config = await getConfig(args, httpsAgent);

  // Log the config to check its values
  console.log("Config:", config);

  // Ensure the URL is defined
  if (!config.url) {
    throw new Error("URL is undefined in config");
  }

  response = await attemptFetch(config, fetch);

  responseData = await response.json();

  fs.writeFileSync("calendar.json", JSON.stringify(responseData, null, 2));

  return responseData;
}

async function attemptFetch(config, fetch) {
  const response = await fetch(
    config.url,
    {
      method: config.method,
      headers: config.headers,
      body: config.data,
      agent: config.httpsAgent,
    }
  );

  return response;
}

module.exports = BookingCalendar;