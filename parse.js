const fs = require("fs");

function parseAndSaveData(response) {
  try {
    // Log the type and content of the response
    // console.log("Type of response:", typeof response);
    // console.log("Response content:", response);

    // Check if response is a string, and if so, parse it as JSON
    if (typeof response === "string") {
      response = JSON.parse(response);
    }

    console.log("This is the response in the parseAndSaveData function", response); 

    // Access the .body property
    let bodyData = response.body;

    // Check if bodyData is a string, and if so, parse it as JSON
    if (typeof bodyData === "string") {
      try {
        bodyData = JSON.parse(bodyData);
      } catch (parseErr) {
        console.error("Error parsing bodyData as JSON:", parseErr);
        return;
      }
    }

    // Format the data with proper indentation
    const formattedData = JSON.stringify(bodyData, null, 2); // Indentation of 2 spaces

    // Save the formatted data to parsed.json
    fs.writeFile(`./responses/parsed.json`, formattedData, "utf8", (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }
      console.log("Data parsed and saved successfully!");
    });
  } catch (err) {
    console.error("Error parsing JSON:", err);
  }
}

module.exports = parseAndSaveData;