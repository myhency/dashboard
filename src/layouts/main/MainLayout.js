import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Link, NavLink as RRNavLink, withRouter, Redirect, Switch } from "react-router-dom";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavLink,
    UncontrolledCollapse,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu
} from "reactstrap";
import windowSize from 'react-window-size';
import { IoMdContact, IoIosCloud } from 'react-icons/io';
import { FiChevronDown, FiAlignLeft } from 'react-icons/fi';
import mainRoutes from 'routes/main';
import UrlPattern from "url-pattern";
import { signOut } from 'store/modules/auth';
import Fetch from 'utils/Fetch';

class MainLayout extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            active: false,
            toggleButtonStyle: 'black',
            currentPath: '',
            isWindowSmall: false,

            userId: undefined
        };
    }

    static getDerivedStateFromProps(props, state) {
        
        let { currentPath, userId } = state;
        let isWindowSmall = false;

        if(currentPath !== props.location.pathname) {
            currentPath = props.location.pathname;
        }

        if(props.windowWidth <= 768) {
            isWindowSmall = true;
        }

        if(userId !== props.userId) {
            userId = props.userId;
        }

        return {
            currentPath,
            isWindowSmall,
            userId
        }
    }

    getCurrentPageName = (currentPath) => {
        for(var i=0; i<mainRoutes.length; i++) {
            const route = mainRoutes[i];
        
            if(route.path) {
                const routePattern = new UrlPattern(route.path);
                if(routePattern.match(currentPath) !== null) {
                    return route.name;
                }
            }

            if(route.subRoutes) {
                for(var j=0; j<route.subRoutes.length; j++) {
                    const subRoute = route.subRoutes[j];
                    const subRoutePattern = new UrlPattern(subRoute.path);
                    if(subRoutePattern.match(currentPath) !== null) {
                        return subRoute.name;
                    }
                }
            }
        }
        return '';
    }

    toggle = () => {
        const { active, isWindowSmall } = this.state;
        if(isWindowSmall) {
            if(active === true) {
                document.body.style.overflow = 'auto';
                // this.bodyScrolling(true);
            }else {
                document.body.style.overflow = 'hidden';    
                // this.bodyScrolling(false);
            }
        }

        this.setState({
            active: !active
        });
    }

    bodyScrolling = (bool) => {
        if (bool === true) {
            document.body.addEventListener("touchmove", (e) => e.preventDefault(), false);
        } else {
            document.body.removeEventListener("touchmove", (e) => e.preventDefault(), false);
        }
    }

    onMouseEnterToggle = () => {
        this.setState({
            toggleButtonStyle: '#30C0AA'
        });
    }

    onMouseLeaveToggle = () => {
        this.setState({
            toggleButtonStyle: 'black'
        });
    }

    signOut = () => {
        sessionStorage.removeItem('userId');
        this.props.dispatch(signOut());
        this.props.history.push('/auth/signIn');

        const url = '/auth/signInOut/';
        Fetch.GET(url)
        .then(res => {
            console.log('logout');
        })
        .catch(error => {
            alert(error);
        })
        .finally(() => {
            console.log('logout')
        })
    }

    render() {
        const { active, toggleButtonStyle, currentPath, isWindowSmall, userId } = this.state;
        return (
            <Fragment>
                {/* Sidebar */}
                <div id="sidebar" className={active ? 'active' : null}>
                    <Nav vertical style={{minHeight:'100vh'}}>
                        <NavLink to="/main/components/" className={'homeButton'} tag={Link} style={{fontSize:'1rem', padding:'1.15rem 1.25rem', marginBottom:'1.5rem'}} onClick={isWindowSmall ? this.toggle : null}>
                            <span style={{fontSize:'1.2rem'}}>
                                <IoIosCloud size={30} color={'white'} style={{marginRight:'.75rem'}}/>
                                React Sample
                            </span>
                        </NavLink>
                        
                        {mainRoutes.map((route, key) => {
                            if(route.sidebar) {
                                if(route.subRoutes) {
                                    return (
                                        <div key={key}>
                                        <NavLink to={"#"} className={'menu'} tag={RRNavLink} key={key} id={"toggle" + key}>
                                            <route.icon size={20} color={'white'} style={{marginLeft:'.4rem', marginRight:'.75rem'}}/>
                                            {route.name}
                                            <FiChevronDown size={14} style={{position:'absolute', right:'1rem', marginTop:'5px'}}/>
                                        </NavLink>
                                        <UncontrolledCollapse toggler={"#toggle" + key}>
                                            {route.subRoutes.map((subRoute, subKey) => {
                                                if(subRoute.sidebar) {
                                                    return (
                                                        <NavLink to={subRoute.path} className={'submenu'} tag={RRNavLink} style={{fontSize:'1rem', paddingTop:'.5rem', paddingBottom:'.5rem', paddingLeft:'4.5rem'}} onClick={isWindowSmall ? this.toggle : null} key={subKey}>
                                                        {subRoute.name}
                                                        </NavLink>
                                                    )
                                                }else {
                                                    return null;
                                                }
                                            })}
                                        </UncontrolledCollapse>
                                        </div>
                                    )
                                    
                                }else {
                                    return (
                                        <NavLink to={route.path} className={'menu'} tag={RRNavLink} key={key} onClick={isWindowSmall ? this.toggle : null}>
                                            <route.icon size={20} color={'white'} style={{marginLeft:'.4rem', marginRight:'.75rem'}}/>
                                            {route.name}
                                        </NavLink>
                                    )
                                }
                            }else {
                                return null;
                            }
                        })}
                    </Nav>
                </div>

                {/* Header */}
                <Navbar id="header" className={active ? 'active' : null} color="light" light>
                    <NavbarBrand onClick={this.toggle} onMouseEnter={this.onMouseEnterToggle} onMouseLeave={this.onMouseLeaveToggle} style={{cursor:'pointer'}}>
                        <FiAlignLeft size={25} color={toggleButtonStyle}/>
                    </NavbarBrand>
                    <NavbarBrand>
                        {this.getCurrentPageName(currentPath)}
                    </NavbarBrand>
                    
                    <Nav className="ml-auto">
                        <Navbar>
                        </Navbar>
                        <UncontrolledDropdown>
                            <DropdownToggle nav style={{color:'black'}}>
                                <IoMdContact color='#0070d9' size={30}/>{' '}
                                {userId}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                                </DropdownItem>
                                <DropdownItem>
                                    Option 2
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={this.signOut}>
                                    Sign out
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Navbar>

                {/* Content */}
                <div id="content" className={active ? 'active' : null}>
                    {/* Inner Content */}
                    <div id="innerContent">
                        <Switch>
                            {mainRoutes.map((route, key) => {
                                if(route.subRoutes) {
                                    let subRoutes = [];
                                    route.subRoutes.map((subRoute, subKey) => {
                                        // console.log(subRoute.path);
                                        subRoutes.push(
                                            <Route exact path={subRoute.path} component={subRoute.component} key={subKey}/>    
                                        )
                                        return null;
                                    });
                                    return subRoutes;

                                }else {
                                    return (
                                        <Route exact path={route.path} component={route.component} key={key}/>
                                    )
                                }
                            })}
                            <Redirect to="/main/dashboard"/>
                        </Switch>
                    </div>

                    {/* Footer */}
                    <div className="footer small" align="right">
                        <ul className="list-inline">
                            <li className="list-inline-item" style={{color:'#6C757D'}}>
                                Developed by 권혁찬
                            </li>
                        </ul>
                    </div>
                </div>

                <div id={'overlay'} className={active ? 'active' : null} onClick={this.toggle}/>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        userId: state.auth.userId
    })
)(withRouter(windowSize(MainLayout)))