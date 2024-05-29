const axios = require("axios");

module.exports = async (args, httpsAgent) => {
  let data = JSON.stringify({
    operationName: "AvailabilityCalendar",
    variables: {
      input: {
        travelPurpose: 2,
        pagenameDetails: {
          countryCode: args.countryCode,
          pagename: args.pagename,
        },
        searchConfig: {
          searchConfigDate: {
            startDate: args.startDate, //yyyy-mm-dd
            amountOfDays: 61, // 61 is the max days
          },
          nbAdults: 2,
          nbRooms: 1,
          nbChildren: 0,
          childrenAges: [],
        },
      },
    },
    extensions: {},
    query:
      "query AvailabilityCalendar($input: AvailabilityCalendarQueryInput!) {\n  availabilityCalendar(input: $input) {\n    ... on AvailabilityCalendarQueryResult {\n      hotelId\n      days {\n        available\n        avgPriceFormatted\n        checkin\n        minLengthOfStay\n        __typename\n      }\n      __typename\n    }\n    ... on AvailabilityCalendarQueryError {\n      message\n      __typename\n    }\n    __typename\n  }\n}\n",
  });

  return {
    method: "post",
    maxBodyLength: Infinity,
    url: `https://www.booking.com/dml/graphql?highlighted_hotels=${args.hotelId}`,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:126.0) Gecko/20100101 Firefox/126.0",
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.5",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "content-type": "application/json",
      "x-apollo-operation-name": "AvailabilityCalendar",
      Origin: "https://www.booking.com",
      Connection: "keep-alive",
      TE: "trailers",
    },
    data: data,
    httpsAgent: httpsAgent,
  };
};
