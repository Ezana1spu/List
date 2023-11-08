const fs = require("fs/promises")

async function ReadData() {
  try {
    const filename = 'listdata.json';
    // Make sure the file exists
    await fs.access(filename, fs.constants.R_OK);

    // Read the file
    const dataIn = await fs.readFile("listdata.json", "utf8");

    // convert the buffer to a json object and return it
    return JSON.parse(dataIn);

  } catch (error) {
    return [];
  }
}

async function WriteData(dataOut) {
  try {
    await fs.writeFile("listdata.json", JSON.stringify(dataOut));
    return ;
  } catch (error) {
    return ;
  }
}

exports.ReadData = ReadData;
exports.WriteData = WriteData;
