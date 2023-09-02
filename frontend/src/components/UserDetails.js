import { useState, useEffect } from 'react';
import 'react-data-grid/lib/styles.css';
//import DataGrid from 'react-data-grid';
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import Header from "./Header";

function UserDetails() {
  //declare state(s)
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState('');

  const queryString = window.location.search;
  console.log('queryString', queryString);
  const searchParams = new URLSearchParams(queryString);

  // Iterating the search parameters
  for (const p of searchParams) {
    console.log(p);
  }

  useEffect(() => {
      //Do the API call
      // fetch('/search-users-details/' + searchText)
      fetch('/get-user-details/fuzzysid')
         .then(res => res.json())
        //.then(res => console.log('res:', res))
        .then(
          (result) => {
            setIsLoaded(true);
            console.log('user details:', result)
            setItems(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
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
                alt='User_profile_pic'
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Name: {items.name} </h5>
                <p>
                  <strong>Username:</strong> {items.login}
                </p>
                <p className="card-text">
                  <strong>Bio:</strong> {items.bio}
                </p>
                <p>
                  <strong>GitHub Url:</strong> <a href={items.html_url} target='_blank'>{items.html_url}</a> <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </p>
                <p>
                  <strong>Comapany</strong> {items.company} 
                </p>
                <p>
                  <strong>Location:</strong> {items.location}
                </p>
                <p>Blog: <a href={items.blog} target='_blank'>{items.blog}</a> <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></p>
                <p>email: {items.email}</p>
                <p>followers: {items.followers}</p>
                <p>following: {items.following}</p>
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
