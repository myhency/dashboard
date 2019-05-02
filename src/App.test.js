import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-table/react-table.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'assets/css/style.scss';
import ScrollToTop from 'utils/ScrollToTop';
import AuthLayout from 'layouts/auth/AuthLayout';
import MainLayout from 'layouts/main/MainLayout';
import NotFound from 'views/common/NotFound';
import PrivateRoute from 'components/PrivateRoute';
import { signIn } from 'store/modules/auth';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

export default connect(
  state => ({
      isLoading: state.loading.isLoading,
      userId: state.auth.userId
  })
)(App);