const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const helmet = require("helmet");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const API_BASE_URL = "https://api.github.com/";

// Use Helmet!
app.use(helmet());

app.get("/", (req, res) => {
  res.send(
    "Hello world! Our app is now wearing a Helmet for security reasons."
  );
});

app.get("/search-users/:query", function (req, res) {
  const queryParam = req.params.query;
  const query = "siddhant";
  const target = "name";
  const type = "user";
  const aprUrl = API_BASE_URL.concat(
    "search/users?q=",
    queryParam,
    " in:",
    target,
    " type:",
    type
  );


  fetch(aprUrl)
    .then((res) => res.json())
    .then(
      (result) => {
        res.send(result);
      },
      (error) => {
        res.send(error);
      }
    );
});

app.get("/get-user-details/:login", function (req, res) {
  const login = req.params.login;
  const aprUrl = API_BASE_URL.concat("users/", login);
  fetch(aprUrl)
    .then((res) => res.json())
    .then(
      (result) => {;
        res.send(result);
      },
      (error) => {
        console.log(error);
        res.send(error);
      }
    );
});

app.get("/get-user-repos/:login", function (req, res) {
  const login = req.params.login;
  const aprUrl = API_BASE_URL.concat("users/", login, "/repos");
  fetch(aprUrl)
    .then((res) => res.json())
    .then(
      (result) => {
        res.send(result);
      },
      (error) => {
         console.log(error);
        res.send(error);
      }
    );
});

app.get("/get-repo-details/:login/:repo", function (req, res) {
  const login = req.params.login;
  const repo = req.params.repo;
  const aprUrl = API_BASE_URL.concat("repos/", login, "/", repo);
  fetch(aprUrl)
    .then((res) => res.json())
    .then(
      (result) => {
        res.send(result);
      },
      (error) => {
         console.log(error);
        res.send(error);
      }
    );
});

app.get("/get-repo-commits/:login/:repo", function (req, res) {
  const login = req.params.login;
  const repo = req.params.repo;
  const aprUrl = API_BASE_URL.concat("repos/", login, "/", repo, "/commits");
  fetch(aprUrl)
    .then((res) => res.json())
    .then(
      (result) => {;
        res.send(result);
      },
      (error) => {
         console.log(error);
        res.send(error);
      }
    );
});

app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});

app.get("*", function (req, res, next) {
  let err = new Error("Sorry! Can't find that resource. Please check your URL");
  err.statusCode = 404;
  next(err);
});

/*
USEFUL LINKS
https://docs.github.com/en/rest/quickstart
https://stateful.com/blog/github-search-api
https://youtu.be/7YeOjmpQUnU?si=QOLx_ONFJB40UbRI
https://youtu.be/EvZ6pjgYA38?si=GFX9OmhZHRAAcvP_

*/
