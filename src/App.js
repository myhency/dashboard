import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-table/react-table.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'assets/css/style.1.scss';
import ScrollToTop from 'utils/ScrollToTop';
import MainLayout from 'layouts/main/MainLayout';
import NotFound from 'views/common/NotFound';
import PrivateRoute from 'components/PrivateRoute';
import AuthLayout from './layouts/auth/AuthLayout';

class App extends Component {
    constructor(props) {
        super(props);

        // Login Check
        let isAuthenticated = false;
        let userId = sessionStorage.getItem('account') === undefined ? '' : sessionStorage.getItem('account');

        if (userId) {
            isAuthenticated = true;
        }

        this.state = {
            isLoading: false,
            isAuthenticated,
            userId
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let { isLoading, userId, isAuthenticated } = prevState;

        if (nextProps.isLoading !== isLoading) {
            isLoading = nextProps.isLoading;
        }

        if (nextProps.auth.userId !== userId) {
            userId = nextProps.auth.userId;
            if (userId !== undefined) {
                isAuthenticated = true;
            }
        } else {
            isAuthenticated = true;
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
                        <Route exact path="/" render={() =>
                            isAuthenticated ? <Redirect to="/main" /> : <Redirect to="/auth" />
                        } />

                        <PrivateRoute path="/main" component={MainLayout} isAuthenticated={isAuthenticated} />

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
        auth: state.auth
    })
)(App);
