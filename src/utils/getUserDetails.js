const request = require("request");

const getUserDetails = (id, callback) => {
  request(
    { url: `https://jsonplaceholder.typicode.com/users/${id}`, json: true },
    (error, { body }) => {
      if (error) {
        callback(error, undefined);
      } else {
        callback(undefined, body);
      }
    }
  );
};

module.exports = getUserDetails;
