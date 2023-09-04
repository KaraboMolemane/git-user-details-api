import { useState, useEffect, useRef } from "react";
import "react-data-grid/lib/styles.css";
//import DataGrid from 'react-data-grid';
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
import { Modal, Button } from "react-bootstrap";

function UserDetails() {
  //declare state(s)
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [repos, setRepos] = useState([]);
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const queryString = window.location.search;
  console.log("queryString", queryString);
  const searchParams = new URLSearchParams(queryString);
  const userLogin = useRef(searchParams.get("login"));
  console.log("userLogin:", userLogin);

  const columns = [
    { field: "id", headerName: "ID", width: 150, flex: 1 },
    {
      field: "name",
      headerName: "Repo name",
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
      headerName: "Repo details",
      width: 150,
      flex: 1,
      cellClassName: "details--cell",
    },
  ];


  let rows = [];
  repos.forEach(element => {
      rows.push({
      id: element.id, 
      name: element.name, 
      url: element.html_url,
      details: 'See more'
    })
  })

  const handleCellClick = (params) => {
    console.log("Well, you clicked the Cell:", params);
    // Only reroute if the user clicks on the the details column cell
    // if(params.field === 'details') console.log('Route:', params.row.login);
    if (params.field === "details")
      window.location.href = "/user-details?login=" + params.row.login;
  };

  useEffect(() => {
    //Do the API call - user details
    fetch("/get-user-details/" + userLogin.current)
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

    //Do the API call - user repos
    fetch("/get-user-repos/" + userLogin.current)
      .then((res) => res.json())
      //.then(res => console.log('res:', res))
      .then(
        (result) => {
          setIsLoaded(true);
          console.log("user details:", result);
          setRepos(result);
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
                {/* User details */}
                <h5 className="card-title">Name: {items.name} </h5>
                <div className="bd-example-snippet bd-code-snippet">
                  <div className="bd-example">
                    <table className="table table-hover">
                      <tbody>
                        <tr className="table-light">
                          <th scope="row">Username:</th>
                          <td>{items.login}</td>
                        </tr>
                        <tr className="table-light">
                          <th scope="row">Bio:</th>
                          <td>{items.bio}</td>
                        </tr>
                        <tr className="table-light">
                          <th scope="row">GitHub Url:</th>
                          <td>
                            <a href={items.html_url} target="_blank">
                              {items.html_url}
                            </a>{" "}
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                          </td>
                        </tr>
                        <tr className="table-light">
                          <th scope="row">Company:</th>
                          <td>{items.company} </td>
                        </tr>
                        <tr className="table-light">
                          <th scope="row">Location:</th>
                          <td>{items.location}</td>
                        </tr>
                        <tr className="table-light">
                          <th scope="row">Blog</th>
                          <td>
                            <a href={items.blog} target="_blank">
                              {items.blog}
                            </a>{" "}
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                          </td>
                        </tr>
                        <tr className="table-light">
                          <th scope="row">Email:</th>
                          <td>{items.email}</td>
                        </tr>
                        <tr className="table-light">
                          <th scope="row">Followers:</th>
                          <td>{items.followers}</td>
                        </tr>
                        <tr className="table-light">
                          <th scope="row">Following:</th>
                          <td> {items.following}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  {/* user repos */}
                  <h6>Repos</h6>
                  <Box
                    sx={{
                      height: 400,
                      width: "100%",
                      "& .details--cell": {
                        // make column look like a link
                        color: "blue",
                        textDecoration: "underline",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <DataGrid
                      //onRowClick={handleRowClick}
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
        {/* 
        React Modal for repo details  
        https://www.pluralsight.com/guides/how-to-trigger-modal-for-react-bootstrap
        */}
        <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </>
  );
}

export default UserDetails;
