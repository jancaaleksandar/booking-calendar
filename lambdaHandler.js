const BookingCalendar = require("./calendar");

exports.handler = async (event, context) => {
  const response = await BookingCalendar(event);
  try {
    fullLambdaResponse = {
      statusCode: 200,
      body: JSON.stringify(response),
    };
    return fullLambdaResponse;
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
