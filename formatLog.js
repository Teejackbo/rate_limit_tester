module.exports = (response, index, endpoint, method) =>
  [
    `Request ${index + 1}`,
    `Date: ${response.headers.date || ""}`,
    `Status: ${response.status}`,
    `URL: ${endpoint}`,
    `Method: ${method.toUpperCase()}\n`
  ].join("\n");
