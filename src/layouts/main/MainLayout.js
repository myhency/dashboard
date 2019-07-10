import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Link, NavLink as RRNavLink, withRouter, Redirect, Switch } from "react-router-dom";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavLink,
    UncontrolledCollapse,
} from "reactstrap";
import windowSize from 'react-window-size';
import { IoIosCloud } from 'react-icons/io';
import { FiChevronDown, FiAlignLeft } from 'react-icons/fi';
import mainRoutes from 'routes/main';
import UrlPattern from "url-pattern";
import { setInfo } from 'store/modules/currentInfo';
import { setPage } from 'store/modules/tempPageName';
import { FaBook } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ReactTooltip from 'react-tooltip';
import jQuery from "jquery";

window.$ = window.jQuery = jQuery;

class MainLayout extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            active: false,
            toggleButtonStyle: 'black',
            currentPath: '',
            currentInfo: '',
            tempPageName: undefined,
            isWindowSmall: false,
        };
    }

    static getDerivedStateFromProps(props, state) {
        
        let { currentPath, currentInfo, tempPageName } = state;
        let isWindowSmall = false;

        if(currentPath !== props.location.pathname) {
            currentPath = props.location.pathname;
            props.dispatch(setInfo(''));
            props.dispatch(setPage(undefined));
        }

        if(currentInfo !== props.currentInfo) {
            currentInfo = props.currentInfo;
        }

        if(tempPageName !== props.tempPageName) {
            tempPageName = props.tempPageName;
        }

        if(props.windowWidth <= 768) {
            isWindowSmall = true;
        }

        return {
            currentPath,
            isWindowSmall,
            currentInfo,
            tempPageName
        }
    }

    getCurrentPageName = (currentPath) => {
        for(var i=0; i<mainRoutes.length; i++) {
            const route = mainRoutes[i];
        
            if(this.state.tempPageName !== undefined) {
                return this.state.tempPageName;
            }

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
            }else {
                document.body.style.overflow = 'hidden';    
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

    render() {
        const { active, currentPath, currentInfo, isWindowSmall } = this.state;
        return (
            <Fragment>
                {/* Sidebar */}
                <div id="sidebar" className={active ? 'active' : null}>
                    <Nav vertical style={{minHeight:'100vh'}}>
                        <NavLink to="/main/components/" className={'homeButton'} tag={Link} style={{fontSize:'1rem', padding:'1.15rem 1.25rem', marginBottom:'1.5rem'}} onClick={isWindowSmall ? this.toggle : null}>
                            <span style={{fontSize:'1.2rem', fontFamily: 'arial'}}>
                                <IoIosCloud size={30} color={'white'} style={{marginRight:'.75rem'}}/>
                                HMG BaaS Portal
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
                                        <NavLink to={route.path} className={'menu'} tag={RRNavLink} key={key} onClick={isWindowSmall ? this.toggle : null} style={{fontFamily: 'arial'}}>
                                            <route.icon size={20} color={'white'} style={{marginLeft:'.4rem', marginRight:'.75rem'}}/>
                                            {route.name}
                                        </NavLink>
                                    )
                                }
                            }else {
                                return null;
                            }
                        })}
                        <a href="http://10.40.111.60:3001" className={'manualButton'} target="blank" >
                            <FaBook size={20} color={'#0F9EDB'} style={{marginLeft:'.4rem', marginRight:'.75rem'}}/>
                            User Guide
                        </a>
                    </Nav>
                </div>

                {/* Header */}
                <Navbar id="header" className={active ? 'active' : null}>
                    <NavbarBrand onClick={this.toggle} onMouseEnter={this.onMouseEnterToggle} onMouseLeave={this.onMouseLeaveToggle} style={{cursor:'pointer'}}>
                        <FiAlignLeft size={25} color={'#FFFFFF'}/>
                    </NavbarBrand>
                    <NavbarBrand>
                        <span style={{fontFamily: 'Arial'}}>{this.getCurrentPageName(currentPath)}</span>
                        <span style={{fontSize: '1.0rem', color: 'gray', marginLeft: '20px'}}> 
                            {currentInfo}
                        </span>
                        {(this.getCurrentPageName(currentPath) === "Address") || (this.getCurrentPageName(currentPath) === "Contract") ?
                            <span data-tip='Copy'  data-for='addressCopy'>
                                <CopyToClipboard text={currentInfo} onCopy={() => { this.setState({copied: true}) }}> 
                                    <img alt="copy" src={'/img/copy.svg'} height='18px' style={{marginLeft: '10px'}}/>
                                    {/* <FaCopy style={{marginLeft: '10px', color: 'white'}}/> */}
                                </CopyToClipboard>
                                <ReactTooltip id='addressCopy' getContent={(dataTip) => {if(this.state.copied) return 'Copied'; else return 'Copy';}} afterHide={() => {this.setState({copied: false}) }}/>
                            </span> : null 
                        }
                    </NavbarBrand>
                    
                    <Nav className="ml-auto">
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
                    <div className="footer small" align='right'>
                        <div style={{color:'white'}} >
                            &nbsp;&nbsp;&nbsp;© HYUNDAI AUTOEVER
                        </div>
                        {/* <ul className="list-inline">
                            <li className="list-inline-item" style={{color:'#6C757D'}}>
                                © HYUNDAI
                            </li>
                        </ul> */}
                    </div>
                </div>

                <div id={'overlay'} className={active ? 'active' : null} onClick={this.toggle}/>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        currentInfo: state.currentInfo.info,
        tempPageName: state.tempPageName.pageName
    })
)(withRouter(windowSize(MainLayout)))