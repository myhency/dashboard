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
import AdminLayout from 'layouts/admin/AdminLayout';
import NotFound from 'views/common/NotFound';
import PrivateRoute from 'components/PrivateRoute';
import AuthLayout from './layouts/auth/AuthLayout';
import { signIn } from 'store/modules/auth';

class App extends Component {
    constructor(props) {
        super(props);

        // Login Check
        let isAuthenticated = false;
        let isAuthenticatedAdmin = false;
        let userId = sessionStorage.getItem('id') === undefined ? '' : sessionStorage.getItem('id');
        let role = sessionStorage.getItem('role') === undefined ? '' : sessionStorage.getItem('role');

        console.log('userid:' + userId);
        console.log('role:' + role);

        if (userId) {
            switch (role) {
                case 'normal':
                    isAuthenticated = true;
                    props.dispatch(signIn(userId, role));
                    break;
                // case 'APPROVER':
                //     isAuthenticatedApprover = true;
                //     props.dispatch(signIn(userId, role, name, lastSigninDate));
                //     break;
                case 'admin':
                    isAuthenticatedAdmin = true;
                    props.dispatch(signIn(userId, role));
                    break;
                default:
                    break;
            }
        }

        this.state = {
            isLoading: false,
            isAuthenticated,
            isAuthenticatedAdmin,
            userId,
            role
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let { isLoading, userId, role, isAuthenticated, isAuthenticatedAdmin } = prevState;

        if (nextProps.userId !== undefined) {
            role = nextProps.role;
            switch (role) {
                case 'normal':
                    isAuthenticated = true;
                    break;
                case 'admin':
                    isAuthenticatedAdmin = true;
                    break;
                default:
                    break;
            }
        }

        if (nextProps.isLoading !== isLoading) {
            isLoading = nextProps.isLoading;
        }

        // if (nextProps.auth.userId !== userId) {
        //     userId = nextProps.auth.userId;
        //     if (userId !== undefined) {
        //         isAuthenticated = true;
        //     }
        // } else {
        //     isAuthenticated = true;
        // }

        return {
            isLoading,
            userId,
            isAuthenticated,
            isAuthenticatedAdmin,
            role
        }
    }

    render() {
        const { isLoading, isAuthenticated, isAuthenticatedAdmin } = this.state;

        console.log(this.state);

        let renderstring = isAuthenticated ? ('<Redirect to="/main" />') :
            isAuthenticatedAdmin ? <Redirect to="/main/admin" /> :
                <Redirect to="/auth" />

        return (
            <Router>
                <ScrollToTop>
                    <Switch>
                        <Route exact path="/" render={() =>
                            isAuthenticated ? <Redirect to="/main" /> :
                                isAuthenticatedAdmin ? <Redirect to="/main/admin" /> :
                                    <Redirect to="/auth" />

                        } />

                        <PrivateRoute path="/main" component={MainLayout} isAuthenticated={isAuthenticated} />
                        <PrivateRoute path="/admin" component={AdminLayout} isAuthenticated={isAuthenticatedAdmin} />
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
        userId: state.auth.userId,
        role: state.auth.role
    })
)(App);
