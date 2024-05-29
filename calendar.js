const { HttpsProxyAgent } = require("https-proxy-agent");
const getConfig = require("./config");
// const fs = require("fs");

async function BookingCalendar(args) {
  const fetch = (await import("node-fetch")).default;
  let response;
  let responseData;
  let success = false;

  for (let j = 0; j < 5; j++) {
    console.log("Trying with normal proxies attempt : ", j + 1);
    const proxy =
      "http://55b1b1397f189667fd5522445df00e1e1026d4a3:custom_headers=true@proxy.zenrows.com:8001";
    const httpsAgent = new HttpsProxyAgent(proxy);

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    const config = await getConfig(args, httpsAgent);

    // Log the config to check its values
    console.log("Config:", config);

    response = await attemptFetch(config, fetch);

    if (response.status === 200) {
      responseData = await response.json();
      console.log("The response was 200");
      success = true;
      break;
    }
  }

  if (!success) {
    for (let i = 0; i < 5; i++) {
      console.log("Trying with premium proxies attempt : ", i + 1);
      const proxy =
        "http://55b1b1397f189667fd5522445df00e1e1026d4a3:custom_headers=true&premium_proxy=true@proxy.zenrows.com:8001";
      const httpsAgent = new HttpsProxyAgent(proxy);

      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

      const config = await getConfig(args, httpsAgent);

      // Log the config to check its values
      console.log("Config:", config);

      response = await attemptFetch(config, fetch);

      if (response.status === 200) {
        responseData = await response.json();
        console.log("The response was 200");
        success = true;
        break;
      }
    }
  }

  //   fs.writeFileSync("calendar.json", JSON.stringify(responseData, null, 2));

  return responseData;
}

async function attemptFetch(config, fetch) {
  const response = await fetch(config.url, {
    method: config.method,
    headers: config.headers,
    body: config.data,
    agent: config.httpsAgent,
  });

  return response;
}

module.exports = BookingCalendar;
