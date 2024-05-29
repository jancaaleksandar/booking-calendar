// const BookingCalendar = require("./calendar");
const fs = require("fs");
const lambdaHandler = require("./lambdaHandler");

// async function Test() {
//   const args = {
//     countryCode: "gr",
//     pagename: "the-alex",
//     hotelId: "5143098",
//     startDate: "2024-11-01",
//   };
//   const response = await BookingCalendar(args);

//   const jsoned = await response.json();

//   fs.writeFileSync("calendar.json", JSON.stringify(jsoned, null, 2));
// }

// Test();

const event = {
  countryCode: "gr",
  pagename: "the-alex",
  hotelId: "5143098",
  startDate: "2024-11-01",
};

const context = {};

lambdaHandler
  .handler(event, context)
  .then(async (response) => {
    fs.writeFileSync("response.json", JSON.stringify(response, null, 2));
  })
  .catch((error) => {
    console.log("THIS IS THE ERROR COMING FROM THE LAMBDAHANDLER ", error);
  });
