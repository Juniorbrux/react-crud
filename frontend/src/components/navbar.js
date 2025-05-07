import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function  navbar() {
  return(
    <>
    <div className="container-fluid">
    <div className="row">
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="home">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/registration">
                  Registration
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="card">
                  Veiw
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
     <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Dashboard</h1>
          </div>

          
        </main>
        </div>
        </div>
    </>
  )
  }

export default navbar;
