/* -------------------------------------------------------------------------- */
/*                           SERVER SIDE JAVASCRIPT                           */
/* -------------------------------------------------------------------------- */

const path = require("path");
const express = require("express");
const hbs = require("hbs");
const getTODO = require("./utils/getTODO");
const getUserDetails = require("./utils/getUserDetails");
//PROVIDES DIRECTORY PATH
//console.log(__dirname);
//CURRENT FILE PATH
// console.log(__filename);

//Define paths for Express config
const publicFold = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPaths = path.join(__dirname, "../templates/partials");

//INIT EXPRESS
const app = express();

//Setup static directory to serve
app.set("view engine", "hbs"); //SET UP A VIEW ENGINE
app.set("views", viewsPath); //SET PATH FOR VIEW ENGINE
hbs.registerPartials(partialPaths);

//Setup static directory to serve
app.use(express.static(publicFold));

// HOME "SERVE DYNAMIC PAGES
app.get("/", (req, res) => {
  res.render("index", {
    title: "TODO PAGE",
    userName: "Kajal",
  });
});

//ABOUT: SERVES DYNAMIC PAGE
app.get("/about", (req, res) => {
  res.render("about", {
    role: "Software Developer",
    userName: "Kajal",
    title: "ABOUT PAGE",
  });
});

//HELP: SERVE HELP PAGE
app.get("/help", (req, res) => {
  res.render("help", {
    title: "HELP PAGE",
    userName: "Kajal",
  });
});

//get TODO : SERVES JSON
app.get("/todo", (req, res) => {
  if (!req.query.id) {
    res.send({
      error: "You must provide a search term",
    });
  } else {
    console.log("request body", req.query);
    getTODO(req.query.id, (error, data) => {
      if (error) {
        res.send({
          message: "ERROR WHILE GETTING TODO",
          error,
        });
      } else {
        //CALLBACK CHAINING
        getUserDetails(data.userId, (error, response) => {
          if (error) {
            res.send({
              message: "ERROR WHILE GETTING USER DETAILS",
              error,
            });
          } else {
            const finalData = {
              todoList: data,
              userDetails: response,
            };
            res.send(finalData);
          }
        });
      }
    });
  }
});

//NOT FOUND: served when non-matching url requested
app.get("*", (req, res) => {
  res.send("<h1>NOT FOUND</h1>");
});

//Start the server using development port
app.listen(3003, () => {
  console.log("SERVER HAS STARTED");
});

/* -------------------------------------------------------------------------- */
/*                              SERVES STATIC DAT                             */
/* -------------------------------------------------------------------------- */
//MATCHES WITH app.use(publicFold);OOT ROUTE
/**
 ** Get responds to route called by web server or browser
 * @params 1 route
 * @params 2 callback which serves response or HTML code
 * Callback takes req and response object to send the response back to caller
 */
/* app.get("/", (req, res) => {
  //Send HTML
  res.send("<h1>Welcome</h1>");
});
 */

//HELP ROUTE :  SERVES ARRAY OF OBJECTS
// app.get("/help", (req, res) => {
//   //SEND JSON or array
//   res.send([
//     {
//       name: "Kajal",
//       age: 23,
//     },
//     {
//       name: "Kajal",
//       age: 23,
//     },
//   ]);
//   res.send({
//     name: "Kajal",
//     age: 23,
//   });
// });

//ABOUT :  SERVES STATIC PAGE
// app.get("/about", (req, res) => {
//   res.send("<h1>ABOUT PAGE</h1>");
// });
