import CreateAccount from "./frontend/CreateAccount"
import LoginPage from "./frontend/LoginPage"
import Home from "./frontend/Home"
import ViewAll from "./frontend/ViewAll"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<ViewAll />}/>
        <Route path="/signup" element={<CreateAccount />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
  )
}

export default App;
