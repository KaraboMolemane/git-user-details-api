import { useState } from 'react';

function UserDetails(){
    return(
        <div className="col">
            <div className="card">
              <div className="row g-0">
                <div className="col-md-4">
                  <svg className="bd-placeholder-img" width="100%" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image</text></svg>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p className="card-text"><small class="text-muted">'Username' joined GitHub on 'CreationDate'</small></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
    );
}

export default UserDetails;