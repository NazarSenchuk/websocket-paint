import "./styles/app.scss"
import Toolbar from "./components/Toolbar.js"
import SettingBar from "./components/SettingBar.js"
import Canvas from "./components/Canvas.js"
import "./styles/toolbar.scss"
import "./styles/canvas.scss"
import {BrowserRouter ,Switch , Route ,Redirect} from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route path ='/:id'>
      
          <Toolbar/>
          <SettingBar/>
          <Canvas/>
        </Route>
        <Redirect to ={`f${(+new Date).toString(16)}`}/>
      </Switch>
       </div>
    </BrowserRouter>
    
  );
}

export default App;
