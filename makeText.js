/** Command-line tool to generate Markov text. */

const fs = require("fs");
const axios = require("axios");
const MarkovMachine = require("./markov");  // Ensure the path is correct!

async function getText(sourceType, source) {
  if (sourceType === "file") {
    return fs.promises.readFile(source, "utf8");
  } else if (sourceType === "url") {
    const response = await axios.get(source);
    return response.data;
  } else {
    throw new Error("Unsupported source type.");
  }
}

async function generateText() {
  try {
    const [_, __, sourceType, source] = process.argv;
    const text = await getText(sourceType, source);
    const machine = new MarkovMachine(text);
    console.log(machine.makeText());
  } catch (err) {
    console.error(`Error generating text: ${err.message}`);
  }
}

generateText();
