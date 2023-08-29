import './App.css';
import { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBook } from '@fortawesome/free-solid-svg-icons';


function App() {
  //declare state(s)
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [userWord, setUserWord] = useState('');


  useEffect(() => {
    if(userWord !== ''){
      const apiKey = 'XXX';
      const apiURL = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/'.concat(userWord,'?key=',apiKey);

      //Do the API call
      fetch(apiURL)
        .then(res => res.json())
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

  }, [userWord])

  let results = '';
  if (error) {
    results =  <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    results = <div>{userWord === ''? 'Enter text above to search.' : 'Loading...'}</div>;
  } else {
    //Get the appropriate information from the data recieved
    //https://www.dictionaryapi.com/products/json#sec-2.uns
    console.log('items:', items);
    const  def = items && items[0].shortdef[0];
    let usage = '';
    try {
      //https://bobbyhadz.com/blog/javascript-check-if-array-index-exists#check-if-an-index-exists-in-a-nested-array-using-trycatch
      if(items[4].def[0].sseq[0][0][1].dt[2][1][0].t !== undefined) usage = items[4].def[0].sseq[0][0][1].dt[2][1][0].t;
    } catch (error) {
      usage = 'No usage avalable'
    }

    results = (
      <>
        <h6>Definition: <span style={{fontWeight: 'normal'}}>{def}</span></h6>
        <h6>Usage: <span style={{fontWeight: 'normal'}}>{usage}</span></h6>
      </>

    );
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
            <button className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" type="button" onClick={() => setUserWord(document.getElementById('userInputWord').value)}>
                Search
            </button>
        </div>
      <h4 className='text-uppercase'>{userWord}</h4>
      <span>{results}</span>
      </div>

    </div>
</div>
);
}

export default App;