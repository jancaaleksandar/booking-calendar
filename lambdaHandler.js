const bookingCalendar = require("./calendar");

exports.handler = async (event, context) => {
  let data;
  try {
    if ("body" in event) {
      data = JSON.parse(event.body); // Parse the JSON string to a dictionary
    } else {
      data = event;
    }
    const response = await bookingCalendar(data);
    fullLambdaResponse = {
      statusCode: 200,
      body: JSON.stringify(response),
    };
    return fullLambdaResponse;
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};