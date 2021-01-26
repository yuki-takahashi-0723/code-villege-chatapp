import React from 'react'
import{
   BrowserRouter as Router,
   Switch,
   Route
} from 'react-router-dom'
import { Room, SignIn, SignUp } from './pages'
const App = () =>{
    return(
        <Router>
            <Switch>
                <Route exact path='/signup' component={SignUp}/>
                <Route exact path='/signin' component={SignIn}/>
                <Route exact path='(/)?' component={Room}/>
                
            </Switch>
        </Router>
    )
}

export default App