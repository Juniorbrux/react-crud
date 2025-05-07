// import React from 'react';
// // import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// // import Home from './pages/Home';
// // import About from './pages/About';
// // import Blogs from './pages/Blogs';
// // import Contact from './pages/Contact';
// // import Login from './pages/Login';
// // import Header from './components/header';
// // import Footer from './components/footer';
// // import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   return (
//     <>
// {/*     
//     <Router>
     
//       <div>
//        <Header/>

//         <Routes>
//           <Route path="/" element={<Home/>} />
//           <Route path="/about" element={<About/>} />
//           <Route path="/Contant" element={<Contact/>} />
//           <Route path="/Blogs" element={<Blogs/>} />
//           <Route path="/Login" element={<Login/>} />

//         </Routes>
//       </div>
//     </Router>
//     <Footer/> */}
//   </>
//   );
// }

// export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from'./components/card'
import Navbar from './components/navbar';
import Registration from'./pages/registration'
import Login from './pages/Login';
import Home from'./components/home'
import Update from'./pages/Update';




function App() {
  return (
    <>

    <Router>
         
           <Routes>
           <Route path="/" element={<Login/>} />
           <Route path="/registration" element={<Registration/>} />
           <Route path="/card" element={<Card/>} /> 
           <Route path='/home' element={<Home/>} />
           <Route path="/update/:id" element={<Update/>} />
           </Routes>
    </Router>
        
    </>
  );
} 
export default App;
