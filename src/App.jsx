import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import UpdateBook from "./pages/UpdateBook"
import SaveBook from "./pages/SaveBook"
import { Toaster } from "react-hot-toast"
import SaveUser from "./pages/SaveUser"

function App() {

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/update-book/:bookId" element={<UpdateBook />} />
        <Route path="/save-book" element={<SaveBook />} />
        <Route path="/save-user" element={<SaveUser />} />
      </Routes>
    </div>
  )
}

export default App
