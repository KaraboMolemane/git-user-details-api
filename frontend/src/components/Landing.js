import { useState, useEffect } from "react";
import "react-data-grid/lib/styles.css";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";


function Landing() {
  //declare state(s)
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");

  const columns = [
    { field: "id", headerName: "ID", width: 150, flex: 1 },
    {
      field: "login",
      headerName: "User name",
      width: 350,
      flex: 2,
    },
    {
      field: "url",
      headerName: "URL",
      width: 350,
      flex: 2,
    },
    {
      field: "details",
      headerName: "User details",
      width: 150,
      flex: 1,
      cellClassName: "user-details--cell",
    },
  ];

  let rows = [];
  items.forEach((element) => {
    rows.push({
      id: element.id,
      login: element.login,
      url: element.url,
      details: "See more",
    });
  });

  const handleCellClick = (params) => {
    // Only reroute if the user clicks on the the details column cell
    if (params.field === "details")
      window.location.href = "/user-details?login=" + params.row.login;
  };

  useEffect(() => {
    if (searchText !== "") {
      //Do the API call
      fetch("/search-users/" + searchText)
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result.items);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }, [searchText]);

  let results = "";
  if (error) {
    results = <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    results = (
      <div>
        {searchText === "" ? "Enter text above to search." : "Loading..."}
      </div>
    );
  } else {
    console.log("items:", items);
  }

  return (
    <div className="container my-5">
      <div className="p-5 text-center bg-body-tertiary rounded-3">
        <br />
        <h1 className="text-body-emphasis">Search GitHub User App</h1>
        <p className="col-lg-8 mx-auto fs-5 text-muted">
          This app allows you to search for GitHub users and see the following:
        </p>
        <ul className="list-unstyled">
          <li>
            User details - including some of their repos, their profile picture,
            bio, etc.
          </li>
          <li>
            Repo details - including last commit date, creation date,
            description, etc.
          </li>
        </ul>
        <div className="bd-example">
          <form>
            <div className="w-50 p-3" style={{ marginLeft: "30%" }}>
              <input
                type="text"
                className="form-control d-inline-flex align-items-center"
                id="userInputWord"
                aria-describedby="emailHelp"
                placeholder="Type in text to search for users"
              />
            </div>
          </form>
          <br />
          <div>{results}</div> <br />
          <div className="d-inline-flex gap-2 mb-5">
            <button
              type="button"
              className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill"
              data-bs-toggle="modal"
              data-bs-target="#exampleModalFullscreen"
              onClick={() =>
                setSearchText(document.getElementById("userInputWord").value)
              }
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Modal for API results  */}
      <div
        className="modal fade"
        id="exampleModalFullscreen"
        tabindex="-1"
        aria-labelledby="exampleModalFullscreenLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-4" id="exampleModalFullscreenLabel">
                Search results for "{searchText}"
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Box
                sx={{
                  height: 400,
                  width: "100%",
                  "& .user-details--cell": {
                    // make column look like a link
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  },
                }}
              >
                <DataGrid
                  onCellClick={handleCellClick}
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  checkboxSelection
                  disableRowSelectionOnClick
                />
              </Box>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;

/*
USEFUL Links 
https://mui.com/x/react-data-grid/style/
https://www.sitepoint.com/get-url-parameters-with-javascript/
https://stackoverflow.com/questions/45898789/react-router-pass-param-to-component
*/
