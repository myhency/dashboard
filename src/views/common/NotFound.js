import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Button
} from "reactstrap";
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';

class NotFound extends Component {
    goMainPage = () => {
        // this.props.history.push('/main');
        window.location.href = '/main';
    };

    render() {
        return (
            <Fragment>
                {/* Header */}
                {/* <Navbar className={'authHeader'} color={'light'} light expand="md">
                    <NavbarBrand>
                        <Aperture size={25} color={'#30C0AA'}/>
                    </NavbarBrand>
                    <NavbarBrand>
                        Sample Project
                    </NavbarBrand>
                </Navbar> */}
                <ContentRow className={'authContent'}>
                    <ContentCol xl={12} style={{textAlign:'center'}}>
                        <h1>404</h1>
                        <h4>Not Found</h4>
                        <Button color="primary" onClick={this.goMainPage}>
                            Go to main page..
                        </Button>
                    </ContentCol>
                </ContentRow>
            </Fragment>
        );
    }
}

export default withRouter(NotFound);