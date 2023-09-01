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


  // ];

  const columns = [
    { field: 'id', 
      headerName: 'ID', 
      width: 150,
      flex: 1
    },
    {
      field: 'login',
      headerName: 'User name',
      width: 350,
      flex: 2

    },
    {
      field: 'details',
      headerName: 'User details',
      width: 150,
      flex: 1,
      cellClassName: 'user-details--cell',
    },
  ];
  
  // const rows = [
  //   { id: 1, login: 'Snow', details: 'Jon',},
  //   { id: 2, login: 'Lannister', details: 'Cersei'},
  //   { id: 3, login: 'Lannister', details: 'Jaime'},
  //   { id: 4, login: 'Stark', details: 'Arya'},
  //   { id: 5, login: 'Targaryen', details: 'Daenerys'},
  //   { id: 6, login: 'Melisandre', details: null },
  //   { id: 7, login: 'Clifford', details: 'Ferrara' },
  //   { id: 8, login: 'Frances', details: 'Rossini'},
  //   { id: 9, login: 'Roxie', details: 'Harvey'},
  // ];

  let rows = [];
  items.forEach(element => {
      rows.push({
      id: element.id, 
      login: element.login, 
      details: 'See more'
      // details: element.url
    })
  })


//Implement event for cellClick
// const handleRowClick = (params) => {
//   console.log('Well, you clicked Row:', params);
// };

const handleCellClick = (params) => {
  console.log('Well, you clicked the Cell:', params);
};

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
            setItems(result.items);
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
      <Box sx={{ 
        height: 400, 
        width: '100%', 
        '& .user-details--cell': {
          // make column look like a link
          color: 'blue',
          textDecoration: 'underline',
          cursor: 'pointer',
        }
        }}>
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
</div>
);
}

export default App;

/*
USEFUL Links 
https://mui.com/x/react-data-grid/style/
https://mui.com/x/react-data-grid/style/
*/