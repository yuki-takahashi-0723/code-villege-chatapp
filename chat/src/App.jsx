import React from 'react'
import{
   HashRouter,
   Switch,
   Route
} from 'react-router-dom'
import { AuthProvider } from './AuthService'
import LoggedInRoute from './LoggedInRoute'
import { Room, SignIn, SignUp, Top } from './pages'
import './Style.css'



const App = () =>{
    return(
            <AuthProvider>
                <HashRouter>
                    <Switch>
                        <Route exact path='(/)?' component={Top}/>
                        <Route exact path='/signup' component={SignUp}/>
                        <Route exact path='/signin' component={SignIn}/>
                        <LoggedInRoute exact path='/room' component={Room}/>
                    </Switch>
                </HashRouter>
            </AuthProvider>
  
    )
}

export default App