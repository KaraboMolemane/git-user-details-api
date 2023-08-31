import './App.css';
import { useState, useEffect } from 'react';
import 'react-data-grid/lib/styles.css';
//import DataGrid from 'react-data-grid';
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBook } from '@fortawesome/free-solid-svg-icons';


function App() {
  //declare state(s)
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState('');

  // const columns = [
  //   { key: 'id', name: 'ID' },
  //   { key: 'title', name: 'Title' }
  // ];
  
  // const rows = [
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' },
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' }

  // ];

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];


  useEffect(() => {
    if(searchText !== ''){

      //Do the API call
      fetch('/search-users/' + searchText)
      //fetch('https://api.github.com/search/users?q=karabo in:name type:user')
         .then(res => res.json())
        //.then(res => console.log('res:', res))
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }

  }, [searchText])

  let results = '';
  if (error) {
    results =  <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    results = <div>{searchText === ''? 'Enter text above to search.' : 'Loading...'}</div>;
  } else {

    console.log('items:', items);

    /*results = (
      <>
        <h6>Definition: <span style={{fontWeight: 'normal'}}>{def}</span></h6>
        <h6>Usage: <span style={{fontWeight: 'normal'}}>{usage}</span></h6>
      </>

    );*/
  }


  return (
    <div className="container my-5">
    <div className="p-5 text-center bg-body-tertiary rounded-3">
        <br />
        <h1 className="text-body-emphasis">Search GitHub User App</h1>
        <p className="col-lg-8 mx-auto fs-5 text-muted">
          This app allows you to search for GitHub users and see the following:
        </p>
        <ul className='list-unstyled'>
          <li>User details - including some of their repos, their profile picture, bio, etc.</li>
          <li>Repo details - including last commit date, creation date, description, etc.</li>
        </ul>
        <div className="bd-example">
      <form>
        <div className="w-50 p-3" style={{marginLeft: '30%'}} >
          <input type="text" className="form-control d-inline-flex align-items-center" id="userInputWord" aria-describedby="emailHelp" placeholder='Type in text to search for users'/>          
        </div>       
      </form>
      <br />
        <div className="d-inline-flex gap-2 mb-5">
            <button className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" type="button" onClick={() => setSearchText(document.getElementById('userInputWord').value)}>
                Search
            </button>
        </div>
      <h4 className='text-uppercase'>{searchText}</h4>
      <span>{results}</span>
      </div>
      {/*<DataGrid columns={columns} rows={rows} />*/}
      <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
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
);
}

export default App;