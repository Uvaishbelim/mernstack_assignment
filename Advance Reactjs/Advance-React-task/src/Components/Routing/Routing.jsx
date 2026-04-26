import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router'
import HomeRoutingTask1 from './RoutingTask1'
import AboutRoutingTask1 from './RoutingTask2'


// const Routing = () => {
//   return (
//       <BrowserRouter>
//           <nav>
//               <Link to="/">Home</Link> | <Link to="/about">About</Link>
//           </nav>

//           <Routes>
//               <Route path="/" element={<HomeRoutingTask1 />} />
//               <Route path="/about" element={<AboutRoutingTask1 />} />
//           </Routes>
//       </BrowserRouter>
//   )
// }

// export default Routing


function Routing() {
  return (
      <BrowserRouter>
          <nav>
              <Link to="/">Home</Link> | <Link to="/about">About</Link>
          </nav>

          <Routes>
              <Route path="/" element={<HomeRoutingTask1 />} />
              <Route path="/about" element={<AboutRoutingTask1 />} />
          </Routes>
      </BrowserRouter>
  )
}

export default Routing