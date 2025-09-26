import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import UpdateBook from "./pages/UpdateBook"
import SaveBook from "./pages/SaveBook"
import { Toaster } from "react-hot-toast"
import SaveUser from "./pages/SaveUser"
import ViewUsers from "./pages/ViewUsers"
import UpdateUser from "./pages/UpdateUser"
import Navbar from "./components/Navbar"

function App() {
  return (
    <div>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Book Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/add-book" element={<SaveBook />} />
        <Route path="/update-book/:bookId" element={<UpdateBook />} />
        
        {/* User Routes */}
        <Route path="/users" element={<ViewUsers />} />
        <Route path="/add-user" element={<SaveUser />} />
        <Route path="/update-user/:userId" element={<UpdateUser />} />

        {/* 404 Route */}
        <Route path="*" element={
          <div className="container text-center py-5">
            <h1>404: Page Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
          </div>
        } />
      </Routes>
    </div>
  )
}

export default App
