import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container} from 'reactstrap';
import {connect} from 'react-redux';

import {
    AppAside,
    AppBreadcrumb,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from './_nav';
// routes config
import adminRoutes from './adminRoutes';
import AdmintAside from './AdmintAside';
import AdminFooter from './AdminFooter';
import AdminHeader from './AdminHeader';

import {APP_LOAD} from 'constants/actionTypes';
import { setToken } from 'utils/requests';

import authAgent from './Auth/agent'

class AdminLayout extends Component {

    componentDidMount() {
        const token = window.localStorage.getItem('jwt');
        if (token) {
            setToken(token);
        }
        this.props.onLoad(token ? authAgent.current() : null, token);
    }

    render() {
        return (
            <div className="app">
                <AppHeader fixed>
                    <AdminHeader appName={this.props.appName}
                                 currentUser={this.props.currentUser}/>
                </AppHeader>
                <div className="app-body">
                    <AppSidebar fixed display="lg">
                        <AppSidebarHeader/>
                        <AppSidebarForm/>
                        <AppSidebarNav navConfig={navigation} {...this.props} />
                        <AppSidebarFooter/>
                        <AppSidebarMinimizer/>
                    </AppSidebar>
                    <main className="main">
                        <AppBreadcrumb appRoutes={adminRoutes}/>
                        <Container fluid>
                            <Switch>
                                {adminRoutes.map((route, idx) => {
                                        return route.component ? (
                                                <Route key={idx} path={route.path} exact={route.exact} name={route.name}
                                                       render={props => (
                                                           <route.component {...props} />
                                                       )}/>)
                                            : (null);
                                    },
                                )}
                                <Redirect from="/" to="/dashboard"/>
                            </Switch>
                        </Container>
                    </main>
                    <AppAside fixed hidden>
                        <AdmintAside/>
                    </AppAside>
                </div>
                <AppFooter>
                    <AdminFooter/>
                </AppFooter>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        appLoaded: state.common.appLoaded,
        appName: state.common.appName,
        currentUser: state.common.currentUser,
        redirectTo: state.common.redirectTo
    }
};

const mapDispatchToProps = dispatch => ({
    onLoad: (payload, token) =>
        dispatch({type: APP_LOAD, payload, token, skipTracking: true}),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout);