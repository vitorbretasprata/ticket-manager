import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import decode from 'jwt-decode';

const AuthContext = React.createContext();

class AuthProvider extends Component{
    state = { 
        isSession: false,
        isAuth: false,
        toggle: () => {
            this.setState({ isAuth: !this.state.isAuth });
        }
    }

    constructor(){
        super();        
        this.logout = this.logout.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    isAuthenticated(){        
        const token = localStorage.getItem('token_id');
        const refreshToken = localStorage.getItem('token_id');

        if(!token) {            
            return false;
        }
      
        try{

          const decodedToken = decode(refreshToken, { complete: true });      
          console.log(decodedToken);
        } catch (e) {
            return false;
        }
      
        return true;
    }
    
    logout(){        
        if(this.state.isSession == true){
            sessionStorage.removeItem("token_id");

            this.setState({
                isAuth: false
            });

            this.refresh();

        } else {
            localStorage.removeItem("token_id");

            this.setState({
                isAuth: false
            });

            this.refresh();
        }
    }

    refresh(){
        if(this.state.isSession == true){
            if(sessionStorage.getItem("token_id")){
                this.setState({
                    isAuth: true
                });
                <Redirect to="/home" />
            }
        } else if(this.state.isSession == false){
            if(localStorage.getItem("token_id")){
                this.setState({
                    isAuth: true
                });
                <Redirect to="/home" />
            }
        }

        if(this.state.isSession == true){
            if(!sessionStorage.getItem("token_id")){
                <Redirect to="/" />
            }
        } else if(this.state.isSession == false){
            if(!localStorage.getItem("token_id")){
                <Redirect to="/" />
            }
        }
    }

    render(){
        return(
            <AuthContext.Provider
                value={{
                    state: this.state,
                    login: this.login,
                    logout: this.logout,
                    refresh: this.refresh,
                    isAuthenticated: this.isAuthenticated                   
                }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

const AuthConsumer = AuthContext.Consumer

export { AuthConsumer, AuthProvider }