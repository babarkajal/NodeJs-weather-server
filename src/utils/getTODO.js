//REQUEST LIBRARY TO CALL URL
const request = require("request");

//GET TODOs REQUEST
const getTODO = (id, callback) => {
  const url = "https://jsonplaceholder.typicode.com/todos/" + id;
  request({ url: url, json: true }, (error, response) => {
    console.log(error, response);
    if (error) {
      callback(error, undefined);
    } else {
      callback(undefined, response?.body);
    }
  });
};

module.exports = getTODO;
