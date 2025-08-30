import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import UpdateBook from "./pages/UpdateBook"
import SaveBook from "./pages/SaveBook"
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/update-book/:id" element={<UpdateBook />} />
        <Route path="/save-book" element={<SaveBook />} />
      </Routes>
    </div>
  )
}

export default App
