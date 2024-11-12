import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Input from './Pages/Input'
import Result from './Pages/Result'

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route element={<Input/>} path={'/'}/>
          <Route element={<Result/>} path={'/answer'}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
