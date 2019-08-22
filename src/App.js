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

class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: false,
        };
    }
    
    static getDerivedStateFromProps(props, state) {
        let { isLoading } = state;

        if(props.isLoading !== isLoading) {
            isLoading = props.isLoading;
        }

        return {
            isLoading,
        }
    }

    render() {    
        const { isLoading } = this.state;

        return (
            <Router>
                <ScrollToTop>
                    <Switch>
                        <Route exact path="/" component={MainLayout}/>
                        <Route path="/main" component={MainLayout} />
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
        isLoading: state.loading.isLoading
    })
)(App);
