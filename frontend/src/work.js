// // src/App.js
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import PostForm from './work/post';
// import PostGallery from './work/viewpost';
// import PostPage from './work/get';
// import 'bootstrap/dist/css/bootstrap.min.css';
// function App() {
//   const [newPost, setNewPost] = useState(null);

//   const handlePostAdded = (post) => {
//     setNewPost(post);
//   };

//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route path="/" element={<PostGallery newPost={newPost} />} />
//           <Route path="/post" element={<PostForm onPostAdded={handlePostAdded} />} />
//           <Route path="/post/:id" element={<PostPage />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;
