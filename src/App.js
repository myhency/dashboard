import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-table/react-table.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'assets/css/style.1.scss';
import ScrollToTop from 'utils/ScrollToTop';
import MainLayout from 'layouts/main/MainLayout';
import NotFound from 'views/common/NotFound';
import PrivateRoute from 'components/PrivateRoute';
import { signIn } from 'store/modules/auth';
import AuthLayout from './layouts/auth/AuthLayout';

class App extends Component {
    constructor(props) {
        super(props);
        
        // Login Check
        let isAuthenticated = false;
        const userId = sessionStorage.getItem('userId');
        if(userId) {
            isAuthenticated = true;
            props.dispatch(signIn(userId));
        }

        this.state = {
            isLoading: false,
            isAuthenticated: isAuthenticated,
        };
    }
    
    static getDerivedStateFromProps(props, state) {
        let { isLoading, userId, isAuthenticated } = state;

        if(props.isLoading !== isLoading) {
            isLoading = props.isLoading;
        }

        if(props.auth.userId !== userId) {
            userId = props.auth.userId;
            if(userId !== undefined) {
                isAuthenticated = true;
            }
        }

        return {
            isLoading,
            userId,
            isAuthenticated
        }
    }

    render() {    
        const { isLoading, isAuthenticated } = this.state;

        return (
            <Router>
                <ScrollToTop>
                    <Switch>
                        <Route path="/auth" component={AuthLayout}/>
                        <PrivateRoute path="/main" component={MainLayout} isAuthenticated={isAuthenticated} />
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
        auth: state.auth
    })
)(App);
