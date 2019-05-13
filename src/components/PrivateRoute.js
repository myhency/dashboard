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

        if(isAuthenticated !== props.isAuthenticated) {
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
                    : <Redirect to={{ pathname: '/auth/signIn', state: { from: props.location } }} />
            )} />
        )
    }
}

export default PrivateRoute;