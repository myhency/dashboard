import React from 'react';
import { Redirect } from 'react-router-dom';
import Home from 'views/main/Home';
import Alerts from 'views/main/components/Alerts';
import Badges from 'views/main/components/Badges';
import Buttons from 'views/main/components/Buttons';
import Charts from 'views/main/components/Charts';
import Tables from 'views/main/components/Tables';
import Tabs from 'views/main/components/Tabs';
import Dashboardmain from 'views/main/dashboard/Dashboardmain';

import FontAwesome from 'views/main/icons/FontAwesome';
import Ionicons from 'views/main/icons/Ionicons';
import Material from 'views/main/icons/Material';
import Typicons from 'views/main/icons/Typicons';
import GithubOcticons from 'views/main/icons/GithubOcticons';
import Feather from 'views/main/icons/Feather';

import NoticeList from 'views/main/pages/NoticeList';

import Scanner from 'views/main/scanner/Scannermain';
import BlockList from 'views/main/scanner/BlockList';
import BlockInfo from 'views/main/scanner/BlockInfo';
import TxList from 'views/main/scanner/TxList';
import TxInfo from 'views/main/scanner/TxInfo';
import Contract from 'views/main/scanner/Contract.js';
import Address from 'views/main/scanner/Address.js';

import DappSelect from 'views/main/DApp/selectDapp.js';
import SupplyChain from 'views/main/DApp/supplyChain.js';

import { FiPackage, FiFile, FiImage, FiBox, FiBookOpen } from 'react-icons/fi';
import { FaChartBar, FaEye, FaUserEdit } from 'react-icons/fa';
import NoticeDetail from '../../views/main/pages/NoticeDetail';
import NoticeWrite from '../../views/main/pages/NoticeWrite';


import NodeTest from 'views/main/nodetest/main'
import Service from 'views/main/service/main'

const contextPath = '/main/';

const mainRoutes = [
    {
        path: contextPath +'home',
        name: 'Home',
        component: Home,
        sidebar: false
    },
    {
        name: 'Dashboard',
        icon: FaChartBar,
        sidebar: true,
        path: contextPath + 'dashboard/main',
        component: Dashboardmain,
    },
    {
        name: 'Scanner',
        icon: FaChartBar,
        sidebar: true,
        path: contextPath + 'scanner',
        component: Scanner
    },
    {
        path: contextPath + 'scanner/block',
        name: 'Block List',
        component: BlockList,
        sidebar: false
    },
    {
        path: contextPath + 'scanner/block/:blockNo',
        name: 'Block Info',
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
        path: contextPath + 'scanner/address',
        name: 'Contract',
        component: Contract,
        sidebar: false
    },
    {
        path: contextPath + 'scanner/address/:address',
        name: 'Address',
        component: Address,
        sidebar: false
    },
    {
        name: 'DApp Demo Space',
        icon: FiBox,
        sidebar: true,
        path: contextPath + 'dapp/select',
        component: DappSelect
    },
    {
        name: 'Supply Chain',
        sidebar: false,
        path: contextPath + 'dapp/supplychain',
        component: SupplyChain
    },
    {
        name: 'Components',
        icon: FiPackage,
        sidebar: true,
        subRoutes: [
            {
                path: contextPath + 'components/alerts',
                name: 'Alerts',
                component: Alerts,
                sidebar: true
            },
            {
                path: contextPath + 'components/badges',
                name: 'Badges',
                component: Badges,
                sidebar: true
            },
            {
                path: contextPath + 'components/buttons',
                name: 'Buttons',
                component: Buttons,
                sidebar: true
            },
            {
                path: contextPath + 'components/charts',
                name: 'Charts',
                component: Charts,
                sidebar: true
            },
            {
                path: contextPath + 'components/tables',
                name: 'Tables',
                component: Tables,
                sidebar: true
            },
            {
                path: contextPath + 'components/tabs',
                name: 'Tabs',
                component: Tabs,
                sidebar: true
            }
        ]
    },
    {
        name: 'Icons',
        icon: FiImage,
        sidebar: true,
        subRoutes: [
            {
                path: contextPath + 'icons/fontAwesome',
                name: 'Font Awesome',
                component: FontAwesome,
                sidebar: true
            },
            {
                path: contextPath + 'icons/ionicons',
                name: 'Ionicons',
                component: Ionicons,
                sidebar: true
            },
            {
                path: contextPath + 'icons/material',
                name: 'Material',
                component: Material,
                sidebar: true
            },
            {
                path: contextPath + 'icons/typicons',
                name: 'Typicons',
                component: Typicons,
                sidebar: true
            },
            {
                path: contextPath + 'icons/githubOcticons',
                name: 'Github Octicons',
                component: GithubOcticons,
                sidebar: true
            },
            {
                path: contextPath + 'icons/feather',
                name: 'Feather',
                component: Feather,
                sidebar: true
            }
        ]
    },
    {
        name: 'Pages',
        icon: FiFile,
        sidebar: true,
        subRoutes: [
            {
                path: contextPath + 'pages/signIn',
                name: 'Sign In',
                component: () => <Redirect to="/auth/signIn"/>,
                sidebar: true
            },
            {
                path: contextPath + 'pages/404',
                name: '404 Not Found',
                component: () => <Redirect to="/notFound"/>,
                sidebar: true
            },
            {
                path: contextPath + 'pages/noticeList',
                name: '게시판 샘플',
                component: NoticeList,
                sidebar: true
            },
            {
                path: contextPath + 'pages/notice/:noticeId',
                name: '게시판 샘플',
                component: NoticeDetail,
                sidebar: false
            },
            {
                path: contextPath + 'pages/noticeWrite',
                name: '게시판 샘플',
                component: NoticeWrite,
                sidebar: false
            }
        ]
    },
    {
        name: 'Admin',
        icon: FaUserEdit,
        sidebar: true,
        path: contextPath + 'components/badges'
    },
    {
        name: 'NodeTest',
        icon: FiBox,
        sidebar: true,
        path: contextPath + 'nodetest/main',
        component: NodeTest,
    },
    {
        name: 'Service',
        icon: FiBookOpen,
        sidebar: true,
        path: contextPath + 'service/main',
        // component: Service,
        component: () => <Redirect to="/service"/>,
    },
]

export default mainRoutes;