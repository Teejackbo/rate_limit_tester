const { promisify } = require("util");
const writeFile = promisify(require("fs").writeFile);
const axios = require("axios");
const ArgumentLoader = require("./arguments/ArgumentLoader");
const formatLog = require("./formatLog");

(async function() {
  const args = new ArgumentLoader();
  const { number, method, endpoint, file } = args.getArgs();

  const requests = Array(number).fill(
    axios[method](endpoint).catch(e => e.response)
  );
  const responses = await Promise.all(requests);
  const logs = [];

  responses.forEach((response, index) => {
    console.log(
      `Request ${index + 1} Complete\n`,
      `Status: ${response.status}\n`
    );

    logs.push(formatLog(response, index, endpoint, method));
  });

  await writeFile(`./logs/${file}.txt`, logs.join("\n"));
  console.log(`Responses successfully written to logs/${file}.txt`);
})();
