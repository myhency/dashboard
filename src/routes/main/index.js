import Dashboardmain from 'views/main/dashboard/Dashboardmain';
import MyProfile from 'views/main/dashboard/MyProfile';
import EditProfile from 'views/main/dashboard/EditProfile';
import Scanner from 'views/main/scanner/Scannermain';
import BlockList from 'views/main/scanner/BlockList';
import BlockInfo from 'views/main/scanner/BlockInfo';
import TxList from 'views/main/scanner/TxList';
import TxInfo from 'views/main/scanner/TxInfo';
import Address from 'views/main/scanner/Address.js';

import { FaChartBar, FaSearch } from 'react-icons/fa';

const contextPath = '/main/';

const mainRoutes = [
    // {
    //     path: contextPath +'home',
    //     name: 'Home',
    //     component: Home,
    //     sidebar: false
    // },
    {
        name: 'Dashboard',
        icon: FaChartBar,
        sidebar: true,
        path: contextPath + 'dashboard',
        component: Dashboardmain,
    },
    {
        name: 'Scanner',
        icon: FaSearch,
        sidebar: true,
        path: contextPath + 'scanner',
        component: Scanner
    },
    {
        path: contextPath + 'myprofile',
        name: 'My profile',
        component: MyProfile,
        sidebar: false,
    },
    {
        path: contextPath + 'editprofile',
        name: 'Edit Profile',
        component: EditProfile,
        sidebar: false,
    },
    {
        path: contextPath + 'scanner/block',
        name: 'Block List',
        component: BlockList,
        sidebar: false
    },
    {
        path: contextPath + 'scanner/block/:blockNo',
        name: 'Block',
        component: BlockInfo,
        sidebar: false
    },
    {
        path: contextPath + 'scanner/transaction',
        name: 'Transaction List',
        component: TxList,
        sidebar: false
    },
    {
        path: contextPath + 'scanner/transaction/:transactionHash',
        name: 'Transaction Details',
        component: TxInfo,
        sidebar: false
    },
    {
        path: contextPath + 'scanner/address/:address',
        name: 'Address',
        component: Address,
        sidebar: false
    },
]

export default mainRoutes;