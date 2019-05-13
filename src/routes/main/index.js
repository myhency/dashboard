import React from 'react';
import { Redirect } from 'react-router-dom';
import Home from 'views/main/Home';

import Dashboardmain from 'views/main/dashboard/Dashboardmain';

import Scanner from 'views/main/scanner/Scannermain';
import BlockList from 'views/main/scanner/BlockList';
import BlockInfo from 'views/main/scanner/BlockInfo';
import TxList from 'views/main/scanner/TxList';
import TxInfo from 'views/main/scanner/TxInfo';
import Contract from 'views/main/scanner/Contract.js';
import Address from 'views/main/scanner/Address.js';

import APIGenerator from 'views/main/APIGenerator/Api_Generator.js';
import DappSelect from 'views/main/DApp/selectDapp.js';
import SupplyChain from 'views/main/DApp/supplyChain.js';

import { FiPackage, FiFile, FiImage, FiBox, FiBookOpen } from 'react-icons/fi';
import { FaChartBar, FaEye, FaUserEdit } from 'react-icons/fa';

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
        path: contextPath + 'scanner/contract/:contract',
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
        name: 'API Generator',
        path: contextPath + 'api-generator',
        component: APIGenerator,
        icon: FiBox,
        sidebar: true
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
]

export default mainRoutes;