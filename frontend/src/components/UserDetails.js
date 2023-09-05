import { useState, useEffect, useRef } from "react";
import "react-data-grid/lib/styles.css";
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
  const [activeRepo, setActiveRepo] = useState([]);
  const [activeCommits, setActiveCommits] = useState([]);
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
  if (repos.length !== 0) {
    repos.forEach((element) => {
      rows.push({
        id: element.id,
        name: element.name,
        url: element.html_url,
        details: "See more",
      });
    });
  }

  const modalColumns = [
    { field: "id", headerName: "ID", width: 150, flex: 1 },
    {
      field: "message",
      headerName: "Commit message",
      width: 350,
      flex: 2,
    },
    {
      field: "date",
      headerName: "Date",
      width: 350,
      flex: 2,
    },
    {
      field: "url",
      headerName: "URL",
      width: 150,
      flex: 1,
      cellClassName: "details--cell",
    },
  ];

  let modalRows = [];
  // Set data for grid
  if (activeCommits.length !== 0) {
    activeCommits.forEach((element) => {
      modalRows.push({
        id: element.sha,
        message: element.commit.message,
        date: element.commit.author.date,
        url: element.html_url,
      });
    });
  }

  const handleCellClick = (params) => {
    if (params.field === "details") {
      //Do the API call - repo details
      fetch("/get-repo-details/" + userLogin.current + "/" + params.row.name)
        .then((res) => res.json())
        //.then(res => console.log('res:', res))
        .then(
          (result) => {
            setIsLoaded(true);
            console.log("repo details:", result);
            setActiveRepo(result);
            // show modal for repo details
            handleShow();
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );

      //Do the API call - repo commits
      fetch("/get-repo-commits/" + userLogin.current + "/" + params.row.name)
        .then((res) => res.json())
        //.then(res => console.log('res:', res))
        .then(
          (result) => {
            setIsLoaded(true);
            console.log("Repo commits:", result);
            setActiveCommits(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  };

  const handleCommitCellClick = (params) => {
    //Open commit on GitHub
    if (params.field === "url") window.open(params.row.url, '_blank');
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
          console.log("user repos:", result);
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
              <br />
              <p className="card-text">
                <small className="text-muted">
                  {items.name} joined GitHub on {items.created_at}
                </small>
              </p>
              <a href="/" className="btn btn-primary">
                Back to Homepage
              </a>
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
              </div>
            </div>
          </div>
        </div>
        {/* 
        React Modal for repo details  
        https://www.pluralsight.com/guides/how-to-trigger-modal-for-react-bootstrap
        */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Repo details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="bd-example">
              <table className="table table-hover">
                <tbody>
                  <tr className="table-light">
                    <th scope="row">Name:</th>
                    <td>{activeRepo && activeRepo.name}</td>
                  </tr>
                  <tr className="table-light">
                    <th scope="row">Description:</th>
                    <td>{activeRepo && activeRepo.description}</td>
                  </tr>
                  <tr className="table-light">
                    <th scope="row">Url:</th>
                    <td>
                      <a
                        href={activeRepo && activeRepo.html_url}
                        target="_blank"
                      >
                        {activeRepo && activeRepo.html_url}
                      </a>{" "}
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </td>
                  </tr>
                  <tr className="table-light">
                    <th scope="row">Owner:</th>
                    <td>
                      {activeRepo && activeRepo.owner && activeRepo.owner.login}{" "}
                    </td>
                  </tr>
                  <tr className="table-light">
                    <th scope="row">Creation Date:</th>
                    <td>{activeRepo && activeRepo.created_at}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              {/* repo commits */}
              <h6>Commits</h6>
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
                  onCellClick={handleCommitCellClick}
                  rows={modalRows}
                  columns={modalColumns}
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default UserDetails;
