import SignIn from 'views/auth/SignIn';
import InitAdmin from 'views/auth/InitAdmin';
import FindHost from 'views/auth/FindHost';
import TempSignIn from 'views/auth/TempSignIn';

const contextPath = '/auth/';

const authRoutes = [
    {
        path: contextPath + 'signIn',
        name: 'Sign In',
        component: SignIn
    },
    {
        path: contextPath + 'initAdmin',
        name: 'Init Admin',
        component: InitAdmin
    },
    {
        path: contextPath + 'findHost',
        name: 'Find Host',
        component: FindHost
    },
    {
        path: contextPath + 'tempSignIn',
        name: 'Temp Sign In',
        component: TempSignIn
    },
]

export default authRoutes;
