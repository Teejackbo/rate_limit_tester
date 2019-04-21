const { promisify } = require("util");
const writeFile = promisify(require("fs").writeFile);
const axios = require("axios");
const ArgumentLoader = require("./arguments/ArgumentLoader");

(async function main() {
  const args = new ArgumentLoader();
  const { number, method, endpoint, file } = args.getArgs();

  const requests = Array(number).fill(
    axios[method](endpoint).catch(e => e.response)
  );
  const responses = await Promise.all(requests);
  const writes = [];

  responses.forEach((response, index) => {
    console.log(`Request ${index + 1} Complete\nStatus: ${response.status}\n`);

    writes.push(
      `Request ${index + 1}\nDate: ${response.headers.date || ""}\nStatus: ${
        response.status
      }\nURL: ${endpoint}\nMethod: ${method.toUpperCase()}\n`
    );
  });

  await writeFile(`./logs/${file}.txt`, writes.join("\n"));
  console.log(`Responses successfully written to logs/${file}.txt`);
})();
