import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-table/react-table.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
// import 'assets/css/style.scss';
import 'assets/css/style.1.scss';
import ScrollToTop from 'utils/ScrollToTop';
import AuthLayout from 'layouts/auth/AuthLayout';
import MainLayout from 'layouts/main/MainLayout';
import NotFound from 'views/common/NotFound';
import PrivateRoute from 'components/PrivateRoute';
import { signIn } from 'store/modules/auth';

class App extends Component {
    constructor(props) {
        super(props);
        
        // Login Check
        let isAuthenticated = true;
        const userId = sessionStorage.getItem('userId');
        if(userId) {
            isAuthenticated = true;
            props.dispatch(signIn(userId));
        }

        this.state = {
            isLoading: false,
            isAuthenticated
        };
    }
    
    static getDerivedStateFromProps(props, state) {
        let { isLoading, isAuthenticated } = state;
        
        if(props.userId !== undefined) {
            isAuthenticated = true;
        }

        if(props.isLoading !== isLoading) {
            isLoading = props.isLoading;
        }

        return {
            isLoading,
            isAuthenticated
        }
    }

    render() {    
        const { isLoading, isAuthenticated } = this.state;
        
        return (
            <Router>
                <ScrollToTop>
                    <Switch>
                        <Route exact path="/" render={() =>
                            isAuthenticated ?
                            <Redirect to="/main"/>
                            : <Redirect to="/auth"/>
                        } />
                        <PrivateRoute path="/main" component={MainLayout} isAuthenticated={isAuthenticated} />
                        {/* <Route path="/main" component={MainLayout} /> */}
                        <Route path="/auth" component={AuthLayout} />
                        <Route component={NotFound} />
                    </Switch>
                    
                    <div id={'loadingOverlay'} className={isLoading ? 'active' : ''} />
                </ScrollToTop>
            </Router>
        );
    }
}

export default connect(
    state => ({
        isLoading: state.loading.isLoading,
        userId: state.auth.userId
    })
)(App);
