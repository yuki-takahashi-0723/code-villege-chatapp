import React from 'react'
import{
   BrowserRouter as Router,
   Switch,
   Route
} from 'react-router-dom'
import { AuthProvider } from './AuthService'
import LoggedInRoute from './LoggedInRoute'
import { Room, SignIn, SignUp } from './pages'
const App = () =>{
    return(
        <AuthProvider>
            <Router>
                <Switch>
                    <Route exact path='/signup' component={SignUp}/>
                    <Route exact path='/signin' component={SignIn}/>
                    <LoggedInRoute exact path='(/)?' component={Room}/>
                </Switch>
            </Router>
        </AuthProvider>
    )
}

export default App