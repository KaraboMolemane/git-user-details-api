const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require("helmet");
// import { Octokit } from "octokit";
const { Octokit, App } = require("octokit");


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const API_BASE_URL = 'https://api.github.com/'

// Use Helmet!
app.use(helmet());

// const octokit = new Octokit({
//     auth: GIT_USER_API_TOKEN
//   });

// await octokit.request("GET /octocat", {});

// try {
//     const result = await octokit.request("GET /repos/{owner}/{repo}/issues", {
//       owner: "KaraboMolemane",
//       repo: "git-user-details-api",
//       per_page: 2,
//     });
  
//     console.log(`Success! Status: ${result.status}. Rate limit remaining: ${result.headers["x-ratelimit-remaining"]}`)
  
//   } catch (error) {
//     console.log(`Error! Status: ${error.status}. Rate limit remaining: ${error.headers["x-ratelimit-remaining"]}. Message: ${error.response.data.message}`)
//   }

app.get("/", (req, res) => {
    res.send("Hello world! Our app is now wearing a Helmet for security reasons.");
});

app.get('/search-users/:query', function (req, res) {
  const queryParam = req.params.query;
  const query = 'siddhant';
  const target = 'name';
  const type = 'user';
  const aprUrl = API_BASE_URL.concat('search/users?q=', queryParam, ' in:', target, ' type:', type );
  console.log('aprUrl:', aprUrl);

  fetch(aprUrl)
  .then(res => res.json())
  .then(
    (result) => {
    // console.log(typeof(result));
    console.log(result);
    res.send(result);
    },
    (error) => {            
      // console.log(error);
      res.send(error);
    }
  )  
})

app.get('/get-user', function (req, res) {
  console.log('Ons is hier');
  console.log(res);
  fetch('https://api.github.com/users/fuzzysid')
    .then(res => res.json())
    .then(
      (result) => {
      console.log(result)
      },
      (error) => {            
        console.log(error)
      }
    )
})



app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('*', function(req, res, next) {
  let err = new Error("Sorry! Can't find that resource. Please check your URL");
  err.statusCode = 404;
  next(err);
});

/*
USEFUL LINKS
https://stateful.com/blog/github-search-api
https://youtu.be/7YeOjmpQUnU?si=QOLx_ONFJB40UbRI
https://youtu.be/EvZ6pjgYA38?si=GFX9OmhZHRAAcvP_

*/