import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HooksTask1 from './Components/Hooks/HooksTask1'
import HooksTask2 from './Components/Hooks/HooksTask2'
import HooksTask3 from './Components/Hooks/HooksTask3'
import HooksTask4 from './Components/Hooks/HooksTask4'
import Routing from './Components/Routing/Routing'
import { ThemeProvider } from './Components/Context-Api/ThemeContextTask1'
import {Theme1} from './Components/Context-Api/Theme1'
import SMTask1 from './Components/State Management/SMTask1'
import SMTask2 from './Components/State Management/SmTask2'
import SMTask3 from './Components/State Management/SMTask3'
import Task1a from './Components/React jsonFirebase/Task1A'
import ApiCrud from './Components/React jsonFirebase/ApiCrud'
import Task2 from './Components/React jsonFirebase/Task2'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <HooksTask1/> */}
     {/* <HooksTask2/> */}
     {/* <HooksTask3/> */}
     {/* <HooksTask4/> */}

     {/* <Routing/> */}

     {/* <ThemeProvider>
      <Theme1/>
     </ThemeProvider> */}

     {/* <AuthProvider>
      <AuthComponent/>
     </AuthProvider> */}

     {/* <SMTask1/> */}
     {/* <SMTask2/> */}
     {/* <SMTask3/> */}

     {/* <Task1a/>
     <ApiCrud/> */}
     <Task2/>
    </>
  )
}

export default App
