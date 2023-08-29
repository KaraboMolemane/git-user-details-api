const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
// import { Octokit } from "octokit";
const { Octokit, App } = require("octokit");


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Use Helmet!
app.use(helmet());

const octokit = new Octokit({
    auth: GIT_USER_API_TOKEN
  });

// await octokit.request("GET /octocat", {});

try {
    const result = await octokit.request("GET /repos/{owner}/{repo}/issues", {
      owner: "KaraboMolemane",
      repo: "git-user-details-api",
      per_page: 2,
    });
  
    console.log(`Success! Status: ${result.status}. Rate limit remaining: ${result.headers["x-ratelimit-remaining"]}`)
  
  } catch (error) {
    console.log(`Error! Status: ${error.status}. Rate limit remaining: ${error.headers["x-ratelimit-remaining"]}. Message: ${error.response.data.message}`)
  }

app.get("/", (req, res) => {
    res.send("Hello world! Our app is now wearing a Helmet for security reasons.");
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})