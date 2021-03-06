import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import LoginApp from './loginApp';
import RegisterApp from './registerApp';
import HomeApp from './homeApp';
import Failed from '../components/failed';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './protectedRoute';
import DashboardApp from './dashboardApp';
import ViewApp from './viewApp';
import EditApp from './editApp';
import CreateApp from './createApp';
import ResetApp from './resetApp';
import history from '../components/utils/history';
import TicketsApp from './ticketsApp';

class Routes extends Component {    
    render(){        
        return (    
            <Router history={history}>   
                <AuthProvider>                   
                    <Switch>
                        <Route path='/login' component={LoginApp} />      
                        <Route path='/register' component={RegisterApp} />
                        <Route path='/resetPassword' component={ResetApp} />
                        <Route path='/register' component={RegisterApp} />
                        <Route path='/' component={HomeApp} exact />
                        <Route path='/home' component={HomeApp} />
                        <ProtectedRoute path='/dashboard' component={DashboardApp} />
                        <ProtectedRoute path='/tickets' component={TicketsApp} />    
                        <ProtectedRoute path='/view' component={ViewApp} />
                        <ProtectedRoute path='/edit' component={EditApp} />
                        <ProtectedRoute path='/create' component={CreateApp} />                                                                      
                    </Switch>
                </AuthProvider>                                                 
            </Router>        
        ) 
    } 
}

export default Routes;