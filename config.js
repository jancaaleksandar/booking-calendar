module.exports = async (args, httpsAgent) => {
  const userAgent = getUserAgent();
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
      "User-Agent": userAgent,
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

function getUserAgent() {
  const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15",
  ];

  const randomIndex = Math.floor(Math.random() * userAgents.length);
  const randomUserAgent = userAgents[randomIndex];

  return randomUserAgent;
}
