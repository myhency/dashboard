// 로그인 없으므로 전부 주석

// import React, { Component, Fragment } from 'react';
// import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
// import authRoutes from 'routes/auth';
// import ContentRow from 'components/ContentRow';
// import ContentCol from 'components/ContentCol';
// // import SignIn from 'views/auth/SignIn';

// class AuthLayout extends Component {
//     render() {
//         return (
//             <Fragment>
//                 {/* Header */}
//                 {/* <Navbar className={'authHeader'} color={'light'} light expand="md">
//                     <NavbarBrand>
//                         <Target size={25} color={'#30C0AA'}/>
//                     </NavbarBrand>
//                     <NavbarBrand>
//                         Sample Project
//                     </NavbarBrand>
//                     <Nav className="ml-auto">
//                         {authRoutes.map((route, key) => {
//                             return (
//                                 <NavItem key={key}>
//                                     <NavLink to={route.path} tag={RRNavLink} style={{color:'black'}}>{route.name}</NavLink>
//                                 </NavItem>
//                             )
//                         })}
//                     </Nav>
//                 </Navbar> */}
//                 <ContentRow className='authContent bg'>
//                     <ContentCol xl={4} lg={5} md={6} sm={10} xs={11}>
//                         <Switch>
//                             {authRoutes.map((route, key) => {
//                                 return (
//                                     <Route path={route.path} component={route.component} key={key}/>
//                                 )
//                             })}
//                             <Redirect to="/auth/signIn" />
//                         </Switch>
//                     </ContentCol>
//                 </ContentRow>
//             </Fragment>
//         );
//     }
// }

// export default withRouter(AuthLayout);