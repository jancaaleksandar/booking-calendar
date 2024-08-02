const { HttpsProxyAgent } = require("https-proxy-agent");
const getConfig = require("./config");
const fs = require("fs");
const proxyManager = require("@jancaaleksandar/proxy-manager");
const getCalendar = require("./utils/getCalendar");
const attemptFetch = require("./utils/attemptFetch");
const timer = require("response-timer-package");
const isValidFutureDate = require("./utils/isValidFutureDate");

async function bookingCalendar(args) {
  timer.start();

  if (!isValidFutureDate(args.startDate)) {
    throw new Error("Invalid start date");
  }
  const fetch = (await import("node-fetch")).default;
  let response;
  let responseData;
  let success = false;
  let calendar;

  for (let retries = 0; retries < 5; retries++) {
    console.log("Attempt : ", retries + 1);
    const proxy =
      retries < 5 ? proxyManager.getProxy() : proxyManager.getProxy(true);
    const httpsAgent = new HttpsProxyAgent(proxy);

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    const config = await getConfig(args, httpsAgent);

    // Log the config to check its values
    // console.log("Config:", config);

    response = await attemptFetch(config, fetch);

    if (response.status === 200) {
      responseData = await response.json();
      fs.writeFileSync(
        "./responses/bookingRaw.json",
        JSON.stringify(responseData, null, 2)
      );
      console.log("The response was 200");
      calendar = await getCalendar(responseData);
      success = true;
      break;
    }
  }

  //   fs.writeFileSync("calendar.json", JSON.stringify(responseData, null, 2));

  const timeTaken = timer.stop();

  return { calendar: calendar, success: success, request: args, timeTaken };
}

module.exports = bookingCalendar;
