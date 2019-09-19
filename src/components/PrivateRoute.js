import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: props.isAuthenticated
        }
    }

    static getDerivedStateFromProps(props, state) {

        let { isAuthenticated } = state;

        if (isAuthenticated !== props.isAuthenticated) {
            isAuthenticated = props.isAuthenticated;
        }

        return {
            isAuthenticated
        }
    }

    render() {
        const { component: Component, ...rest } = this.props;
        const { isAuthenticated } = this.state;
        return (
            <Route {...rest} render={props => (
                isAuthenticated ?
                    <Component {...props} {...rest} />
                    : <Redirect to={{ pathname: '/auth/SignIn', state: { from: props.location } }} />
            )} />
        )
    }
}

export default PrivateRoute;

// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';

// import { authenticationService } from '../_services/authentication.service';

// export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
//     <Route {...rest} render={props => {
//         const currentUser = authenticationService.currentUserValue;
//         if (!currentUser) {
//             // not logged in so redirect to login page with the return url
//             return <Redirect to={{ pathname: '/auth/SignIn', state: { from: props.location } }} />
//         }

//         // check if route is restricted by role
//         if (roles && roles.indexOf(currentUser.role) === -1) {
//             // role not authorised so redirect to home page
//             return <Redirect to={{ pathname: '/main' }} />
//         }

//         // authorised so return component
//         return <Component {...props} />
//     }} />
// )
