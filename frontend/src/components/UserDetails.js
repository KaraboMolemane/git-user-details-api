import { useState, useEffect } from "react";
import "react-data-grid/lib/styles.css";
//import DataGrid from 'react-data-grid';
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";

function UserDetails() {
  //declare state(s)
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");

  const queryString = window.location.search;
  console.log("queryString", queryString);
  const searchParams = new URLSearchParams(queryString);

  // Iterating the search parameters
  for (const p of searchParams) {
    console.log(p);
  }

  useEffect(() => {
    //Do the API call
    // fetch('/search-users-details/' + searchText)
    fetch("/get-user-details/fuzzysid")
      .then((res) => res.json())
      //.then(res => console.log('res:', res))
      .then(
        (result) => {
          setIsLoaded(true);
          console.log("user details:", result);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  return (
    <>
      <Header />
      <div className="col">
        <div className="card">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                width="100%"
                height="250"
                src={items.avatar_url}
                alt="User_profile_pic"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Name: {items.name} </h5>
                <div class="bd-example-snippet bd-code-snippet">
                  <div class="bd-example">
                    <table class="table table-hover">
                      <tbody>
                        <tr class="table-secondary">
                          <th scope="row">Username</th>
                          <td>{items.login}</td>
                        </tr>
                        <tr class="table-secondary">
                          <th scope="row">Bio</th>
                          <td>{items.bio}</td>
                        </tr>
                        <tr class="table-secondary">
                          <th scope="row">GitHub Url:</th>
                          <td><a href={items.html_url} target='_blank'>{items.html_url}</a> <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></td>
                        </tr>
                        <tr class="table-secondary">
                          <th scope="row">Company</th>
                          <td>{items.company} </td>
                        </tr>
                        <tr class="table-secondary">
                          <th scope="row">Location</th>
                          <td>{items.location}</td>
                        </tr>
                        <tr class="table-secondary">
                          <th scope="row">Blog</th>
                          <td><a href={items.blog} target='_blank'>{items.blog}</a> <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></td>
                        </tr>
                        <tr class="table-secondary">
                          <th scope="row">Email</th>
                          <td>{items.email}</td>
                        </tr>
                        <tr class="table-secondary">
                          <th scope="row">Followers</th>
                          <td>{items.followers}</td>
                        </tr>
                        <tr class="table-secondary">
                          <th scope="row">Following</th>
                          <td> {items.following}</td>
                        </tr>


                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="card-text">
                  <small className="text-muted">
                    {items.name} joined GitHub on {items.created_at}
                  </small>
                </p>
                <a href="/" className="btn btn-primary">
                  Back to Homepage
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDetails;
