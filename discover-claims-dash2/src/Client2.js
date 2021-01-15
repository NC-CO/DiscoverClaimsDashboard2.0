import React, {Component} from 'react';
import { Container, Row, Col, Input, InputGroup, FormGroup, Label, Button, ButtonGroup, ListGroup, ListGroupItem, Collapse, CustomInput} from 'reactstrap';
import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import InlineEdit from 'react-ions/lib/components/InlineEdit';
import {downloadFile, multiplyBy4, addRow, addTwo, divideBy4, divideBy, numberWithCommas, numberWithCommasSm, multiplywPer, multiply, multiplywPerBig, subtract, handleInputStr, handleOutputStr, handleStrFinal, handleMetricsOutput} from "./Functions";
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import App from "./App";
import Client2 from "./Client2";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


function beforeSaveCell(oldValue, newValue, row, column, done) {
    setTimeout(() => {
        if (window.confirm('Do you want to accept this change?')) {
            done(true);
        } else {
            done(false);
        }
    }, 0);
    return { async: true };
}

const columns = [
    {dataField: 'Legacy / Lookback', text: 'Legacy / Lookback'},
    {dataField: 'Phase', text: 'Phase'},
    {dataField: 'Actual', text: 'Amount'},
    {dataField: 'Actual Timing & Comments', text: 'Actual Timing & Comments'},
    {dataField: 'Forward Flow', text: 'Forward Flow'},
    {dataField: 'Actual__1', text: 'Amount'},
    {dataField: 'Actual\" Timing & Comments', text: 'Actual Timing & Comments'},
]
const columnsRates = [
    {dataField: 'vendor', text : 'vendor'},
    {dataField: 'rate', text : 'rate'}
]

export default class Client1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            car: '88',
            qiPercentLeg: '',
            qiPercentFor: '',
            metricsTemp: [],
            rates: [
                {   "vendor": "Verisk",
                    "rate": "$8.50"
                },
                {   "vendor": "Westlaw",
                    "rate": "$0.30"
                },
            ],
            metrics: [
                {
                    "Legacy / Lookback": "Legacy data - number of accounts",
                    "Phase": "Initial",
                    "Actual": "366,292",
                    "Actual Timing & Comments": "Immediately post data load",
                    "Forward Flow": "Forward Flow Data - number of accounts",
                    "Actual__1": "15,729",
                    "Actual\" Timing & Comments": "Immediately post data load",
                },
                {
                    "Legacy / Lookback": "Legacy data - face value of accounts",
                    "Phase": "Initial",
                    "Actual": "1,042,100,000",
                    "Actual Timing & Comments": "Immediately post data load",
                    "Forward Flow": "Forward Flow data - face value of accounts",
                    "Actual__1": "$44,750,000",
                    "Actual\" Timing & Comments": "Immediately post data load",
                },
                {
                    "Legacy / Lookback": "Average Account Value",
                    "Phase": "Initial",
                    "Actual": "2,845",
                    "Actual Timing & Comments": "Immediately post data load",
                    "Forward Flow": "Average Account Value",
                    "Actual__1": "2,845",
                    "Actual\" Timing & Comments": "Immediately post data load",
                },
                {
                    "Legacy / Lookback": "Qualified Inventory (\"QI\") - count",
                    "Phase": "Initial",
                    "Actual": "10,725",
                    "Actual Timing & Comments": "Immediately post data load",
                    "Forward Flow": "Qualified Inventory (\"QI\") - count",
                    "Actual__1": 472,
                    "Actual\" Timing & Comments": "Immediately post data load",
                },
                {
                    "Legacy / Lookback": "Qualified Inventory (\"QI\") - value (total)",
                    "Phase": "Initial",
                    "Actual": "44,802,180",
                    "Actual Timing & Comments": "Immediately post data load",
                    "Forward Flow": "Qualified Inventory (\"QI\") - value (total)",
                    "Actual__1": "1,971,216",
                    "Actual\" Timing & Comments": "Immediately post data load",
                },
                {
                    "Legacy / Lookback": "Qualified Inventory (\"QI\") - account value (average)",
                    "Phase": "Initial",
                    "Actual": "4,177",
                    "Actual Timing & Comments": "Immediately post data load",
                    "Forward Flow": "Qualified Inventory (\"QI\") - account value (average)",
                    "Actual__1": "4,177",
                    "Actual\" Timing & Comments": "Immediately post data load",
                },
                {
                    "Legacy / Lookback": "Qualified Inventory (\"QI\") - count as a % all Legacy Data",
                    "Phase": "Initial",
                    "Actual": "2.93%",
                    "Actual Timing & Comments": "Immediately post data load",
                    "Forward Flow": "Qualified Inventory (\"QI\") - count as a % all Quarterly Data",
                    "Actual__1": "3.00%",
                    "Actual\" Timing & Comments": "Immediately post data load",
                },
                {
                    "Legacy / Lookback": "QI eligible for Verisk - count",
                    "Phase": "Initial",
                    "Actual": "5,497",
                    "Actual Timing & Comments": "Immediately post data load",
                    "Forward Flow": "QI eligible for Verisk - count",
                    "Actual__1": 354,
                    "Actual\" Timing & Comments": "Immediately post data load",
                },
                {
                    "Legacy / Lookback": "QI eligible for Verisk - value",
                    "Phase": "Initial",
                    "Actual": "22,401,090",
                    "Actual Timing & Comments": "Immediately post data load",
                    "Forward Flow": "QI eligible for Verisk - value",
                    "Actual__1": "1,478,412",
                    "Actual\" Timing & Comments": "Immediately post data load",
                },
                {
                    "Legacy / Lookback": "QI eligible for Verisk - as a percent of QI",
                    "Phase": "Initial",
                    "Actual": "51.25%",
                    "Actual Timing & Comments": "Immediately post data load",
                    "Forward Flow": "QI eligible for Verisk - as a percent of QI",
                    "Actual__1": "75.00%",
                    "Actual\" Timing & Comments": "Immediately post data load",
                },
                {
                    "Legacy / Lookback": "QI sent to Verisk - count",
                    "Phase": "Discovery",
                    "Actual": "5,497",
                    "Actual Timing & Comments": "Staged... Unknown Schedule for submission",
                    "Forward Flow": "QI sent to Verisk - count",
                    "Actual__1": 354,
                    "Actual\" Timing & Comments": "Staged... Unknown Schedule for submission",
                },
                {
                    "Legacy / Lookback": "QI sent to Verisk - value",
                    "Phase": "Discovery",
                    "Actual": "22,401,090",
                    "Actual Timing & Comments": "Staged... Unknown Schedule for submission",
                    "Forward Flow": "QI sent to Verisk - value",
                    "Actual__1": "1,478,412",
                    "Actual\" Timing & Comments": "Staged... Unknown Schedule for submission",
                },
                {
                    "Legacy / Lookback": "Success / discovered 1st Party opportunities - count (Verisk)",
                    "Phase": "Discovery",
                    "Actual": 687,
                    "Actual Timing & Comments": "2 to 3  days post submission using logic/automation",
                    "Forward Flow": "Success / discovered 1st Party opportunities - count",
                    "Actual__1": 44,
                    "Actual\" Timing & Comments": "1 to 2 days post submission using logic/automation",
                },
                {
                    "Legacy / Lookback": "Success / discovered 1st Party opportunities - value (Verisk)",
                    "Phase": "Discovery",
                    "Actual": "2,870,140",
                    "Actual Timing & Comments": "2 to 3  days post submission using logic/automation",
                    "Forward Flow": "Success / discovered 1st Party opportunities - value",
                    "Actual__1": "184,801",
                    "Actual\" Timing & Comments": "1 to 2 days post submission using logic/automation",
                },
                {
                    "Legacy / Lookback": "Success / discovered Pre Lawsuit TPL opportunities - count (Verisk)",
                    "Phase": "Discovery",
                    "Actual": 687,
                    "Actual Timing & Comments": "2 to 3  days post submission using logic/automation",
                    "Forward Flow": "Success / discovered Pre Lawsuit TPL opportunities - count (Verisk)",
                    "Actual__1": 44,
                    "Actual\" Timing & Comments": "1 to 2 days post submission using logic/automation",
                },
                {
                    "Legacy / Lookback": "Success / discovered Pre-Lawsuit TPL opportunities - value (Verisk)",
                    "Phase": "Discovery",
                    "Actual": "2,870,140",
                    "Actual Timing & Comments": "2 to 3  days post submission using logic/automation",
                    "Forward Flow": "Success / discovered Pre-Lawsuit TPL opportunities - value (Verisk)",
                    "Actual__1": "184,801",
                    "Actual\" Timing & Comments": "1 to 2 days post submission using logic/automation",
                },
                {
                    "Legacy / Lookback": "Success / discovered rate - Verisk",
                    "Phase": "Discovery",
                    "Actual": "25.00%",
                    "Actual Timing & Comments": "2 to 3  days post submission using logic/automation",
                    "Forward Flow": "Success / discovered rate - Verisk",
                    "Actual__1": "25.00%",
                    "Actual\" Timing & Comments": "1 to 2 days post submission using logic/automation",
                },
                {
                    "Legacy / Lookback": "QI eligible for Courts - count",
                    "Phase": "Discovery",
                    "Actual": "9,351",
                    "Actual Timing & Comments": "2 to 3  days post submission using logic/automation",
                    "Forward Flow": "QI eligible for Courts - count",
                    "Actual__1": 383,
                    "Actual\" Timing & Comments": "1 to 2 days post submission using logic/automation",
                },
                {
                    "Legacy / Lookback": "QI eligible for Courts - value",
                    "Phase": "Discovery",
                    "Actual": "39,061,901",
                    "Actual Timing & Comments": "2 to 3  days post submission using logic/automation",
                    "Forward Flow": "QI eligible for Courts - value",
                    "Actual__1": "1,601,613",
                    "Actual\" Timing & Comments": "1 to 2 days post submission using logic/automation",
                },
                {
                    "Legacy / Lookback": "QI sent to Courts - count",
                    "Phase": "Discovery",
                    "Actual": "9,351",
                    "Actual Timing & Comments": "Staged... Unknown Schedule for submission",
                    "Forward Flow": "QI sent to Courts - count",
                    "Actual__1": 383,
                    "Actual\" Timing & Comments": "Staged... Unknown Schedule for submission",
                },
                {
                    "Legacy / Lookback": "QI sent to Courts - value",
                    "Phase": "Discovery",
                    "Actual": "39,061,901",
                    "Actual Timing & Comments": "Staged... Unknown Schedule for submission",
                    "Forward Flow": "QI sent to Courts - value",
                    "Actual__1": "1,601,613",
                    "Actual\" Timing & Comments": "Staged... Unknown Schedule for submission",
                },
                {
                    "Legacy / Lookback": "Success / discovered Lawsuit TPL opportunities - count (Courts)",
                    "Phase": "Discovery",
                    "Actual": 309,
                    "Actual Timing & Comments": "+/- a week post submission using logic/automation",
                    "Forward Flow": "Success / discovered Lawsuit TPL opportunities - count (Courts)",
                    "Actual__1": 13,
                    "Actual\" Timing & Comments": "+/- a week post submission using logic/automation",
                },
                {
                    "Legacy / Lookback": "Success / discovered Lawsuit TPL opportunities - value (Courts)",
                    "Phase": "Discovery",
                    "Actual": "4,478,562",
                    "Actual Timing & Comments": "+/- a week post submission using logic/automation",
                    "Forward Flow": "Success / discovered Lawsuit TPL opportunities - value (Courts)",
                    "Actual__1": "183,630",
                    "Actual\" Timing & Comments": "+/- a week post submission using logic/automation",
                },
                {
                    "Legacy / Lookback": "Success / discovered Lawsuit TPL opportunities - average case value (Courts)",
                    "Phase": "Discovery",
                    "Actual": "14,514",
                    "Actual Timing & Comments": "+/- a week post submission using logic/automation",
                    "Forward Flow": "Success / discovered Lawsuit TPL opportunities - average case value (Courts)",
                    "Actual__1": "14,514",
                    "Actual\" Timing & Comments": "+/- a week post submission using logic/automation",
                },
                {
                    "Legacy / Lookback": "Success / discovered rate - Courts",
                    "Phase": "Discovery",
                    "Actual": "3.30%",
                    "Actual Timing & Comments": "+/- a week post submission using logic/automation",
                    "Forward Flow": "Success / discovered rate - Courts",
                    "Actual__1": "3.30%",
                    "Actual\" Timing & Comments": "+/- a week post submission using logic/automation",
                },
                {
                    "Legacy / Lookback": "Number of all success/discovered accounts approved by client 1st Party",
                    "Phase": "Discovery",
                    "Actual": 618,
                    "Actual Timing & Comments": "client dependant",
                    "Forward Flow": "Number of all success/discovered accounts approved by client 1st Party",
                    "Actual__1": 40,
                    "Actual\" Timing & Comments": "client dependant",
                },
                {
                    "Legacy / Lookback": "Value of all success/discovered accounts approved by client 1st Party",
                    "Phase": "Discovery",
                    "Actual": "2,583,126",
                    "Actual Timing & Comments": "client dependant",
                    "Forward Flow": "Value of all success/discovered accounts approved by client 1st Party",
                    "Actual__1": "166,321",
                    "Actual\" Timing & Comments": "client dependant",
                },
                {
                    "Legacy / Lookback": "Average Value of all success/discovered accounts approved by client 1st Party",
                    "Phase": "Discovery",
                    "Actual": "4,177",
                    "Actual Timing & Comments": "client dependant",
                    "Forward Flow": "Average Value of all success/discovered accounts approved by client 1st Party",
                    "Actual__1": "4,177",
                    "Actual\" Timing & Comments": "client dependant",
                },
                {
                    "Legacy / Lookback": "Number of all success/discovered accounts approved by client Pre-Lawsuit TPL",
                    "Phase": "Discovery",
                    "Actual": 618,
                    "Actual Timing & Comments": "client dependant",
                    "Forward Flow": "Number of all success/discovered accounts approved by client Pre-Lawsuit TPL",
                    "Actual__1": 40,
                    "Actual\" Timing & Comments": "client dependant",
                },
                {
                    "Legacy / Lookback": "Value of all success/discovered accounts approved by client Pre-Lawsuit TPL",
                    "Phase": "Discovery",
                    "Actual": "2,583,126",
                    "Actual Timing & Comments": "client dependant",
                    "Forward Flow": "Value of all success/discovered accounts approved by client Pre-Lawsuit TPL",
                    "Actual__1": "166,321",
                    "Actual\" Timing & Comments": "client dependant",
                },
                {
                    "Legacy / Lookback": "Average Value of all success/discovered accounts approved by client Pre-Lawsuit TPL",
                    "Phase": "Discovery",
                    "Actual": "4,177",
                    "Actual Timing & Comments": "client dependant",
                    "Forward Flow": "Average Value of all success/discovered accounts approved by client Pre-Lawsuit TPL",
                    "Actual__1": "4,177",
                    "Actual\" Timing & Comments": "client dependant",
                },
                {
                    "Legacy / Lookback": "Number of all success/discovered accounts approved by client Lawsuit TPL",
                    "Phase": "Discovery",
                    "Actual": 278,
                    "Actual Timing & Comments": "client dependant",
                    "Forward Flow": "Number of all success/discovered accounts approved by client Lawsuit TPL",
                    "Actual__1": 11,
                    "Actual\" Timing & Comments": "client dependant",
                },
                {
                    "Legacy / Lookback": "Value of all success/discovered accounts approved by client Lawsuit TPL",
                    "Phase": "Discovery",
                    "Actual": "4,030,706",
                    "Actual Timing & Comments": "client dependant",
                    "Forward Flow": "Value of all success/discovered accounts approved by client Lawsuit TPL",
                    "Actual__1": "165,267",
                    "Actual\" Timing & Comments": "client dependant",
                },
                {
                    "Legacy / Lookback": "Average Value of all success/discovered accounts approved by client Lawsuit TPL",
                    "Phase": "Discovery",
                    "Actual": "14,514",
                    "Actual Timing & Comments": "client dependant",
                    "Forward Flow": "Average Value of all success/discovered accounts approved by client Lawsuit TPL",
                    "Actual__1": "14,514",
                    "Actual\" Timing & Comments": "client dependant",
                },
                {
                    "Legacy / Lookback": "Recovered 1st Party opportunities - count",
                    "Phase": "Recovery",
                    "Actual": 378,
                    "Actual Timing & Comments": "follows liquidation curves and values",
                    "Forward Flow": "Recovered 1st Party opportunities - count",
                    "Actual__1": 24,
                    "Actual\" Timing & Comments": "follows liquidation curves and values",
                },
                {
                    "Legacy / Lookback": "Recovered 1st Party opportunities - value",
                    "Phase": "Recovery",
                    "Actual": "552,502",
                    "Actual Timing & Comments": "follows liquidation curves and values",
                    "Forward Flow": "Recovered 1st Party opportunities - value",
                    "Actual__1": "35,574",
                    "Actual\" Timing & Comments": "follows liquidation curves and values",
                },
                {
                    "Legacy / Lookback": "Recovered 1st Party opportunities as a % of opportunity count",
                    "Phase": "Recovery",
                    "Actual": "61%",
                    "Actual Timing & Comments": "follows liquidation curves and values",
                    "Forward Flow": "Recovered 1st Party opportunities as a % of opportunity count",
                    "Actual__1": "61%",
                    "Actual\" Timing & Comments": "follows liquidation curves and values",
                },
                {
                    "Legacy / Lookback": "Recovered 1st Party opportunities as a % of opportunity value",
                    "Phase": "Recovery",
                    "Actual": "35%",
                    "Actual Timing & Comments": "follows liquidation curves and values",
                    "Forward Flow": "Recovered 1st Party opportunities as a % of opportunity value",
                    "Actual__1": "35%",
                    "Actual\" Timing & Comments": "follows liquidation curves and values",
                },
                {
                    "Legacy / Lookback": "Recovered Pre Lawsuit TPL opportunities - count (Verisk)",
                    "Phase": "Recovery",
                    "Actual": 378,
                    "Actual Timing & Comments": "follows liquidation curves and values",
                    "Forward Flow": "Recovered Pre Lawsuit TPL opportunities - count (Verisk)",
                    "Actual__1": 24,
                    "Actual\" Timing & Comments": "follows liquidation curves and values",
                },
                {
                    "Legacy / Lookback": "Recovered Pre-Lawsuit TPL opportunities - value (Verisk)",
                    "Phase": "Recovery",
                    "Actual": "552,502",
                    "Actual Timing & Comments": "follows liquidation curves and values",
                    "Forward Flow": "Recovered Pre-Lawsuit TPL opportunities - value (Verisk)",
                    "Actual__1": "35,574",
                    "Actual\" Timing & Comments": "follows liquidation curves and values",
                },
                {
                    "Legacy / Lookback": "Recovered Pre-Lawsuit TPL opportunities as a % of opportunity count",
                    "Phase": "Recovery",
                    "Actual": "61%",
                    "Actual Timing & Comments": "follows liquidation curves and values",
                    "Forward Flow": "Recovered Pre-Lawsuit TPL opportunities as a % of opportunity count",
                    "Actual__1": "61%",
                    "Actual\" Timing & Comments": "follows liquidation curves and values",
                },
                {
                    "Legacy / Lookback": "Recovered Pre-Lawsuit TPL opportunities as a % of opportunity value",
                    "Phase": "Recovery",
                    "Actual": "35%",
                    "Actual Timing & Comments": "follows liquidation curves and values",
                    "Forward Flow": "Recovered Pre-Lawsuit TPL opportunities as a % of opportunity value",
                    "Actual__1": "35%",
                    "Actual\" Timing & Comments": "follows liquidation curves and values",
                },
                {
                    "Legacy / Lookback": "Recovered Lawsuit TPL opportunities - count (Courts)",
                    "Phase": "Recovery",
                    "Actual": 170,
                    "Actual Timing & Comments": "follows liquidation curves and values",
                    "Forward Flow": "Recovered Lawsuit TPL opportunities - count (Courts)",
                    "Actual__1": 7,
                    "Actual\" Timing & Comments": "follows liquidation curves and values",
                },
                {
                    "Legacy / Lookback": "Recovered Lawsuit TPL opportunities - value (Courts)",
                    "Phase": "Recovery",
                    "Actual": "862,123",
                    "Actual Timing & Comments": "follows liquidation curves and values",
                    "Forward Flow": "Recovered Lawsuit TPL opportunities - value (Courts)",
                    "Actual__1": "35,349",
                    "Actual\" Timing & Comments": "follows liquidation curves and values",
                },
                {
                    "Legacy / Lookback": "Recovered Lawsuit TPL opportunities as a percentage of opportunity count",
                    "Phase": "Recovery",
                    "Actual": "61%",
                    "Actual Timing & Comments": "follows liquidation curves and values",
                    "Forward Flow": "Recovered Lawsuit TPL opportunities as a percentage of opportunity count",
                    "Actual__1": "61%",
                    "Actual\" Timing & Comments": "follows liquidation curves and values",
                },
                {
                    "Legacy / Lookback": "Recovered Lawsuit TPL opportunities as a percentage of opportunity value",
                    "Phase": "Recovery",
                    "Actual": "35%",
                    "Actual Timing & Comments": "follows liquidation curves and values",
                    "Forward Flow": "Recovered Lawsuit TPL opportunities as a percentage of opportunity value",
                    "Actual__1": "35%",
                    "Actual\" Timing & Comments": "follows liquidation curves and values",
                },
                {
                    "Legacy / Lookback": "Closed no recovery claims count",
                    "Phase": "",
                    "Actual": "NA",
                    "Actual Timing & Comments": "follows liquidation curve",
                    "Forward Flow": "Closed no recovery claims count",
                    "Actual__1": "NA",
                    "Actual\" Timing & Comments": "follows liquidation curve",
                },
                {
                    "Legacy / Lookback": "Closed no recovery claims value",
                    "Phase": "",
                    "Actual": "NA",
                    "Actual Timing & Comments": "follows liquidation curve",
                    "Forward Flow": "Closed no recovery claims value",
                    "Actual__1": "NA",
                    "Actual\" Timing & Comments": "follows liquidation curve",
                },
                {
                    "Legacy / Lookback": "Closed no recovery liens count",
                    "Phase": "",
                    "Actual": "NA",
                    "Actual Timing & Comments": "follows liquidation curve",
                    "Forward Flow": "Closed no recovery liens count",
                    "Actual__1": "NA",
                    "Actual\" Timing & Comments": "follows liquidation curve",
                },
                {
                    "Legacy / Lookback": "Closed no recovery liens value",
                    "Phase": "",
                    "Actual": "NA",
                    "Actual Timing & Comments": "follows liquidation curve",
                    "Forward Flow": "Closed no recovery liens value",
                    "Actual__1": "NA",
                    "Actual\" Timing & Comments": "follows liquidation curve",
                },
                {
                    "Legacy / Lookback": "Closed no recovery lawsuits count",
                    "Phase": "",
                    "Actual": "NA",
                    "Actual Timing & Comments": "follows liquidation curve",
                    "Forward Flow": "Closed no recovery lawsuits count",
                    "Actual__1": "NA",
                    "Actual\" Timing & Comments": "follows liquidation curve",
                },
                {
                    "Legacy / Lookback": "Closed no recovery lawsuits value",
                    "Phase": "",
                    "Actual": "NA",
                    "Actual Timing & Comments": "follows liquidation curve",
                    "Forward Flow": "Closed no recovery lawsuits value",
                    "Actual__1": "NA",
                    "Actual\" Timing & Comments": "follows liquidation curve",
                },
                {
                    "Legacy / Lookback": "Open active bills count",
                    "Phase": "",
                    "Actual": "to develop @ Phase 3",
                    "Actual Timing & Comments": "Utilize existing metrics to estimate remaining revenue",
                    "Forward Flow": "Open active bills count",
                    "Actual__1": "to develop @ Phase 3",
                    "Actual\" Timing & Comments": "Utilize existing metrics to estimate remaining revenue",
                },
                {
                    "Legacy / Lookback": "Open active bills value",
                    "Phase": "",
                    "Actual": "to develop @ Phase 3",
                    "Actual Timing & Comments": "Utilize existing metrics to estimate remaining revenue",
                    "Forward Flow": "Open active bills value",
                    "Actual__1": "to develop @ Phase 3",
                    "Actual\" Timing & Comments": "Utilize existing metrics to estimate remaining revenue",
                },
                {
                    "Legacy / Lookback": "Open active liens count",
                    "Phase": "",
                    "Actual": "to develop @ Phase 3",
                    "Actual Timing & Comments": "Utilize existing metrics to estimate remaining revenue",
                    "Forward Flow": "Open active liens count",
                    "Actual__1": "to develop @ Phase 3",
                    "Actual\" Timing & Comments": "Utilize existing metrics to estimate remaining revenue",
                },
                {
                    "Legacy / Lookback": "Open active liens value",
                    "Phase": "",
                    "Actual": "to develop @ Phase 3",
                    "Actual Timing & Comments": "Utilize existing metrics to estimate remaining revenue",
                    "Forward Flow": "Open active liens value",
                    "Actual__1": "to develop @ Phase 3",
                    "Actual\" Timing & Comments": "Utilize existing metrics to estimate remaining revenue",
                },
                {
                    "Legacy / Lookback": "Open active lawsuits count",
                    "Phase": "",
                    "Actual": "to develop @ Phase 3",
                    "Actual Timing & Comments": "Utilize existing metrics to estimate remaining revenue",
                    "Forward Flow": "Open active lawsuits count",
                    "Actual__1": "to develop @ Phase 3",
                    "Actual\" Timing & Comments": "Utilize existing metrics to estimate remaining revenue",
                },
                {
                    "Legacy / Lookback": "Open active lawsuits value",
                    "Phase": "",
                    "Actual": "to develop @ Phase 3",
                    "Actual Timing & Comments": "Utilize existing metrics to estimate remaining revenue",
                    "Forward Flow": "Open active lawsuits value",
                    "Actual__1": "to develop @ Phase 3",
                    "Actual\" Timing & Comments": "Utilize existing metrics to estimate remaining revenue",
                }

            ],
            pr1box1: false,
            pr1box2: false,
            CashStartRow:0,
            CashEndRow:0,
            allText: '',
            customText: '',
            csvButton: true,
            pdfButton: false,
            opCheckboxChecked: false,
            sysCheckboxChecked: false,
            caCheckboxChecked: false,
            legCheckboxChecked: false,
            forCheckboxChecked: false,
            dropdownOpen: false,
            collapse1Open: false,
            collapse15pen: false,
            collapse2Open: false,
            collapse3Open: false,
            collapse4Open: false,
            collapse5Open: false,
            collapse6Open: false,
            sysCheckboxChecked1: true,
            sysCheckboxChecked2: true,
            sysCheckboxChecked3: true,
            sysCheckboxChecked4: true,
            sysCheckboxChecked5: true,
            legCheckboxChecked1: true,
            legCheckboxChecked2: true,
            forCheckboxChecked1: true,
            forCheckboxChecked2: true,
            forCheckboxChecked3: true,
            csvClicked: false,
            pdfClicked: false,
            submitClicked: false,
            value1: [1,3],
            value2: [1,4],
            value3: [1,18],
            value31: [1,2],
            value32: [1,58],
            value4: [1,11],
            value5: [1,10],
            value6: [1,4],
            value7: [1,10],
            value8: [1,4],
            value9: [1,3],
            pres1st: false,
            pres2st: false,
            alll: false,
            allCheckboxChecked: false,
            mainInputString: '',
            comebackk: '',
            cc1: '',
            cc2: '',
            cc3: '',
            cc4: '',
            ucc1: '',
            ucc2: '',
            ucc3: '',
            ucc4: '',
            avVisVal: '$2,814',
            historical: '21,796,446,166',
            historicalNumAcc: '7,746,057',
            avQIVal: '$4,575',
            primAnRes: '2.50%',
            elForInDisc: '50.00%',
            sucInDisc : '35.00%',
            scdPer : '5.00%',
            cdav: '$14,514',
            inputBox1: '',
            inputBox2: '',
            inputBox3: '',
            inputBox4: '',
            inputBox5: '',
            inputBox6: '',
            inputBox7: '',
            inputBox8: '',
            inputBox9: '',
            a1: '0',
            b1: '', b2: '', b3: '', b4: '', b5: '', b6: '', b7: '', b8: '', b9: '', b10: '', b11: '', b12: '', b13: '', b14: '', b15: '', b16: '',
            c1: '', c2: '', c3: '', c4: '', c5: '', c6: '', c7: '', c8: '', c9: '', c10: '', c11: '', c12: '', c13: '', c14: '', c15: '', c16: '',
            d1: '', d2: '', d3: '', d4: '', d5: '', d6: '', d7: '', d8: '', d9: '', d10: '', d11: '', d12: '', d13: '', d14: '', d15: '', d16: '',
            e1: '', e2: '', e3: '', e4: '', e5: '', e6: '', e7: '', e8: '', e9: '', e10: '', e11: '', e12: '', e13: '', e14: '', e15: '', e16: '',
            f1: '', f2: '', f3: '', f4: '', f5: '', f6: '', f7: '', f8: '', f9: '', f10: '', f11: '', f12: '', f13: '', f14: '', f15: '', f16: '',
            l1: '', l2: '', l3: '', l4: '', l5: '', l6: '', l7: '', l8: '', l9: '', l10: '', l11: '', l12: '', l13: '', l14: '', l15: '', l16: '',
            l17: '', l18: '', l19: '', l20: '', l21: '', l22: '', l23: '', l24: '', l25: '', l26: '', l27: '', l28: '', l29: '', l30: '', l31: '',
            l32: '', l33: '', l34: '', l35: '', l36: '', l37: '',
            w1: '', w2: '', w3: '', w4: '', w5: '', w6: '', w7: '', w8: '', w9: '', w10: '', w11: '', w12: '', w13: '', w14: '', w15: '', w16: '',
            w17: '', w18: '', w19: '', w20: '', w21: '', w22: '', w23: '', w24: '', w25: '', w26: '', w27: '', w28: '', w29: '', w30: '', w31: '',
            w32: '', w33: '', w34: '', w35: '', w36: '', w37: '',
            v1: '', v2: '', v3: '', v4: '', v5: '', v6: '', v7: '', v8: '', v9: '', v10: '', v11: '', v12: '', v13: '', v14: '', v15: '', v16: '', v17: '',
            g1: '', g2: '', g3: '', g4: '', g5: '', g6: '', g7: '', g8: '', g9: '', g10: '', g11: '', g12: '', g13: '', g14: '', g15: '', g16: '',
            h1: '', h2: '', h3: '', h4: '', h5: '', h6: '', h7: '', h8: '', h9: '', h10: '', h11: '', h12: '', h13: '', h14: '', h15: '', h16: '',
            i1: '', i2: '', i3: '', i4: '', i5: '', i6: '', i7: '', i8: '', i9: '', i10: '', i11: '', i12: '', i13: '', i14: '', i15: '', i16: '',
            j1: '', j2: '', j3: '', j4: '', j5: '', j6: '', j7: '', j8: '', j9: '', j10: '', j11: '', j12: '', j13: '', j14: '', j15: '', j16: '',
            k1: '', k2: '', k3: '', k4: '', k5: '', k6: '', k7: '', k8: '', k9: '', k10: '', k11: '', k12: '', k13: '', k14: '', k15: '', k16: '',
            kk1: '', kk2: '', kk3: '', kk4: '', kk5: '', kk6: '', kk7: '', kk8: '', kk9: '', kk10: '', kk11: '', kk12: '', kk13: '', kk14: '', kk15: '', kk16: '',

            clients: "Opportunity Assessment Calculator",
        };
        this.toggleCashBox = this.toggleCashBox.bind(this);
        this.toggleCSV = this.toggleCSV.bind(this);
        this.sysCheckbox = this.sysCheckbox.bind(this);
        this.sysCheckbox1 = this.sysCheckbox1.bind(this);
        this.sysCheckbox2 = this.sysCheckbox2.bind(this);
        this.sysCheckbox3 = this.sysCheckbox3.bind(this);
        this.sysCheckbox4 = this.sysCheckbox4.bind(this);
        this.sysCheckbox5 = this.sysCheckbox5.bind(this);
        this.opCheckbox = this.opCheckbox.bind(this);
        this.legCheckbox = this.legCheckbox.bind(this);
        this.legCheckbox1 = this.legCheckbox1.bind(this);
        this.legCheckbox2 = this.legCheckbox2.bind(this);
        this.forCheckbox = this.forCheckbox.bind(this);
        this.forCheckbox1 = this.forCheckbox1.bind(this);
        this.forCheckbox2 = this.forCheckbox2.bind(this);
        this.forCheckbox3 = this.forCheckbox3.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    nonEditRws(){
        return ["Average Account Value","Qualified Inventory (\"QI\") - account value (average)","Qualified Inventory (\"QI\") - count as a % all Legacy Data",
            "QI eligible for Verisk - as a percent of QI","Success / discovered rate - Verisk","Success / discovered rate - Courts",
            "Recovered 1st Party opportunities as a % of opportunity count","Recovered 1st Party opportunities as a % of opportunity value",
            "Recovered Pre-Lawsuit TPL opportunities as a % of opportunity count","Recovered Pre-Lawsuit TPL opportunities as a % of opportunity value",
            "Recovered Lawsuit TPL opportunities as a percentage of opportunity count","Recovered Lawsuit TPL opportunities as a percentage of opportunity value"
        ]
    }
    componentDidMount() {
        let te;
        let sel = this;
        let i;
        axios.get("http://localhost:4500/",{}).then(function (response) {
            let temp = handleMetricsOutput(response.data.metrics);
            sel.setState({metrics: temp});
            let ary = response.data.dat.split("|");
            for (i=0; i < ary.length; i++){

                if(i > 7 && i < 88){
                    ary[i] = Number.parseFloat(ary[i]);
                    ary[i] = ary[i].toFixed(2);
                    ary[i] = ary[i].toString();
                    ary[i] = numberWithCommas(ary[i]);
                }
                if (i===112 || i===117 ||  i===122 || i===124
                    || i===149 || i===154 || i===159 || i===161 || i===178){
                    ary[i] = Number.parseFloat(ary[i]);
                    ary[i] = ary[i]*100;
                    ary[i] = ary[i].toFixed(3);
                    ary[i] = ary[i].toString();
                    ary[i] = ary[i] + '%';
                }
                if(i > 87){
                    if(i !== 112 && i !== 117 && i !== 122 && i !== 124
                        && i !== 149 && i !== 154 && i !== 159 && i !== 161 && i !==178){
                        ary[i] = Number.parseFloat(ary[i]);
                        ary[i] = ary[i].toFixed(2);
                        ary[i] = ary[i].toString();
                        ary[i] = numberWithCommasSm(ary[i]);
                        let t = ary[i];
                        t = t.slice(-2);
                        if(t === "00"){
                            ary[i] = ary[i].substring(0, ary[i].length-3)
                        }
                    }
                }
                if (i===111 || i===116 ||  i===121 || i===123 || i===88
                    || i===91 || i===95 || i===98 || i===102 || i===104
                    || i===108 || i===113 || i===118 || i===90 || i===93
                    || i===100 || i===106 || i===110 || i===115 || i===120){
                    ary[i] = '$'+ ary[i];
                }
                if (i===148 || i===153 || i===158 || i===160 || i===125
                    || i===128 || i===132 || i===235 || i===139 || i===141
                    || i===145 || i===150 || i===155 || i===127 || i===130
                    || i===137 || i===143 || i===147 || i===152 || i===157 || i===162
                    || i===163 || i===166 || i===167 || i===168
                    || i===171 || i===172 || i===173 || i===174
                    || i===175 || i===176 || i===177    || i === ary.length-2 || i === ary.length-1){
                    ary[i] = '$'+ ary[i];
                }
            }
            sel.setState({rates:[
                    {   "vendor": "Verisk",
                        "rate": ary[ary.length-2]
                    },
                    {   "vendor": "Westlaw",
                        "rate": ary[ary.length-1]
                    },
                ],});
            sel.setState({cc1: ary[0]}); sel.setState({cc2: ary[1]});
            sel.setState({cc3: ary[2]}); sel.setState({cc4: ary[3]});
            sel.setState({ucc1: ary[4]}); sel.setState({ucc2: ary[5]});
            sel.setState({ucc3: ary[6]}); sel.setState({ucc4: ary[7]});
            sel.setState({b1: ary[8]}); sel.setState({b2: ary[9]});
            sel.setState({b3: ary[10]}); sel.setState({b4: ary[11]});
            sel.setState({b5: ary[12]}); sel.setState({b6: ary[13]});
            sel.setState({b7: ary[14]}); sel.setState({b8: ary[15]});
            sel.setState({b9: ary[16]}); sel.setState({b10: ary[17]});
            sel.setState({b11: ary[18]}); sel.setState({b12: ary[19]});
            sel.setState({b13: ary[20]}); sel.setState({b14: ary[21]});
            sel.setState({b15: ary[22]}); sel.setState({b16: ary[23]});
            sel.setState({c1: ary[24]}); sel.setState({c2: ary[25]});
            sel.setState({c3: ary[26]}); sel.setState({c4: ary[27]});
            sel.setState({c5: ary[28]}); sel.setState({c6: ary[29]});
            sel.setState({c7: ary[30]}); sel.setState({c8: ary[31]});
            sel.setState({c9: ary[32]}); sel.setState({c10: ary[33]});
            sel.setState({c11: ary[34]}); sel.setState({c12: ary[35]});
            sel.setState({c13: ary[36]}); sel.setState({c14: ary[37]});
            sel.setState({c15: ary[38]}); sel.setState({c16: ary[39]});
            sel.setState({d1: ary[40]}); sel.setState({d2: ary[41]});
            sel.setState({d3: ary[42]}); sel.setState({d4: ary[43]});
            sel.setState({d5: ary[44]}); sel.setState({d6: ary[45]});
            sel.setState({d7: ary[46]}); sel.setState({d8: ary[47]});
            sel.setState({d9: ary[48]}); sel.setState({d10: ary[49]});
            sel.setState({d11: ary[50]}); sel.setState({d12: ary[51]});
            sel.setState({d13: ary[52]}); sel.setState({d14: ary[53]});
            sel.setState({d15: ary[54]}); sel.setState({d16: ary[55]});
            sel.setState({e1: ary[56]}); sel.setState({e2: ary[57]});
            sel.setState({e3: ary[58]}); sel.setState({e4: ary[59]});
            sel.setState({e5: ary[60]}); sel.setState({e6: ary[61]});
            sel.setState({e7: ary[62]}); sel.setState({e8: ary[63]});
            sel.setState({e9: ary[64]}); sel.setState({e10: ary[65]});
            sel.setState({e11: ary[66]}); sel.setState({e12: ary[67]});
            sel.setState({e13: ary[68]}); sel.setState({e14: ary[69]});
            sel.setState({e15: ary[70]}); sel.setState({e16: ary[71]});
            sel.setState({f1: ary[72]}); sel.setState({f2: ary[73]});
            sel.setState({f3: ary[74]}); sel.setState({f4: ary[75]});
            sel.setState({f5: ary[76]}); sel.setState({f6: ary[77]});
            sel.setState({f7: ary[78]}); sel.setState({f8: ary[79]});
            sel.setState({f9: ary[80]}); sel.setState({f10: ary[81]});
            sel.setState({f11: ary[82]}); sel.setState({f12: ary[83]});
            sel.setState({f13: ary[84]}); sel.setState({f14: ary[85]});
            sel.setState({f15: ary[86]}); sel.setState({f16: ary[87]});
            sel.setState({l1: ary[88]}); sel.setState({l2: ary[89]});
            sel.setState({l3: ary[90]}); sel.setState({l4: ary[91]});
            sel.setState({l5: ary[92]}); sel.setState({l6: ary[93]});
            sel.setState({l7: ary[94]}); sel.setState({l8: ary[95]});
            sel.setState({l9: ary[96]}); sel.setState({l10: ary[97]});
            sel.setState({l11: ary[98]}); sel.setState({l12: ary[99]});
            sel.setState({l13: ary[100]}); sel.setState({l14: ary[101]});
            sel.setState({l15: ary[102]}); sel.setState({l16: ary[103]});
            sel.setState({l17: ary[104]}); sel.setState({l18: ary[105]});
            sel.setState({l19: ary[106]}); sel.setState({l20: ary[107]});
            sel.setState({l21: ary[108]}); sel.setState({l22: ary[109]});
            sel.setState({l23: ary[110]}); sel.setState({l24: ary[111]});
            sel.setState({l25: ary[112]}); sel.setState({l26: ary[113]});
            sel.setState({l27: ary[114]}); sel.setState({l28: ary[115]});
            sel.setState({l29: ary[116]}); sel.setState({l30: ary[117]});
            sel.setState({l31: ary[118]}); sel.setState({l32: ary[119]});
            sel.setState({l33: ary[120]}); sel.setState({l34: ary[121]});
            sel.setState({l35: ary[122]}); sel.setState({l36: ary[123]});
            sel.setState({l37: ary[124]});
            sel.setState({w1: ary[125]}); sel.setState({w2: ary[126]});
            sel.setState({w3: ary[127]}); sel.setState({w4: ary[128]});
            sel.setState({w5: ary[129]}); sel.setState({w6: ary[130]});
            sel.setState({w7: ary[131]}); sel.setState({w8: ary[132]});
            sel.setState({w9: ary[133]}); sel.setState({w10: ary[134]});
            sel.setState({w11: ary[135]}); sel.setState({w12: ary[136]});
            sel.setState({w13: ary[137]}); sel.setState({w14: ary[138]});
            sel.setState({w15: ary[139]}); sel.setState({w16: ary[140]});
            sel.setState({w17: ary[141]}); sel.setState({w18: ary[142]});
            sel.setState({w19: ary[143]}); sel.setState({w20: ary[144]});
            sel.setState({w21: ary[145]}); sel.setState({w22: ary[146]});
            sel.setState({w23: ary[147]}); sel.setState({w24: ary[148]});
            sel.setState({w25: ary[149]}); sel.setState({w26: ary[150]});
            sel.setState({w27: ary[151]}); sel.setState({w28: ary[152]});
            sel.setState({w29: ary[153]}); sel.setState({w30: ary[154]});
            sel.setState({w31: ary[155]}); sel.setState({w32: ary[156]});
            sel.setState({w33: ary[157]}); sel.setState({w34: ary[158]});
            sel.setState({w35: ary[159]}); sel.setState({w36: ary[160]});
            sel.setState({w37: ary[161]});
            sel.setState({v1: ary[162]});
            sel.setState({v2: ary[163]});
            sel.setState({v3: ary[164]});
            sel.setState({v4: ary[165]});
            sel.setState({v5: ary[166]});
            sel.setState({v6: ary[167]});
            sel.setState({v7: ary[168]});
            sel.setState({v8: ary[169]});
            sel.setState({v9: ary[170]});
            sel.setState({v10: ary[171]});
            sel.setState({v11: ary[172]});
            sel.setState({v12: ary[173]});
            sel.setState({v13: ary[174]});
            sel.setState({v14: ary[175]});
            sel.setState({v15: ary[176]});
            sel.setState({v16: ary[177]});
            sel.setState({v17: ary[178]});
            sel.setState({g1: ary[179]});
            sel.setState({g2: ary[180]});
            sel.setState({g3: ary[181]});
            sel.setState({g4: ary[182]});
            sel.setState({g5: ary[183]});
            sel.setState({g6: ary[184]});
            sel.setState({g7: ary[185]});
            sel.setState({g8: ary[186]});
            sel.setState({g9: ary[187]});
            sel.setState({g10: ary[188]});
            sel.setState({g11: ary[189]});
            sel.setState({g12: ary[190]});
            sel.setState({g13: ary[191]});
            sel.setState({g14: ary[192]});
            sel.setState({g15: ary[193]});
            sel.setState({g16: ary[194]});
            sel.setState({h1: ary[195]});
            sel.setState({h2: ary[196]});
            sel.setState({h3: ary[197]});
            sel.setState({h4: ary[198]});
            sel.setState({h5: ary[199]});
            sel.setState({h6: ary[200]});
            sel.setState({h7: ary[201]});
            sel.setState({h8: ary[202]});
            sel.setState({h9: ary[203]});
            sel.setState({h10: ary[204]});
            sel.setState({h11: ary[205]});
            sel.setState({h12: ary[206]});
            sel.setState({h13: ary[207]});
            sel.setState({h14: ary[208]});
            sel.setState({h15: ary[209]});
            sel.setState({h16: ary[210]});
            sel.setState({i1: ary[211]});
            sel.setState({i2: ary[212]});
            sel.setState({i3: ary[213]});
            sel.setState({i4: ary[214]});
            sel.setState({i5: ary[215]});
            sel.setState({i6: ary[216]});
            sel.setState({i7: ary[217]});
            sel.setState({i8: ary[218]});
            sel.setState({i9: ary[219]});
            sel.setState({i10: ary[220]});
            sel.setState({i11: ary[221]});
            sel.setState({i12: ary[222]});
            sel.setState({i13: ary[223]});
            sel.setState({i14: ary[224]});
            sel.setState({i15: ary[225]});
            sel.setState({i16: ary[226]});
            sel.setState({j1: ary[227]});
            sel.setState({j2: ary[228]});
            sel.setState({j3: ary[229]});
            sel.setState({j4: ary[230]});
            sel.setState({j5: ary[231]});
            sel.setState({j6: ary[232]});
            sel.setState({j7: ary[233]});
            sel.setState({j8: ary[234]});
            sel.setState({j9: ary[235]});
            sel.setState({j10: ary[236]});
            sel.setState({j11: ary[237]});
            sel.setState({j12: ary[238]});
            sel.setState({j13: ary[239]});
            sel.setState({j14: ary[240]});
            sel.setState({j15: ary[241]});
            sel.setState({j16: ary[242]});
            sel.setState({k1: ary[243]});
            sel.setState({k2: ary[244]});
            sel.setState({k3: ary[245]});
            sel.setState({k4: ary[246]});
            sel.setState({k5: ary[247]});
            sel.setState({k6: ary[248]});
            sel.setState({k7: ary[249]});
            sel.setState({k8: ary[250]});
            sel.setState({k9: ary[251]});
            sel.setState({k10: ary[252]});
            sel.setState({k11: ary[253]});
            sel.setState({k12: ary[254]});
            sel.setState({k13: ary[255]});
            sel.setState({k14: ary[256]});
            sel.setState({k15: ary[257]});
            sel.setState({k16: ary[258]});
            sel.setState({kk1: ary[259]});
            sel.setState({kk2: ary[260]});
            sel.setState({kk3: ary[261]});
            sel.setState({kk4: ary[262]});
            sel.setState({kk5: ary[263]});
            sel.setState({kk6: ary[264]});
            sel.setState({kk7: ary[265]});
            sel.setState({kk8: ary[266]});
            sel.setState({kk9: ary[267]});
            sel.setState({kk10: ary[268]});
            sel.setState({kk11: ary[269]});
            sel.setState({kk12: ary[270]});
            sel.setState({kk13: ary[271]});
            sel.setState({kk14: ary[272]});
            sel.setState({kk15: ary[273]});
            sel.setState({kk16: ary[274]});
        }).catch(function (error) {
            console.log(error);
        });
    }
    allCheckbox = (ev) => {
        if(ev.target.checked){
            this.setState( {allCheckboxChecked: true,
                    caCheckboxChecked: true,
                    opCheckboxChecked: true,
                    sysCheckboxChecked: true,
                    sysCheckboxChecked1: true,
                    sysCheckboxChecked2: true,
                    sysCheckboxChecked3: true,
                    sysCheckboxChecked4: true,
                    sysCheckboxChecked5: true,
                    legCheckboxChecked: true,
                    legCheckboxChecked1: true,
                    legCheckboxChecked2: true,
                    forCheckboxChecked: true,
                    forCheckboxChecked1: true,
                    forCheckboxChecked2: true,
                    forCheckboxChecked3: true,
                    collapse1Open: true,
                    collapse2Open: true,
                    collapse3Open: true,
                    collapse4Open: true,
                    collapse5Open: true,
                    collapse6Open: true,
                    value1: [1,3],
                    value2: [1,4],
                    value3: [1,18],
                    value31: [1,2],
                    value32: [1,58],
                    value4: [1,11],
                    value5: [1,10],
                    value6: [1,4],
                    value7: [1,10],
                    value8: [1,4],
                    value9: [1,3],
                }
            );
        }else {
            this.setState({
                allCheckboxChecked: false,
                caCheckboxChecked: false,
                opCheckboxChecked: false,
                sysCheckboxChecked: false,
                legCheckboxChecked: false,
                forCheckboxChecked: false,
                collapse1Open: false,
                collapse2Open: false,
                collapse3Open: false,
                collapse4Open: false,
                collapse5Open: false,
                collapse6Open: false}
            );
        }
    }
    toggleCashBox = (ev) => {
        this.setState({caCheckboxChecked: ev.target.checked});
        this.setState({collapse4Open: ev.target.checked});
        if (ev.target.checked === false){
            this.setState({allCheckboxChecked: false});
        }
    }
    toggleCSV = (ev) => {
        this.setState({csvButton: ev.target.checked});
    }
    opCheckbox = (ev) => {
        this.setState({opCheckboxChecked: ev.target.checked});
        if (ev.target.checked === false){
            this.setState({allCheckboxChecked: false});
        }
    }
    sysCheckbox = (ev) => {
        this.setState({sysCheckboxChecked: ev.target.checked});
        this.setState({collapse3Open: ev.target.checked});
        if (ev.target.checked === false){
            this.setState({allCheckboxChecked: false});
        }
    }
    sysCheckbox1 = (ev) => {
        this.setState({sysCheckboxChecked1: ev.target.checked});
        if (ev.target.checked === false){
            this.setState({allCheckboxChecked: false});
        }
    }
    sysCheckbox2 = (ev) => {
        this.setState({sysCheckboxChecked2: ev.target.checked});
        if (ev.target.checked === false){
            this.setState({allCheckboxChecked: false});
        }
    }
    sysCheckbox3 = (ev) => {
        this.setState({sysCheckboxChecked3: ev.target.checked});
        if (ev.target.checked === false){
            this.setState({allCheckboxChecked: false});
        }
    }
    sysCheckbox4 = (ev) => {
        this.setState({sysCheckboxChecked4: ev.target.checked});
        if (ev.target.checked === false){
            this.setState({allCheckboxChecked: false});
        }
    }
    sysCheckbox5 = (ev) => {
        this.setState({sysCheckboxChecked5: ev.target.checked});
        if (ev.target.checked === false){
            this.setState({allCheckboxChecked: false});
        }
    }
    legCheckbox = (ev) => {
        this.setState({legCheckboxChecked: ev.target.checked});
        this.setState({collapse5Open: ev.target.checked});
        if (ev.target.checked === false){
            this.setState({allCheckboxChecked: false});
        }
    }
    legCheckbox1 = (ev) => {
        this.setState({legCheckboxChecked1: ev.target.checked});
        if (ev.target.checked === false){
            this.setState({allCheckboxChecked: false});
        }
    }
    legCheckbox2 = (ev) => {
        this.setState({legCheckboxChecked2: ev.target.checked});
        if (ev.target.checked === false){
            this.setState({allCheckboxChecked: false});
        }
    }
    forCheckbox = (ev) => {
        this.setState({forCheckboxChecked: ev.target.checked});
        this.setState({collapse6Open: ev.target.checked});
        if (ev.target.checked === false){
            this.setState({allCheckboxChecked: false});
        }
    }
    forCheckbox1 = (ev) => {
        this.setState({forCheckboxChecked1: ev.target.checked});
        if (ev.target.checked === false){
            this.setState({allCheckboxChecked: false});
        }
    }
    forCheckbox2 = (ev) => {
        this.setState({forCheckboxChecked2: ev.target.checked});
        if (ev.target.checked === false){
            this.setState({allCheckboxChecked: false});
        }
    }
    forCheckbox3 = (ev) => {
        this.setState({forCheckboxChecked3: ev.target.checked});
        if (ev.target.checked === false){
            this.setState({allCheckboxChecked: false});
        }
    }
    value1(v1){
        this.setState({value1: v1});
    }
    value2(v1){
        this.setState({value2: v1});
    }
    value3(v1){
        this.setState({value3: v1});
    }
    value31(v1){
        this.setState({value31: v1});
    }
    value32(v1){
        this.setState({value32: v1});
    }
    value4(v1){
        this.setState({value4: v1});
    }
    value5(v1){
        this.setState({value5: v1});
    }
    value6(v1){
        this.setState({value6: v1});
    }
    value7(v1){
        this.setState({value7: v1});
    }
    value8 (v1){
        this.setState({value8: v1});
    }
    value9 (v1){
        this.setState({value9: v1});
    }
    pres1 = (ev) => {
        this.setState({pres1st: ev.target.checked});

    }
    pres2 = (ev) => {
        this.setState({pres2st: ev.target.checked})
    }
    render() {
        return (
            <div className="client1App">
                {this.saveButton()}
            </div>
        )
    }
    saveButton(){
        const toggle1 = () => {
            const current = this.state.dropdownOpen;
            this.setState({dropdownOpen: !current});

        };
        const togglePDF = () => {
            const current8 = this.state.pdfClicked;
            this.setState({pdfClicked: true});
            this.setState({csvClicked: false});
        }
        const toggleSubmit = () => {
            const { Parser } = require('json2csv');
            const json2csvParser = new Parser({ delimiter: ';' });
            const metricsCSV = json2csvParser.parse(this.state.metrics);
            let sep = 'sep=;\n';
            let opAssData = 'Quarterly Client Data;Estimated Legacy Recovery;Legacy Data - Verisk Count; Legacy Data - West Law Count; ' +
                'One Time (Legacy) Verisk Cost;One Time (Legacy) Westlaw Cost;One Time Total Legacy Data Cost;Qtrly Forward Flow Accts - Verisk;' +
                'Qtrly Forward Flow Accts - Westlaw;Quarterly Forward Flow - Verisk Cost; Quarterly Forward Flow - Westlaw Cost; ' +
                'Verisk and Westlaw Forward Flow Quarterly Cost; Quarterly - Client Potential Recovery;' + 'Overall - Client Potential Recovery;' +
                'Total UCC & CC Charges; Discover Claims EBITDA Return;Discover Claims EBITDA Return %' + '\n' +
                this.state.v1 + ';' + this.state.v2 + ';' + this.state.v3 + ';' + this.state.v4 + ';' + this.state.v5 + ';' + this.state.v6 + ';' + this.state.v7 +
                ';' + this.state.v8 + ';' + this.state.v9 + ';' + this.state.v10 + ';' + this.state.v11 + ';' + this.state.v12 + ';' +
                this.state.v13 + ';' + this.state.v14 + ';' + this.state.v15 + ';' + this.state.v16 + ';' + this.state.v17 +'\n'+'\n';
            let sysData = ';2019 Billed Charges;Estimated Annual;Estimated Legacy;Estimated Quarterly Value\nCC Charges;'+'$91,200,000'+';'+'$91,200,000'+';'+'$736,700,000'+';'+'$22,800,000\n'
                +'UCC Charges;'+'$87,800,000'+';'+'$87,800,000'+';'+'$305,400,000'+';'+'$21,950,000\n'
                +'Total;'+ '$179,000,000'+';'+'$179,000,000'+';'+'$1,042,100,000'+';'+'$44,750,000\n\n'+
                'Year;2016;2017;2018;2019;Total\nCharity Charges;$432,000,000;$105,000,000;$108,500,000;$91,200,000;$736,700,000\nUCC - Non-Medicare & Non-Reimbursable Bad Debt Costs;$16,000,000;$16,500,000;$21,900,000;$21,950,000;$76,350,000' +
                '\nUCC Charges;$64,000,000;$66,000,000;$87,600,000;$87,800,000;$305,400,000\nTotal;;;;$179,000,000;$1,042,100,000\n\n'+'Client Values;Legacy Accounts;Quarterly Forward Flow;Phase\n'+
                'Client\'s Pursuable value;'+this.state.l1+';'+this.state.l4+';'+'Phase I\n'+'Number of Pursuable accounts;'+this.state.l2+';'+this.state.w2+';Phase I\n'+'Average Visit Value (calculated from above);'+
                this.state.w3+';'+this.state.w3+';Phase I\n'+'Average QI Value;'+this.state.w6+';'+this.state.w6+';Phase I\n'+'Actual Qualified Inventory;'+this.state.metrics[6].Actual+';'+this.state.metrics[6].Actual__1+';'+
                'Phase I\n'+'Eligible for Insurance Discovery;'+this.state.metrics[9].Actual+';'+this.state.metrics[9].Actual__1+';'+'Phase I\n'+ 'Courthouse Discovery Average Value;'+this.state.metrics[23].Actual+';'+
                this.state.metrics[23].Actual__1+';Phase II\n'+'Successful Insurance Discoveries;'+this.state.metrics[16].Actual+';'+this.state.metrics[16].Actual__1+';Phase II\n'+'Successful Courthouse Discoveries;'+
                this.state.metrics[24].Actual+';'+this.state.metrics[24].Actual__1+';Phase II\n'+'Verisk 1st Party Find Rate;50%;50%;Phase II\nVerisk Pre-Lawsuit Find Rate (TPL);50%;50%;Phase II\n'+
                'Approval (for accounts needing approval);90%;90%;Phase II\nRecovery Success Rate 1st party count;61%;61%;Phase III\nRecovery Success Rate Pre-Lawsuit TPL count;61%;61%;Phase III\n'+
                'Recovery Success Rate Lawsuit TPL count;61%;61%;Phase III\nRecovery Success Rate 1st party value;35%;35%;Phase III\nRecovery Success Rate Pre-Lawsuit TPL value;35%;35%;Phase III\n'+
                'Recovery Success Rate Lawsuit TPL value;35%;35%;Phase III\n\n'+'Verisk Rate;'+this.state.rates[0].rate+'\nWestlaw Rate;'+this.state.rates[1].rate+'\n\n'+metricsCSV+'\n\n';
            let cashData = 'Assuming Legacy Data Received 12/30/20;Quarter Ending March 21;Quarter Ending June 21;Quarter Ending September 21;Quarter Ending December 21;Year Ending December 21;Quarter Ending March 22;Quarter Ending June 22;'+
                'Quarter Ending  September 22;Quarter Ending December 22;Year Ending December 22;Quarter Ending March 23;Quarter Ending June 23;Quarter Ending September 23;Quarter Ending December 23;Year Ending December 23;Total Through December 23\n'+
                'Bills;'+this.state.b1+';'+this.state.b2+';'+this.state.b3+';'+this.state.b4+';'+this.state.b5+';'+this.state.b6+';'+this.state.b7+';'+this.state.b8+';'+this.state.b9+';'+this.state.b10+';'+this.state.b11+';'+this.state.b12+';'+this.state.b13+';'
                +this.state.b14+';'+this.state.b15+';'+this.state.b16+'\n'+'Liens;'+this.state.c1+';'+this.state.c2+';'+this.state.c3+';'+this.state.c4+';'+this.state.c5+';'+this.state.c6+';'+this.state.c7+';'+this.state.c8+';'+this.state.c9+';'+this.state.c10+';'
                +this.state.c11+';'+this.state.c12+';'+this.state.c13+';'+this.state.c14+';'+this.state.c15+';'+this.state.c16+'\n'+'Lawsuits;'+this.state.d1+';'+this.state.d2+';'+this.state.d3+';'+this.state.d4+';'+this.state.d5+';'+this.state.d6+';'+this.state.d7+';'
                +this.state.d8+';'+this.state.d9+';'+this.state.d10+';'+this.state.d11+';'+this.state.d12+';'+this.state.d13+';'+this.state.d14+';'+this.state.d15+';'+this.state.d16+'\n'+'Total;'+this.state.e1+';'+this.state.e2+';'+this.state.e3+';'+this.state.e4+';'
                +this.state.e5+';'+this.state.e6+';'+this.state.e7+';'+this.state.e8+';'+this.state.e9+';'+this.state.e10+';'+this.state.e11+';'+this.state.e12+';'+this.state.e13+';'+this.state.e14+';'+this.state.e15+';'+this.state.e16+'\n'+'Net to Client 65%;'+
                this.state.f1+';'+this.state.f2+';'+this.state.f3+';'+this.state.f4+';'+this.state.f5+';'+this.state.f6+';'+this.state.f7+';'+this.state.f8+';'+this.state.f9+';'+this.state.f10+';'+this.state.f11+';'+this.state.f12+';'+this.state.f13+';'+this.state.f14+';'
                +this.state.f15+';'+this.state.f16+'\n'+'Discover Gross;'+this.state.g1+';'+this.state.g2+';'+this.state.g3+';'+this.state.g4+';'+this.state.g5+';'+this.state.g6+';'+this.state.g7+';'+this.state.g8+';'+this.state.g9+';'+this.state.g10+';'+this.state.g11+';'
                +this.state.g12+';'+this.state.g13+';'+this.state.g14+';'+this.state.g15+';'+this.state.g16+'\n'+'Processing Fee @10%;'+this.state.h1+';'+this.state.h2+';'+this.state.h3+';'+this.state.h4+';'+this.state.h5+';'+this.state.h6+';'+this.state.h7+';'
                +this.state.h8+';'+this.state.h9+';'+this.state.h10+';'+this.state.h11+';'+this.state.h12+';'+this.state.h13+';'+this.state.h14+';'+this.state.h15+';'+this.state.h16+'\n'+'Agent Fee @ 6% of DC Net;'+this.state.i1+';'+this.state.i2+';'+this.state.i3+';'
                +this.state.i4+';'+this.state.i5+';'+this.state.i6+';'+this.state.i7+';'+this.state.i8+';'+this.state.i9+';'+this.state.i10+';'+this.state.i11+';'+this.state.i12+';'+this.state.i13+';'+this.state.i14+';'+this.state.i15+';'+this.state.i16+'\n'+
                'Data Cost;'+this.state.j1+';'+this.state.j2+';'+this.state.j3+';'+this.state.j4+';'+this.state.j5+';'+this.state.j6+';'+this.state.j7+';'+this.state.j8+';'+this.state.j9+';'+this.state.j10+';'+this.state.j11+';'+this.state.j12+';'+this.state.j13+';'
                +this.state.j14+';'+this.state.j15+';'+this.state.j16+'\n'+'Total Cost;;'+this.state.k2+';'+this.state.k3+';'+this.state.k4+';'+this.state.k5+';'+this.state.k6+';'+this.state.k7+';'+this.state.k8+';'+this.state.k9+';'+this.state.k10+';'+this.state.k11+';'
                +this.state.k12+';'+this.state.k13+';'+this.state.k14+';'+this.state.k15+';'+this.state.k16+'\n'+'Discover Claims EBITDA Return;'+this.state.kk1+';'+this.state.kk2+';'+this.state.kk3+';'+this.state.kk4+';'+this.state.kk5+';'+this.state.kk6+';'+this.state.kk7+';'
                +this.state.kk8+';'+this.state.kk9+';'+this.state.kk10+';'+this.state.kk11+';'+this.state.kk12+';'+this.state.kk13+';'+this.state.kk14+';'+this.state.kk15+';'+this.state.kk16+'\n\n';
            let legData = 'Stage;Total Billed Charges Charity;Number of Patient Accounts;Average Value;As a % of Previous Stage;Cash Recovery;% of Total UCC\n'+'No Patient Contact or TPL Insurance Found;'+this.state.l1+';'+this.state.l2+';'+this.state.l3+';;;100%\n'+
                'Qualified Inventory \"QI\";'+this.state.l4+';'+this.state.l5+';'+this.state.l6+';'+this.state.metrics[6].Actual+';;\n'+'Eligible for Insurance Discovery;'+this.state.l8+';'+this.state.l9+';;'+this.state.metrics[9].Actual+';;;\n'+'Successful Insurance Discoveries;'+
                this.state.l11+';'+this.state.l12+';'+this.state.l13+';'+this.state.metrics[16].Actual+ ';;;\n'+'Eligible for Courthouse Discovery;'+this.state.l15+';'+this.state.l16+';;Calculation;;;\n'+'Successful Courthouse Discoveries;'+this.state.l17+';'+this.state.l18+';'+this.state.l19+';' + this.state.metrics[24].Actual +';;;\n'
                +'Bills - 1st Party Insurance Claims (Insurance Discoveries);'+this.state.l21+';'+this.state.l22+';'+this.state.l23+';'+'Recovered Value @ 35% of billed charges;'+this.state.l24+';'+this.state.l25+'\n'+'Liens - 3rd Party Claims & Lawsuits (Insurance Discoveries);'
                +this.state.l26+';'+this.state.l27+';'+this.state.l28+';'+'Recovered Value @ 35% of billed charges;'+this.state.l29+';'+this.state.l30+'\n'+'Liens - Lawsuit (Courthouse Discoveries);'+this.state.l31+';'+this.state.l32+';'+this.state.l33+';'+
                'Recovered Value @ 35% of billed charges;'+this.state.l34+';'+this.state.l35+'\n'+';;;;Total Recovery;'+this.state.l36+';'+this.state.l37+'\n\nRecovery Period Lawsuit Liens;Recovery Period Claims Liens;Recovery Period Claim Bills;\nLawsuit Liens year 1 - 50%;'+
                'Claims Liens year 1 - 50%;Claim Bills year 1 - 90%\nLawsuit Liens year 2 - 25%;Claims Liens year 2 - 42%;Claim Bills year 2 - 10%\nLawsuit Liens year 3 - 20%;Claims Liens year 3 - 8%;0%;\nLawsuit Liens year 3+ - 5%;0%;0%;\n\n'
            let forData = 'Stage;Total Billed Charges Charity;Number of Patient Accounts;Average Value;As a % of Previous Stage;Cash Recovery;% of Total UCC\n'+'No Patient Contact or TPL Insurance Found;'+this.state.w1+';'+this.state.w2+';'+this.state.w3+';;;100%\n'+
                'Qualified Inventory \"QI\";'+this.state.w4+';'+this.state.w5+';'+this.state.w6+';'+this.state.metrics[6].Actual__1+';;2.50%\n'+'Eligible for Insurance Discovery;'+this.state.w8+';'+this.state.w9+';;'+this.state.metrics[9].Actual__1+';;;\n'+'Successful Insurance Discoveries;'+
                this.state.w11+';'+this.state.w12+';'+this.state.w13+';'+this.state.metrics[16].Actual__1+';;;\n'+'Eligible for Courthouse Discovery;'+this.state.w15+';'+this.state.w16+';;Calculation;;;\n'+'Successful Courthouse Discoveries;'+this.state.w17+';'+this.state.w18+';'+this.state.w19+';'+this.state.metrics[24].Actual__1+';;;\n'
                +'Bills - 1st Party Insurance Claims (Insurance Discoveries);'+this.state.w21+';'+this.state.w22+';'+this.state.w23+';'+'Recovered Value @ 35% of billed charges;'+this.state.w24+';'+this.state.w25+'\n'+'Liens - 3rd Party Claims & Lawsuits (Insurance Discoveries);'
                +this.state.w26+';'+this.state.w27+';'+this.state.w28+';'+'Recovered Value @ 35% of billed charges;'+this.state.w29+';'+this.state.w30+'\n'+'Liens - Lawsuit (Courthouse Discoveries);'+this.state.w31+';'+this.state.w32+';'+this.state.w33+';'+
                'Recovered Value @ 35% of billed charges;'+this.state.w34+';'+this.state.w35+'\n'+';;;;Total Recovery;'+this.state.w36+';'+this.state.w37+'\n\n'+'Recovery Period Lawsuit Liens;Recovery Period Claims Liens;Recovery Period Claim Bills\n'+
                'Lawsuit Liens year 1 - 50%;Claims Liens year 1 - 50%;Claim Bills year 1 - 90%\nLawsuit Liens year 2 - 25%;Claims Liens year 2 - 42%;Claim Bills year 2 - 10%\nLawsuit Liens year 3 - 20%;Claims Liens year 3 - 8%;0%\n'+
                'Lawsuit Liens year 3+ - 5%;0%;0%;\n\n'+'Quarter 1;Quarter 2;Quarter 3;Quarter 4;Year 1;Quarter 5;Quarter 6;Quarter 7;Quarter 8;Year 2;Quarter 9;Quarter 10;Quarter 11;Quarter 12;Year 3;Year 3+ Remaining\n'+'Recovery Period Claim Bills;0.000%;'+
                '27.000%;29.700%;33.300%;90.000%;2.800%;2.700%;2.700%;1.800%;10.000%;0.000%;0.000%;0.000%;0.000%;0.000%;0.000%\nRecovery Period Claim Liens;0.000%;12.500%;15.000%;22.500%;50.000%;21.250%;14.500%;3.750%;2.500%;42.000%;2.100%;2.100%;2.100%;'+
                '1.700%;8.000%;0.000%\nRecovery Period Lawsuit Liens;0.000%;12.500%;15.000%;22.500%;50.000%;8.250%;8.250%;4.500%;4.000%;25.000%;5.000%;5.000%;5.000%;5.000%;20.000%;5.000%\n\n';
            let cashHeader = 'Assuming Legacy Data Received 12/30/20;Quarter Ending March 21;Quarter Ending June 21;Quarter Ending September 21;Quarter Ending December 21;Year Ending December 21;Quarter Ending March 22;Quarter Ending June 22;'+
                'Quarter Ending  September 22;Quarter Ending December 22;Year Ending December 22;Quarter Ending March 23;Quarter Ending June 23;Quarter Ending September 23;Quarter Ending December 23;Year Ending December 23;Total Through December 23\n';
            let cashRow1 = 'Bills;'+this.state.b1+';'+this.state.b2+';'+this.state.b3+';'+this.state.b4+';'+this.state.b5+';'+this.state.b6+';'+this.state.b7+';'+this.state.b8+';'+this.state.b9+';'+this.state.b10+';'+this.state.b11+';'+this.state.b12+';'+this.state.b13+';'
                +this.state.b14+';'+this.state.b15+';'+this.state.b16+'\n';
            let cashRow2 = 'Liens;'+this.state.c1+';'+this.state.c2+';'+this.state.c3+';'+this.state.c4+';'+this.state.c5+';'+this.state.c6+';'+this.state.c7+';'+this.state.c8+';'+this.state.c9+';'+this.state.c10+';'
                +this.state.c11+';'+this.state.c12+';'+this.state.c13+';'+this.state.c14+';'+this.state.c15+';'+this.state.c16+'\n';
            let cashRow3 = 'Lawsuits;'+this.state.d1+';'+this.state.d2+';'+this.state.d3+';'+this.state.d4+';'+this.state.d5+';'+this.state.d6+';'+this.state.d7+';'
                +this.state.d8+';'+this.state.d9+';'+this.state.d10+';'+this.state.d11+';'+this.state.d12+';'+this.state.d13+';'+this.state.d14+';'+this.state.d15+';'+this.state.d16+'\n';
            let cashRow4 = 'Total;'+this.state.e1+';'+this.state.e2+';'+this.state.e3+';'+this.state.e4+';'
                +this.state.e5+';'+this.state.e6+';'+this.state.e7+';'+this.state.e8+';'+this.state.e9+';'+this.state.e10+';'+this.state.e11+';'+this.state.e12+';'+this.state.e13+';'+this.state.e14+';'+this.state.e15+';'+this.state.e16+'\n';
            let cashRow5 = 'Net to Client 65%;'+ this.state.f1+';'+this.state.f2+';'+this.state.f3+';'+this.state.f4+';'+this.state.f5+';'+this.state.f6+';'+this.state.f7+';'+this.state.f8+';'+this.state.f9+';'+this.state.f10+';'+this.state.f11+';'+this.state.f12+';'+this.state.f13+';'+this.state.f14+';'
                +this.state.f15+';'+this.state.f16+'\n';
            let cashRow6 = 'Discover Gross;'+this.state.g1+';'+this.state.g2+';'+this.state.g3+';'+this.state.g4+';'+this.state.g5+';'+this.state.g6+';'+this.state.g7+';'+this.state.g8+';'+this.state.g9+';'+this.state.g10+';'+this.state.g11+';'
                +this.state.g12+';'+this.state.g13+';'+this.state.g14+';'+this.state.g15+';'+this.state.g16+'\n';
            let cashRow7 = 'Processing Fee @10%;'+this.state.h1+';'+this.state.h2+';'+this.state.h3+';'+this.state.h4+';'+this.state.h5+';'+this.state.h6+';'+this.state.h7+';'
                +this.state.h8+';'+this.state.h9+';'+this.state.h10+';'+this.state.h11+';'+this.state.h12+';'+this.state.h13+';'+this.state.h14+';'+this.state.h15+';'+this.state.h16+'\n';
            let cashRow8 = 'Agent Fee @ 6% of DC Net;'+this.state.i1+';'+this.state.i2+';'+this.state.i3+';'
                +this.state.i4+';'+this.state.i5+';'+this.state.i6+';'+this.state.i7+';'+this.state.i8+';'+this.state.i9+';'+this.state.i10+';'+this.state.i11+';'+this.state.i12+';'+this.state.i13+';'+this.state.i14+';'+this.state.i15+';'+this.state.i16+'\n';
            let cashRow9 = 'Data Cost;'+this.state.j1+';'+this.state.j2+';'+this.state.j3+';'+this.state.j4+';'+this.state.j5+';'+this.state.j6+';'+this.state.j7+';'+this.state.j8+';'+this.state.j9+';'+this.state.j10+';'+this.state.j11+';'+this.state.j12+';'+this.state.j13+';'
                +this.state.j14+';'+this.state.j15+';'+this.state.j16+'\n';
            let cashRow10 = 'Total Cost;;'+this.state.k2+';'+this.state.k3+';'+this.state.k4+';'+this.state.k5+';'+this.state.k6+';'+this.state.k7+';'+this.state.k8+';'+this.state.k9+';'+this.state.k10+';'+this.state.k11+';'
                +this.state.k12+';'+this.state.k13+';'+this.state.k14+';'+this.state.k15+';'+this.state.k16+'\n';
            let cashRow11 = 'Discover Claims EBITDA Return;'+this.state.kk1+';'+this.state.kk2+';'+this.state.kk3+';'+this.state.kk4+';'+this.state.kk5+';'+this.state.kk6+';'+this.state.kk7+';'
                +this.state.kk8+';'+this.state.kk9+';'+this.state.kk10+';'+this.state.kk11+';'+this.state.kk12+';'+this.state.kk13+';'+this.state.kk14+';'+this.state.kk15+';'+this.state.kk16+'\n\n';
            let sysHeaderTable1 = ';2019 Billed Charges;Estimated Annual;Estimated Legacy;Estimated Quarterly Value\n';
            let sysTable1row1 = 'CC Charges;'+'$91,200,000'+';'+'$91,200,000'+';'+'$736,700,000'+';'+'$22,800,000\n';
            let sysTable1row2 = 'UCC Charges;'+'$87,800,000'+';'+'$87,800,000'+';'+'$305,400,000'+';'+'$21,950,000\n';
            let sysTable1row3 = 'Total;'+ '$179,000,000'+';'+'$179,000,000'+';'+'$1,042,100,000'+';'+'$44,750,000\n\n';
            let sysHeaderTable2 = 'Year;2016;2017;2018;2019;Total\n';
            let sysTable2row1 = 'Charity Charges;$432,000,000;$105,000,000;$108,500,000;$91,200,000;$736,700,000\n';
            let sysTable2row2 = 'UCC - Non-Medicare & Non-Reimbursable Bad Debt Costs;$16,000,000;$16,500,000;$21,900,000;$21,950,000;$76,350,000\n';
            let sysTable2row3 = 'UCC Charges;$64,000,000;$66,000,000;$87,600,000;$87,800,000;$305,400,000\n';
            let sysTable2row4 = 'Total;;;;$179,000,000;$1,042,100,000\n\n';
            let sysHeaderTable3 = 'Client Values;Legacy Accounts; Quarterly Forward Flow;Phase\n';
            let sysTable3row1 = 'Client\'s Pursuable value;'+this.state.l1+';'+this.state.l4+';'+'Phase I\n';
            let sysTable3row2 = 'Number of Pursuable accounts;'+this.state.l2+';'+this.state.w2+';Phase I\n';
            let sysTable3row3 = 'Average Visit Value (calculated from above);'+ this.state.w3+';'+this.state.w3+';Phase I\n';
            let sysTable3row4 = 'Average QI Value;'+this.state.w6+';'+this.state.w6+';Phase I\n';
            let sysTable3row5 = 'Actual Qualified Inventory;'+this.state.metrics[6].Actual+';'+this.state.metrics[6].Actual__1+';'+ 'Phase I\n';
            let sysTable3row6 = 'Eligible for Insurance Discovery;'+this.state.metrics[9].Actual+';'+this.state.metrics[9].Actual__1+';'+'Phase I\n';
            let sysTable3row7 = 'Courthouse Discovery Average Value;'+this.state.metrics[23].Actual+';'+ this.state.metrics[23].Actual__1+';Phase II\n';
            let sysTable3row8 = 'Successful Insurance Discoveries;'+this.state.metrics[16].Actual+';'+this.state.metrics[16].Actual__1+';Phase II\n';
            let sysTable3row9 = 'Successful Courthouse Discoveries;'+ this.state.metrics[24].Actual+';'+this.state.metrics[24].Actual__1+';Phase II\n';
            let sysTable3row10 = 'Verisk 1st Party Find Rate;50%;50%;Phase II\n';
            let sysTable3row11 = 'Verisk Pre-Lawsuit Find Rate (TPL);50%;50%;Phase II\n';
            let sysTable3row12 = 'Approval (for accounts needing approval);90%;90%;Phase II\n';
            let sysTable3row13 = 'Recovery Success Rate 1st party count;61%;61%;Phase III\n';
            let sysTable3row14 = 'Recovery Success Rate Pre-Lawsuit TPL count;61%;61%;Phase III\n';
            let sysTable3row15 = 'Recovery Success Rate Lawsuit TPL count;61%;61%;Phase III\n';
            let sysTable3row16 = 'Recovery Success Rate 1st party value;35%;35%;Phase III\n';
            let sysTable3row17 = 'Recovery Success Rate Pre-Lawsuit TPL value;35%;35%;Phase III\n';
            let sysTable3row18 = 'Recovery Success Rate Lawsuit TPL value;35%;35%;Phase III\n\n';
            let legHeaderTable1 = 'Stage;Total Billed Charges Charity;Number of Patient Accounts;Average Value;As a % of Previous Stage;Cash Recovery;% of Total UCC\n';
            let legTable1row1 = 'No Patient Contact or TPL Insurance Found;'+this.state.l1+';'+this.state.l2+';'+this.state.l3+';;;100%\n';
            let legTable1row2 = 'Qualified Inventory \"QI\";'+this.state.l4+';'+this.state.l5+';'+this.state.l6+';'+this.state.metrics[6].Actual+';;\n';
            let legTable1row3 = 'Eligible for Insurance Discovery;'+this.state.l8+';'+this.state.l9+';;'+this.state.metrics[9].Actual+';;;\n';
            let legTable1row4 = 'Successful Insurance Discoveries;'+ this.state.l11+';'+this.state.l12+';'+this.state.l13+';'+this.state.metrics[16].Actual+';;;\n';
            let legTable1row5 = 'Eligible for Courthouse Discovery;'+this.state.l15+';'+this.state.l16+';;Calculation;;;\n';
            let legTable1row6 = 'Successful Courthouse Discoveries;'+this.state.l17+';'+this.state.l18+';'+this.state.l19+';' + this.state.metrics[24].Actual+';;;\n';
            let legTable1row7 = 'Bills - 1st Party Insurance Claims (Insurance Discoveries);'+this.state.l21+';'+this.state.l22+';'+this.state.l23+';'+'Recovered Value @ 35% of billed charges;'+this.state.l24+';'+this.state.l25+'\n';
            let legTable1row8 = 'Liens - 3rd Party Claims & Lawsuits (Insurance Discoveries);' +this.state.l26+';'+this.state.l27+';'+this.state.l28+';'+'Recovered Value @ 35% of billed charges;'+this.state.l29+';'+this.state.l30+'\n';
            let legTable1row9 = 'Liens - Lawsuit (Courthouse Discoveries);'+this.state.l31+';'+this.state.l32+';'+this.state.l33+';'+ 'Recovered Value @ 35% of billed charges;'+this.state.l34+';'+this.state.l35+'\n';
            let legTable1row10 = 'Total Recovery;;;;;'+this.state.l36+';'+this.state.l37+'\n\n';
            let legHeaderTable2 = 'Recovery Period Lawsuit Liens;Recovery Period Claims Liens;Recovery Period Claim Bills;\n';
            let legTable2row1 = 'Lawsuit Liens year 1 - 50%;'+ 'Claims Liens year 1 - 50%;Claim Bills year 1 - 90%\n';
            let legTable2row2 = 'Lawsuit Liens year 2 - 25%;Claims Liens year 2 - 42%;Claim Bills year 2 - 10%\n';
            let legTable2row3 = 'Lawsuit Liens year 3 - 20%;Claims Liens year 3 - 8%;0%\n';
            let legTable2row4 = 'Lawsuit Liens year 3+ - 5%;0%;0%\n\n';
            let forHeaderTable1 = 'Stage;Total Billed Charges Charity;Number of Patient Accounts;Average Value;As a % of Previous Stage;Cash Recovery;% of Total UCC\n';
            let forTable1row1 = 'No Patient Contact or TPL Insurance Found;'+this.state.w1+';'+this.state.w2+';'+this.state.w3+';;;100%\n';
            let forTable1row2 = 'Qualified Inventory \"QI\";'+this.state.w4+';'+this.state.w5+';'+this.state.w6+';'+this.state.metrics[6].Actual__1+';;\n';
            let forTable1row3 = 'Eligible for Insurance Discovery;'+this.state.w8+';'+this.state.w9+';;'+this.state.metrics[9].Actual__1+';;;\n';
            let forTable1row4 = 'Successful Insurance Discoveries;'+ this.state.w11+';'+this.state.w12+';'+this.state.w13+';'+this.state.metrics[16].Actual__1+';;;\n';
            let forTable1row5 = 'Eligible for Courthouse Discovery;'+this.state.w15+';'+this.state.w16+';;Calculation;;;\n';
            let forTable1row6 = 'Successful Courthouse Discoveries;'+this.state.w17+';'+this.state.w18+';'+this.state.w19+';'+this.state.metrics[24].Actual__1+';;;\n';
            let forTable1row7 = 'Bills - 1st Party Insurance Claims (Insurance Discoveries);'+this.state.w21+';'+this.state.w22+';'+this.state.w23+';'+'Recovered Value @ 35% of billed charges;'+this.state.w24+';'+this.state.w25+'\n';
            let forTable1row8 = 'Liens - 3rd Party Claims & Lawsuits (Insurance Discoveries);' +this.state.w26+';'+this.state.w27+';'+this.state.w28+';'+'Recovered Value @ 35% of billed charges;'+this.state.w29+';'+this.state.w30+'\n';
            let forTable1row9 = 'Liens - Lawsuit (Courthouse Discoveries);'+this.state.w31+';'+this.state.w32+';'+this.state.w33+';'+ 'Recovered Value @ 35% of billed charges;'+this.state.w34+';'+this.state.w35+'\n';
            let forTable1row10 = 'Total Recovery;;;;;'+this.state.w36+';'+this.state.w37+'\n\n';
            let forHeaderTable2 = 'Recovery Period Lawsuit Liens;Recovery Period Claims Liens;Recovery Period Claim Bills\n';
            let forTable2row1 = 'Lawsuit Liens year 1 - 50%;Claims Liens year 1 - 50%;Claim Bills year 1 - 90%\n';
            let forTable2row2 = 'Lawsuit Liens year 2 - 25%;Claims Liens year 2 - 42%;Claim Bills year 2 - 10%\n';
            let forTable2row3 = 'Lawsuit Liens year 3 - 20%;Claims Liens year 3 - 8%;0%\n';
            let forTable2row4 = 'Lawsuit Liens year 3+ - 5%;0%;0%\n\n';
            let forHeaderTable3 = 'Quarter 1;Quarter 2;Quarter 3;Quarter 4;Year 1;Quarter 5;Quarter 6;Quarter 7;Quarter 8;Year 2;Quarter 9;Quarter 10;Quarter 11;Quarter 12;Year 3;Year 3+ Remaining\n';
            let forTable3row1 = 'Recovery Period Claim Bills;0.000%;'+ '27.000%;29.700%;33.300%;90.000%;2.800%;2.700%;2.700%;1.800%;10.000%;0.000%;0.000%;0.000%;0.000%;0.000%;0.000%\n';
            let forTable3row2 = 'Recovery Period Claim Liens;0.000%;12.500%;15.000%;22.500%;50.000%;21.250%;14.500%;3.750%;2.500%;42.000%;2.100%;2.100%;2.100%;'+ '1.700%;8.000%;0.000%\n';
            let forTable3row3 = 'Recovery Period Lawsuit Liens;0.000%;12.500%;15.000%;22.500%;50.000%;8.250%;8.250%;4.500%;4.000%;25.000%;5.000%;5.000%;5.000%;5.000%;20.000%;5.000%\n';
            let opDataDer = '';
            let sysDataDer = '';
            let cashDataDer = '';
            let legDataDer = '';
            let forDataDer = '';
            if (this.state.opCheckboxChecked){opDataDer = opAssData;}
            if (this.state.sysCheckboxChecked){
                if(this.state.sysCheckboxChecked1){
                    let i;
                    sysDataDer += sysHeaderTable1;
                    for(i = this.state.value1[0];i < this.state.value1[1]+1;i++){
                        if(i===1){sysDataDer+=sysTable1row1}
                        if(i===2){sysDataDer+=sysTable1row2}
                        if(i===3){sysDataDer+=sysTable1row3}
                    }
                    if(sysDataDer.charAt(sysDataDer.length-1)!== '\n' || sysDataDer.charAt(sysDataDer.length-2)!== '\n'){
                        sysDataDer+='\n';
                    }
                }
                if(this.state.sysCheckboxChecked2){
                    let i;
                    sysDataDer += sysHeaderTable2;
                    for(i = this.state.value2[0];i < this.state.value2[1]+1;i++){
                        if(i===1){sysDataDer+=sysTable2row1}
                        if(i===2){sysDataDer+=sysTable2row2}
                        if(i===3){sysDataDer+=sysTable2row3}
                        if(i===4){sysDataDer+=sysTable2row4}
                    }
                    if(sysDataDer.charAt(sysDataDer.length-1)!== '\n' || sysDataDer.charAt(sysDataDer.length-2)!== '\n'){
                        sysDataDer+='\n';
                    }
                }
                if(this.state.sysCheckboxChecked3){
                    let i;
                    sysDataDer += sysHeaderTable3;
                    for(i = this.state.value3[0];i < this.state.value3[1]+1;i++){
                        if(i===1){sysDataDer+=sysTable3row1}
                        if(i===2){sysDataDer+=sysTable3row2}
                        if(i===3){sysDataDer+=sysTable3row3}
                        if(i===4){sysDataDer+=sysTable3row4}
                        if(i===5){sysDataDer+=sysTable3row5}
                        if(i===6){sysDataDer+=sysTable3row6}
                        if(i===7){sysDataDer+=sysTable3row7}
                        if(i===8){sysDataDer+=sysTable3row8}
                        if(i===9){sysDataDer+=sysTable3row9}
                        if(i===10){sysDataDer+=sysTable3row10}
                        if(i===11){sysDataDer+=sysTable3row11}
                        if(i===12){sysDataDer+=sysTable3row12}
                        if(i===13){sysDataDer+=sysTable3row13}
                        if(i===14){sysDataDer+=sysTable3row14}
                        if(i===15){sysDataDer+=sysTable3row15}
                        if(i===16){sysDataDer+=sysTable3row16}
                        if(i===17){sysDataDer+=sysTable3row17}
                        if(i===18){sysDataDer+=sysTable3row18}
                    }
                    if(sysDataDer.charAt(sysDataDer.length-1)!== '\n' || sysDataDer.charAt(sysDataDer.length-2)!== '\n'){
                        sysDataDer+='\n';
                    }
                }
                if(this.state.sysCheckboxChecked4){
                    let i;
                    for(i = this.state.value31[0];i < this.state.value31[1]+1;i++){
                        if(i===1){sysDataDer+='Verisk Rate;$8.50\n'};
                        if(i===2){sysDataDer+='Westlaw Rate;$0.30\n\n';}
                    }
                    if(sysDataDer.charAt(sysDataDer.length-1)!== '\n' || sysDataDer.charAt(sysDataDer.length-2)!== '\n'){
                        sysDataDer+='\n';
                    }
                }
                if(this.state.sysCheckboxChecked5){
                    sysDataDer+='Legacy / Lookback;Phase;Amount;Actual Timing & Comments;Forward Flow;Amount;Actual Timing & Comments\n';
                    let i;
                    for(i = this.state.value32[0];i < this.state.value32[1]+1;i++){
                        sysDataDer+=this.state.metrics[i-1]["Legacy / Lookback"]+';'+this.state.metrics[i-1]["Phase"]+';'+this.state.metrics[i-1]["Actual"]+';'+this.state.metrics[i-1]["Actual Timing & Comments"]+';'+this.state.metrics[i-1]["Forward Flow"]+';'+this.state.metrics[i-1]["Actual__1"]+';'+this.state.metrics[i-1]["Actual\" Timing & Comments"]+'\n';
                    }
                    sysDataDer+='\n';
                }
            }
            if(this.state.caCheckboxChecked){
                let i;
                cashDataDer = cashHeader;
                for(i=this.state.value4[0];i<this.state.value4[1]+1;i++){
                    if(i===1){cashDataDer+=cashRow1}
                    if(i===2){cashDataDer+=cashRow2}
                    if(i===3){cashDataDer+=cashRow3}
                    if(i===4){cashDataDer+=cashRow4}
                    if(i===5){cashDataDer+=cashRow5}
                    if(i===6){cashDataDer+=cashRow6}
                    if(i===7){cashDataDer+=cashRow7}
                    if(i===8){cashDataDer+=cashRow8}
                    if(i===9){cashDataDer+=cashRow9}
                    if(i===10){cashDataDer+=cashRow10}
                    if(i===11){cashDataDer+=cashRow11}
                }
                if(cashDataDer.charAt(cashDataDer.length-1)!== '\n' || cashDataDer.charAt(cashDataDer.length-2)!== '\n'){
                    cashDataDer+='\n';
                }
            }
            if (this.state.legCheckboxChecked) {
                if (this.state.legCheckboxChecked1) {
                    let i;
                    legDataDer += legHeaderTable1;
                    for (i = this.state.value5[0]; i < this.state.value5[1]+1; i++) {
                        if(i===1){legDataDer+=legTable1row1}
                        if(i===2){legDataDer+=legTable1row2}
                        if(i===3){legDataDer+=legTable1row3}
                        if(i===4){legDataDer+=legTable1row4}
                        if(i===5){legDataDer+=legTable1row5}
                        if(i===6){legDataDer+=legTable1row6}
                        if(i===7){legDataDer+=legTable1row7}
                        if(i===8){legDataDer+=legTable1row8}
                        if(i===9){legDataDer+=legTable1row9}
                        if(i===10){legDataDer+=legTable1row10}
                    }
                    if(legDataDer.charAt(legDataDer.length-1)!== '\n' || legDataDer.charAt(legDataDer.length-2)!== '\n'){
                        legDataDer+='\n';
                    }
                }
                if (this.state.legCheckboxChecked2) {
                    let i;
                    legDataDer += legHeaderTable2;
                    for (i = this.state.value6[0]; i < this.state.value6[1]+1; i++) {
                        if(i===1){legDataDer+=legTable2row1}
                        if(i===2){legDataDer+=legTable2row2}
                        if(i===3){legDataDer+=legTable2row3}
                        if(i===4){legDataDer+=legTable2row4}
                    }
                    if(legDataDer.charAt(legDataDer.length-1)!== '\n' || legDataDer.charAt(legDataDer.length-2)!== '\n'){
                        legDataDer+='\n';
                    }
                }
            }
            if (this.state.forCheckboxChecked) {
                if (this.state.forCheckboxChecked1) {
                    forDataDer+=forHeaderTable1;
                    let i;
                    for (i = this.state.value7[0]; i < this.state.value7[1]+1; i++) {
                        if(i===1){forDataDer+=forTable1row1}
                        if(i===2){forDataDer+=forTable1row2}
                        if(i===3){forDataDer+=forTable1row3}
                        if(i===4){forDataDer+=forTable1row4}
                        if(i===5){forDataDer+=forTable1row5}
                        if(i===6){forDataDer+=forTable1row6}
                        if(i===7){forDataDer+=forTable1row7}
                        if(i===8){forDataDer+=forTable1row8}
                        if(i===9){forDataDer+=forTable1row9}
                        if(i===10){forDataDer+=forTable1row10}
                    }
                    if(forDataDer.charAt(forDataDer.length-1)!== '\n'|| forDataDer.charAt(forDataDer.length-2)!== '\n'){
                        forDataDer+='\n';
                    }
                }
                if (this.state.forCheckboxChecked2) {
                    let i;
                    forDataDer += forHeaderTable2;
                    for (i = this.state.value8[0]; i < this.state.value8[1]+1; i++) {
                        if(i===1){forDataDer+=forTable2row1}
                        if(i===2){forDataDer+=forTable2row2}
                        if(i===3){forDataDer+=forTable2row3}
                        if(i===4){forDataDer+=forTable2row4}
                    }
                    if(forDataDer.charAt(forDataDer.length-1)!== '\n' || forDataDer.charAt(forDataDer.length-2)!== '\n'){
                        forDataDer+='\n';
                    }
                }
                if (this.state.forCheckboxChecked3) {
                    let i;
                    forDataDer += forHeaderTable3;
                    for (i = this.state.value9[0]; i < this.state.value9[1]+1; i++) {
                        if(i===1){forDataDer+=forTable3row1}
                        if(i===2){forDataDer+=forTable3row2}
                        if(i===3){forDataDer+=forTable3row3}
                    }
                    if(forDataDer.charAt(forDataDer.length-1)!== '\n' || forDataDer.charAt(forDataDer.length-2)!== '\n'){
                        forDataDer+='\n';
                    }
                }
            }
            let allText = sep+opAssData+sysData+cashData+legData+forData;
            let customText= sep + opDataDer + sysDataDer + cashDataDer + legDataDer + forDataDer;
            if(this.state.allCheckboxChecked && this.state.csvButton){
                downloadFile('text/csv', 'OpportunityAssessment.csv', allText);
            }else{
                if(this.state.csvButton) {
                    downloadFile('text/csv', 'OpportunityAssessment.csv', customText);
                }
            }
        };
        return (
            <div>
                <div style={{position: 'fixed', right: '1em', top: '4em', zIndex: '2'}} id={'dd'} key={"saveDivKeyStylingInner"}>
                    <Dropdown direction={'left'} isOpen={this.state.dropdownOpen} toggle={toggle1}>
                        <DropdownToggle color="primary" caret>
                            Save
                        </DropdownToggle>
                        <DropdownMenu >
                            <Form style={{paddingLeft: '.4em', paddingRight: '.4em', paddingBottom: '.4em'}}>
                                <Form.Check type="checkbox"  defaultChecked={this.state.allCheckboxChecked} key={Math.random()} onChange={this.allCheckbox} label="All" />
                                <Collapse isOpen={this.state.collapse1Open} style={{paddingBottom: '.25em'}}>
                                </Collapse>
                                <Form.Check type="checkbox" defaultChecked={this.state.opCheckboxChecked} key={Math.random()} onChange={this.opCheckbox} label="Opportunity Assessment" />
                                <Collapse isOpen={this.state.collapse2Open} style={{paddingBottom: '.25em'}}>
                                </Collapse>
                                <Form.Check type="checkbox" defaultChecked={this.state.sysCheckboxChecked} key={Math.random()} onChange={this.sysCheckbox} label="System Numbers" />
                                <Collapse isOpen={this.state.collapse3Open} style={{paddingBottom: '.25em'}}>
                                    <div style={{paddingLeft: '2em', paddingRight:'1em'}} key={"saveDivKeyStylingInner1"}>
                                        <Form.Check type="checkbox" defaultChecked={this.state.sysCheckboxChecked1} key={Math.random()} onChange={this.sysCheckbox1} label="Table 1" />
                                        <div key={"saveDivKeyStylingInner2"}>
                                            <Typography id="discrete-slider" gutterBottom>
                                                Select Data Rows
                                            </Typography>
                                            <Slider
                                                defaultValue={[1,3]}
                                                aria-labelledby="discrete-slider"
                                                valueLabelDisplay="auto"
                                                marks={true}
                                                step={1}
                                                min={1}
                                                max={3}
                                                width={100}
                                                value={this.state.value1}
                                                onChange={(e, newValue) => this.value1(newValue)}
                                            />
                                        </div>
                                        <Form.Check type="checkbox" defaultChecked={this.state.sysCheckboxChecked2} key={Math.random()} onChange={this.sysCheckbox2} label="Table 2" />
                                        <div key={"saveDivKeyStylingInner3"}>
                                            <Typography id="discrete-slider" gutterBottom>
                                                Select Data Rows
                                            </Typography>
                                            <Slider
                                                defaultValue={[1,4]}
                                                aria-labelledby="discrete-slider"
                                                valueLabelDisplay="auto"
                                                marks={true}
                                                step={1}
                                                min={1}
                                                max={4}
                                                width={300}
                                                value={this.state.value2}
                                                onChange={(e, newValue) => this.value2(newValue)}
                                            />
                                        </div>
                                        <Form.Check type="checkbox" defaultChecked={this.state.sysCheckboxChecked3} key={Math.random()} onChange={this.sysCheckbox3} label="Client Values" />
                                        <div>
                                            <Typography id="discrete-slider" gutterBottom>
                                                Select Data Rows
                                            </Typography>
                                            <Slider
                                                defaultValue={[1,18]}
                                                aria-labelledby="discrete-slider"
                                                valueLabelDisplay="auto"
                                                marks={true}
                                                step={1}
                                                min={1}
                                                max={18}
                                                width={300}
                                                value={this.state.value3}
                                                onChange={(e, newValue) => this.value3(newValue)}
                                            />
                                        </div>
                                        <Form.Check type="checkbox" defaultChecked={this.state.sysCheckboxChecked4} key={Math.random()} onChange={this.sysCheckbox4} label="Verisk / Westlaw Rates" />
                                        <div key={"saveDivKeyStylingInner4"}>
                                            <Typography id="discrete-slider" gutterBottom>
                                                Select Data Rows
                                            </Typography>
                                            <Slider
                                                defaultValue={[1,2]}
                                                aria-labelledby="discrete-slider"
                                                valueLabelDisplay="auto"
                                                marks={true}
                                                step={1}
                                                min={1}
                                                max={2}
                                                width={300}
                                                value={this.state.value31}
                                                onChange={(e, newValue) => this.value31(newValue)}
                                            />
                                        </div>
                                        <Form.Check type="checkbox" defaultChecked={this.state.sysCheckboxChecked5} key={Math.random()} onChange={this.sysCheckbox5} label="Table 5" />
                                        <div>
                                            <Typography id="discrete-slider" gutterBottom>
                                                Select Data Rows
                                            </Typography>
                                            <Slider
                                                defaultValue={[1,58]}
                                                aria-labelledby="discrete-slider"
                                                valueLabelDisplay="auto"
                                                marks={false}
                                                step={1}
                                                min={1}
                                                max={58}
                                                width={300}
                                                value={this.state.value32}
                                                onChange={(e, newValue) => this.value32(newValue)}
                                            />
                                        </div>
                                    </div>
                                </Collapse>
                                <Form.Check defaultChecked={this.state.caCheckboxChecked} onChange={this.toggleCashBox} key={Math.random()} type="checkbox" label="Cash Flow" />
                                <Collapse isOpen={this.state.collapse4Open} style={{paddingTop: '.4em', paddingBottom: '.25em'}}>
                                    <div style={{paddingLeft: '2em',paddingRight: '1em'}} key={"saveDivKeyStylingCollapse1"}>
                                        <Typography id="discrete-slider" gutterBottom>
                                            Select Data Rows
                                        </Typography>
                                        <Slider
                                            defaultValue={[1,11]}
                                            aria-labelledby="discrete-slider"
                                            valueLabelDisplay="auto"
                                            marks={true}
                                            step={1}
                                            min={1}
                                            max={11}
                                            width={300}
                                            value={this.state.value4}
                                            onChange={(e, newValue) => this.value4(newValue)}
                                        />
                                    </div>
                                </Collapse>
                                <Form.Check type="checkbox" defaultChecked={this.state.legCheckboxChecked} key={Math.random()} onChange={this.legCheckbox} label="CC Legacy Data" />
                                <Collapse isOpen={this.state.collapse5Open} style={{paddingBottom: '.25em'}}>
                                    <div style={{paddingLeft: '2em', paddingRight:'1em'}} key={"saveDivKeyStylingCollapse1"}>
                                        <Form.Check type="checkbox" defaultChecked={this.state.legCheckboxChecked1} key={Math.random()} onChange={this.legCheckbox1} label="Table 1" />
                                        <Typography id="discrete-slider" gutterBottom>
                                            Select Data Rows
                                        </Typography>
                                        <Slider
                                            defaultValue={[1,10]}
                                            aria-labelledby="discrete-slider"
                                            valueLabelDisplay="auto"
                                            marks={true}
                                            step={1}
                                            min={1}
                                            max={10}
                                            width={300}
                                            value={this.state.value5}
                                            onChange={(e, newValue) => this.value5(newValue)}
                                        />
                                        <Form.Check type="checkbox" defaultChecked={this.state.legCheckboxChecked2} key={Math.random()} onChange={this.legCheckbox2} label="Table 2" />
                                        <Typography id="discrete-slider" gutterBottom>
                                            Select Data Rows
                                        </Typography>
                                        <Slider
                                            defaultValue={[1,4]}
                                            aria-labelledby="discrete-slider"
                                            valueLabelDisplay="auto"
                                            marks={true}
                                            step={1}
                                            min={1}
                                            max={4}
                                            width={300}
                                            value={this.state.value6}
                                            onChange={(e, newValue) => this.value6(newValue)}
                                        />
                                    </div>
                                </Collapse>
                                <Form.Check type="checkbox" defaultChecked={this.state.forCheckboxChecked} key={Math.random()} onChange={this.forCheckbox} label="CC Forward Flow" />
                                <Collapse isOpen={this.state.collapse6Open} style={{paddingBottom: '.25em'}}>
                                    <div style={{paddingLeft: '2em', paddingRight:'1em'}} key={"saveDivKeyStylingCollapse3"}>
                                        <Form.Check type="checkbox"  defaultChecked={this.state.forCheckboxChecked1} key={Math.random()} onChange={this.forCheckbox1} label="Table 1" />
                                        <Typography id="discrete-slider" gutterBottom>
                                            Select Data Rows
                                        </Typography>
                                        <Slider
                                            defaultValue={[1,10]}
                                            aria-labelledby="discrete-slider"
                                            valueLabelDisplay="auto"
                                            marks={true}
                                            step={1}
                                            min={1}
                                            max={10}
                                            width={300}
                                            value={this.state.value7}
                                            onChange={(e, newValue) => this.value7(newValue)}
                                        />
                                        <Form.Check type="checkbox" defaultChecked={this.state.forCheckboxChecked2} key={Math.random()} onChange={this.forCheckbox2} label="Table 2" />
                                        <Typography id="discrete-slider" gutterBottom>
                                            Select Data Rows
                                        </Typography>
                                        <Slider
                                            defaultValue={[1,4]}
                                            aria-labelledby="discrete-slider"
                                            valueLabelDisplay="auto"
                                            marks={true}
                                            step={1}
                                            min={1}
                                            max={4}
                                            width={300}
                                            value={this.state.value8}
                                            onChange={(e, newValue) => this.value8(newValue)}
                                        />
                                        <Form.Check type="checkbox"  defaultChecked={this.state.forCheckboxChecked3} key={Math.random()} onChange={this.forCheckbox3} label="Table 3" />
                                        <Typography id="discrete-slider" gutterBottom>
                                            Select Data Rows
                                        </Typography>
                                        <Slider
                                            defaultValue={[1,3]}
                                            aria-labelledby="discrete-slider"
                                            valueLabelDisplay="auto"
                                            marks={true}
                                            step={1}
                                            min={1}
                                            max={3}
                                            width={300}
                                            value={this.state.value9}
                                            onChange={(e, newValue) => this.value9(newValue)}
                                        />
                                    </div>
                                </Collapse>
                                <DropdownItem divider />
                                <FormGroup check style={{paddingLeft: '1.255em', paddingBottom: '.5em'}}>
                                    <Label check>
                                        <Input type="radio" name="radio1" value={this.state.csvButton} onChange={this.toggleCSV} defaultChecked/>{' '}
                                        CSV
                                    </Label>
                                </FormGroup>
                                <Button color="success" onClick={toggleSubmit}>Submit</Button>
                            </Form>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                {this.tabsNov()}
            </div>
        );
    }

    buttonCallback = () => {
        this.setState({ isEditing: true })
    }
    handleChange(oldValue, newValue, row, column) {
        let self = this;
        let rowNum;
        if (column.dataField === "rate"){
            for (let i = 0; i < this.state.rates.length; i++) {
                if (this.state.rates[i] === row) {
                    rowNum = i;
                }
            }
        }else{
            for (let i = 0; i < this.state.metrics.length; i++) {
                if (this.state.metrics[i] === row) {
                    rowNum = i;
                }
            }
        }
        axios.post('http://localhost:4500/', {val: newValue, row: rowNum, col: column, met: this.state.metrics}).then(resp => {
            self.setState({comebackk: resp.data.main, metricsTemp: resp.data.met}, function() {
                let ar = handleOutputStr(this.state.comebackk);
                this.setState({rates:[
                        {   "vendor": "Verisk",
                            "rate": ar[ar.length-2]
                        },
                        {   "vendor": "Westlaw",
                            "rate": ar[ar.length-1]
                        },
                    ],});
                let temp = handleMetricsOutput(this.state.metricsTemp);
                this.setState({metrics: temp})
                this.setState({b1: ar[0]});
                this.setState({b2: ar[1]});
                this.setState({b3: ar[2]});
                this.setState({b4: ar[3]});
                this.setState({b5: ar[4]});
                this.setState({b6: ar[5]});
                this.setState({b7: ar[6]});
                this.setState({b8: ar[7]});
                this.setState({b9: ar[8]});
                this.setState({b10: ar[9]});
                this.setState({b11: ar[10]});
                this.setState({b12: ar[11]});
                this.setState({b13: ar[12]});
                this.setState({b14: ar[13]});
                this.setState({b15: ar[14]});
                this.setState({b16: ar[15]});
                this.setState({c1: ar[16]});
                this.setState({c2: ar[17]});
                this.setState({c3: ar[18]});
                this.setState({c4: ar[19]});
                this.setState({c5: ar[20]});
                this.setState({c6: ar[21]});
                this.setState({c7: ar[22]});
                this.setState({c8: ar[23]});
                this.setState({c9: ar[24]});
                this.setState({c10: ar[25]});
                this.setState({c11: ar[26]});
                this.setState({c12: ar[27]});
                this.setState({c13: ar[28]});
                this.setState({c14: ar[29]});
                this.setState({c15: ar[30]});
                this.setState({c16: ar[31]});
                this.setState({d1: ar[32]});
                this.setState({d2: ar[33]});
                this.setState({d3: ar[34]});
                this.setState({d4: ar[35]});
                this.setState({d5: ar[36]});
                this.setState({d6: ar[37]});
                this.setState({d7: ar[38]});
                this.setState({d8: ar[39]});
                this.setState({d9: ar[40]});
                this.setState({d10: ar[41]});
                this.setState({d11: ar[42]});
                this.setState({d12: ar[43]});
                this.setState({d13: ar[44]});
                this.setState({d14: ar[45]});
                this.setState({d15: ar[46]});
                this.setState({d16: ar[47]});
                this.setState({e1: ar[48]});
                this.setState({e2: ar[49]});
                this.setState({e3: ar[50]});
                this.setState({e4: ar[51]});
                this.setState({e5: ar[52]});
                this.setState({e6: ar[53]});
                this.setState({e7: ar[54]});
                this.setState({e8: ar[55]});
                this.setState({e9: ar[56]});
                this.setState({e10: ar[57]});
                this.setState({e11: ar[58]});
                this.setState({e12: ar[59]});
                this.setState({e13: ar[60]});
                this.setState({e14: ar[61]});
                this.setState({e15: ar[62]});
                this.setState({e16: ar[63]});
                this.setState({f1: ar[64]});
                this.setState({f2: ar[65]});
                this.setState({f3: ar[66]});
                this.setState({f4: ar[67]});
                this.setState({f5: ar[68]});
                this.setState({f6: ar[69]});
                this.setState({f7: ar[70]});
                this.setState({f8: ar[71]});
                this.setState({f9: ar[72]});
                this.setState({f10: ar[73]});
                this.setState({f11: ar[74]});
                this.setState({f12: ar[75]});
                this.setState({f13: ar[76]});
                this.setState({f14: ar[77]});
                this.setState({f15: ar[78]});
                this.setState({f16: ar[79]});
                this.setState({l1: ar[80]});
                this.setState({l2: ar[81]});
                this.setState({l3: ar[82]});
                this.setState({l4: ar[83]});
                this.setState({l5: ar[84]});
                this.setState({l6: ar[85]});
                this.setState({l7: ar[86]});
                this.setState({l8: ar[87]});
                this.setState({l9: ar[88]});
                this.setState({l10: ar[89]});
                this.setState({l11: ar[90]});
                this.setState({l12: ar[91]});
                this.setState({l13: ar[92]});
                this.setState({l14: ar[93]});
                this.setState({l15: ar[94]});
                this.setState({l16: ar[95]});
                this.setState({l17: ar[96]});
                this.setState({l18: ar[97]});
                this.setState({l19: ar[98]});
                this.setState({l20: ar[99]});
                this.setState({l21: ar[100]});
                this.setState({l22: ar[101]});
                this.setState({l23: ar[102]});
                this.setState({l24: ar[103]});
                this.setState({l25: ar[104]});
                this.setState({l26: ar[105]});
                this.setState({l27: ar[106]});
                this.setState({l28: ar[107]});
                this.setState({l29: ar[108]});
                this.setState({l30: ar[109]});
                this.setState({l31: ar[110]});
                this.setState({l32: ar[111]});
                this.setState({l33: ar[112]});
                this.setState({l34: ar[113]});
                this.setState({l35: ar[114]});
                this.setState({l36: ar[115]});
                this.setState({l37: ar[116]});
                this.setState({w1: ar[117]});
                this.setState({w2: ar[118]});
                this.setState({w3: ar[119]});
                this.setState({w4: ar[120]});
                this.setState({w5: ar[121]});
                this.setState({w6: ar[122]});
                this.setState({w7: ar[123]});
                this.setState({w8: ar[124]});
                this.setState({w9: ar[125]});
                this.setState({w10: ar[126]});
                this.setState({w11: ar[127]});
                this.setState({w12: ar[128]});
                this.setState({w13: ar[129]});
                this.setState({w14: ar[130]});
                this.setState({w15: ar[131]});
                this.setState({w16: ar[132]});
                this.setState({w17: ar[133]});
                this.setState({w18: ar[134]});
                this.setState({w19: ar[135]});
                this.setState({w20: ar[136]});
                this.setState({w21: ar[137]});
                this.setState({w22: ar[138]});
                this.setState({w23: ar[139]});
                this.setState({w24: ar[140]});
                this.setState({w25: ar[141]});
                this.setState({w26: ar[142]});
                this.setState({w27: ar[143]});
                this.setState({w28: ar[144]});
                this.setState({w29: ar[145]});
                this.setState({w30: ar[146]});
                this.setState({w31: ar[147]});
                this.setState({w32: ar[148]});
                this.setState({w33: ar[149]});
                this.setState({w34: ar[150]});
                this.setState({w35: ar[151]});
                this.setState({w36: ar[152]});
                this.setState({w37: ar[153]});
                this.setState({v1: ar[154]});
                this.setState({v2: ar[155]});
                this.setState({v3: ar[156]});
                this.setState({v4: ar[157]});
                this.setState({v5: ar[158]});
                this.setState({v6: ar[159]});
                this.setState({v7: ar[160]});
                this.setState({v8: ar[161]});
                this.setState({v9: ar[162]});
                this.setState({v10: ar[163]});
                this.setState({v11: ar[164]});
                this.setState({v12: ar[165]});
                this.setState({v13: ar[166]});
                this.setState({v14: ar[167]});
                this.setState({v15: ar[168]});
                this.setState({v16: ar[169]});
                this.setState({v17: ar[170]});
                this.setState({g1: ar[171]});
                this.setState({g2: ar[172]});
                this.setState({g3: ar[173]});
                this.setState({g4: ar[174]});
                this.setState({g5: ar[175]});
                this.setState({g6: ar[176]});
                this.setState({g7: ar[177]});
                this.setState({g8: ar[178]});
                this.setState({g9: ar[179]});
                this.setState({g10: ar[180]});
                this.setState({g11: ar[181]});
                this.setState({g12: ar[182]});
                this.setState({g13: ar[183]});
                this.setState({g14: ar[184]});
                this.setState({g15: ar[185]});
                this.setState({g16: ar[186]});
                this.setState({h1: ar[187]});
                this.setState({h2: ar[188]});
                this.setState({h3: ar[189]});
                this.setState({h4: ar[190]});
                this.setState({h5: ar[191]});
                this.setState({h6: ar[192]});
                this.setState({h7: ar[193]});
                this.setState({h8: ar[194]});
                this.setState({h9: ar[195]});
                this.setState({h10: ar[196]});
                this.setState({h11: ar[197]});
                this.setState({h12: ar[198]});
                this.setState({h13: ar[199]});
                this.setState({h14: ar[200]});
                this.setState({h15: ar[201]});
                this.setState({h16: ar[202]});
                this.setState({i1: ar[203]});
                this.setState({i2: ar[204]});
                this.setState({i3: ar[205]});
                this.setState({i4: ar[206]});
                this.setState({i5: ar[207]});
                this.setState({i6: ar[208]});
                this.setState({i7: ar[209]});
                this.setState({i8: ar[210]});
                this.setState({i9: ar[211]});
                this.setState({i10: ar[212]});
                this.setState({i11: ar[213]});
                this.setState({i12: ar[214]});
                this.setState({i13: ar[215]});
                this.setState({i14: ar[216]});
                this.setState({i15: ar[217]});
                this.setState({i16: ar[218]});
                this.setState({j1: ar[219]});
                this.setState({j2: ar[220]});
                this.setState({j3: ar[221]});
                this.setState({j4: ar[222]});
                this.setState({j5: ar[223]});
                this.setState({j6: ar[224]});
                this.setState({j7: ar[225]});
                this.setState({j8: ar[226]});
                this.setState({j9: ar[227]});
                this.setState({j10: ar[228]});
                this.setState({j11: ar[229]});
                this.setState({j12: ar[230]});
                this.setState({j13: ar[231]});
                this.setState({j14: ar[232]});
                this.setState({j15: ar[233]});
                this.setState({j16: ar[234]});
                this.setState({k1: ar[235]});
                this.setState({k2: ar[236]});
                this.setState({k3: ar[237]});
                this.setState({k4: ar[238]});
                this.setState({k5: ar[239]});
                this.setState({k6: ar[240]});
                this.setState({k7: ar[241]});
                this.setState({k8: ar[242]});
                this.setState({k9: ar[243]});
                this.setState({k10: ar[244]});
                this.setState({k11: ar[245]});
                this.setState({k12: ar[246]});
                this.setState({k13: ar[247]});
                this.setState({k14: ar[248]});
                this.setState({k15: ar[249]});
                this.setState({k16: ar[250]});
                this.setState({kk1: ar[251]});
                this.setState({kk2: ar[252]});
                this.setState({kk3: ar[253]});
                this.setState({kk4: ar[254]});
                this.setState({kk5: ar[255]});
                this.setState({kk6: ar[256]});
                this.setState({kk7: ar[257]});
                this.setState({kk8: ar[258]});
                this.setState({kk9: ar[259]});
                this.setState({kk10: ar[260]});
                this.setState({kk11: ar[261]});
                this.setState({kk12: ar[262]});
                this.setState({kk13: ar[263]});
                this.setState({kk14: ar[264]});
                this.setState({kk15: ar[265]});
                this.setState({kk16: ar[266]});
            });
        });
    }
    tabsNov(){
        return(
            <div style={{zIndex: '1'}} id={"here"} key={"mainPageDiv"}>
                <Tabs key={"mainTab"}>
                    <TabList key={"mainTabList"}>
                        <Tab>Opportunity Assessment</Tab>
                        <Tab>Client's DC Results</Tab>
                        <Tab>Cash Flow</Tab>
                        <Tab>CC Legacy Data</Tab>
                        <Tab>CC Forward Floww</Tab>
                    </TabList>
                    <TabPanel key={"opAssessTab"}>
                        <div style={{paddingBottom : '3em'}} key={"OpAssesDiv"}>
                            <Table responsive striped bordered hover style={{position: 'relative'}}>
                                <thead>
                                <tr>
                                    <th>Quarterly Client Data</th>
                                    <th>Estimated Legacy Recovery</th>
                                    <th>Legacy Data - Verisk Count</th>
                                    <th>Legacy Data - West Law Count</th>
                                    <th>One Time (Legacy) Verisk Cost</th>
                                    <th>One Time (Legacy) Westlaw Cost</th>
                                    <th>One Time Total Legacy Data Cost</th>
                                    <th>Qtrly Forward Flow Accts - Verisk</th>
                                    <th>Qtrly Forward Flow Accts - Westlaw</th>
                                    <th>Quarterly Forward Flow - Verisk Cost</th>
                                    <th>Quarterly Forward Flow - Westlaw Cost</th>
                                    <th>Verisk and Westlaw Forward Flow Quarterly Cost</th>
                                    <th>Quarterly - Client Potential Recovery </th>
                                    <th>Overall - Client Potential Recovery </th>
                                    <th>Total UCC & CC Charges</th>
                                    <th>Discover Claims EBITDA Return</th>
                                    <th>Discover Claims EBITDA Return %</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{this.state.v1}</td>
                                    <td>{this.state.v2}</td>
                                    <td>{this.state.v3}</td>
                                    <td>{this.state.v4}</td>
                                    <td>{this.state.v5}</td>
                                    <td>{this.state.v6}</td>
                                    <td>{this.state.v7}</td>
                                    <td>{this.state.v8}</td>
                                    <td>{this.state.v9}</td>
                                    <td>{this.state.v10}</td>
                                    <td>{this.state.v11}</td>
                                    <td>{this.state.v12}</td>
                                    <td>{this.state.v13}</td>
                                    <td>{this.state.v14}</td>
                                    <td>{this.state.v15}</td>
                                    <td>{this.state.v16}</td>
                                    <td>{this.state.v17}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                    </TabPanel>
                    <TabPanel key={"SysNumsTab"}>
                        <div style={{paddingBottom : '3em'}} key={"sysNumDiv"}>
                            <Table striped bordered hover style={{position: 'relative'}}>
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>2019 Billed Charges</th>
                                    <th>Estimated Annual</th>
                                    <th>Estimated Legacy</th>
                                    <th>Estimated Quarterly Value</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th>CC Charges</th>
                                    <td>$91,200,000</td>
                                    <td>$91,200,000</td>
                                    <td>$736,700,000</td>
                                    <td>$22,800,000</td>
                                </tr>
                                <tr>
                                    <th>UCC Charges</th>
                                    <td>$87,800,000</td>
                                    <td>$87,800,000</td>
                                    <td>$305,400,000</td>
                                    <td>$21,950,000</td>
                                </tr>
                                <tr>
                                    <th>Total</th>
                                    <th>$179,000,000</th>
                                    <th>$179,000,000</th>
                                    <th>$1,042,100,000</th>
                                    <th>$44,750,000</th>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div style={{paddingBottom : '3em'}} key={"Table2Div"}>
                            <Table striped bordered hover style={{position: 'relative'}}>
                                <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>2016</th>
                                    <th>2017</th>
                                    <th>2018</th>
                                    <th>2019</th>
                                    <th>Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Charity Charges</td>
                                    <td>$432,000,000</td>
                                    <td>$105,000,000</td>
                                    <td>$108,500,000</td>
                                    <td>$91,200,000</td>
                                    <td>$736,700,000</td>
                                </tr>
                                <tr>
                                    <td>UCC - Non-Medicare & Non-Reimbursable Bad Debt Costs</td>
                                    <td>$16,000,000</td>
                                    <td>$16,500,000</td>
                                    <td>$21,900,000</td>
                                    <td>$21,950,000</td>
                                    <td>$76,350,000</td>
                                </tr>
                                <tr>
                                    <td>UCC Charges</td>
                                    <td>$64,000,000</td>
                                    <td>$66,000,000</td>
                                    <td>$87,600,000</td>
                                    <td>$87,800,000</td>
                                    <td>$305,400,000</td>
                                </tr>
                                <tr>
                                    <th colSpan={"4"}>Total</th>
                                    <th>$179,000,000</th>
                                    <th>$1,042,100,000</th>
                                </tr>
                                </tbody>
                                <thead>
                                </thead>
                            </Table>
                        </div>
                        <div style={{paddingBottom : '3em'}} key={"Table3Div"}>
                            <Table striped bordered hover style={{position: 'relative'}}>
                                <thead>
                                <tr>
                                    <th>Client Values</th>
                                    <th>Legacy Accounts</th>
                                    <th>Quarterly Forward Flow</th>
                                    <th>Phase</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Client's Pursuable value</td>
                                    <td>{this.state.l1}</td>
                                    <td>{this.state.l4}</td>
                                    <td>Phase I</td>
                                </tr>
                                <tr>
                                    <td>Number of Pursuable accounts</td>
                                    <td>{this.state.l2}</td>
                                    <td>{this.state.w2}</td>
                                    <td>Phase I</td>
                                </tr>
                                <tr>
                                    <td>Average Visit Value (calculated from above)</td>
                                    <td>{this.state.w3}</td>
                                    <td>{this.state.w3}</td>
                                    <td>Phase I</td>
                                </tr>
                                <tr>
                                    <td>Average QI Value</td>
                                    <td>{this.state.w6}</td>
                                    <td>{this.state.w6}</td>
                                    <td>Phase I</td>
                                </tr>
                                <tr>
                                    <td>Actual Qualified Inventory</td>
                                    <td>{this.state.metrics[6].Actual}</td>
                                    <td>{this.state.metrics[6].Actual__1}</td>
                                    <td>Phase I</td>
                                </tr>
                                <tr>
                                    <td>Eligible for Insurance Discovery</td>
                                    <td>{this.state.metrics[9].Actual}</td>
                                    <td>{this.state.metrics[9].Actual__1}</td>
                                    <td>Phase I</td>
                                </tr>
                                <tr>
                                    <td>Courthouse Discovery Average Value</td>
                                    <td>{this.state.metrics[23].Actual}</td>
                                    <td>{this.state.metrics[23].Actual__1}</td>
                                    <td>Phase II</td>
                                </tr>
                                <tr>
                                    <td>Successful Insurance Discoveries</td>
                                    <td>{this.state.metrics[16].Actual}</td>
                                    <td>{this.state.metrics[16].Actual__1}</td>
                                    <td>Phase II</td>
                                </tr>
                                <tr>
                                    <td>Successful Courthouse Discoveries</td>
                                    <td>{this.state.metrics[24].Actual}</td>
                                    <td>{this.state.metrics[24].Actual__1}</td>
                                    <td>Phase II</td>
                                </tr>
                                <tr>
                                    <td>Verisk 1st Party Find Rate</td>
                                    <td>50%</td>
                                    <td>50%</td>
                                    <td>Phase II</td>
                                </tr>
                                <tr>
                                    <td>Verisk Pre-Lawsuit Find Rate (TPL)</td>
                                    <td>50%</td>
                                    <td>50%</td>
                                    <td>Phase II</td>
                                </tr>
                                <tr>
                                    <td>Approval (for accounts needing approval)</td>
                                    <td>90%</td>
                                    <td>90%</td>
                                    <td>Phase II</td>
                                </tr>
                                <tr>
                                    <td>Recovery Success Rate 1st party count</td>
                                    <td>61%</td>
                                    <td>61%</td>
                                    <td>Phase III</td>
                                </tr>
                                <tr>
                                    <td>Recovery Success Rate Pre-Lawsuit TPL count</td>
                                    <td>61%</td>
                                    <td>61%</td>
                                    <td>Phase III</td>
                                </tr>
                                <tr>
                                    <td>Recovery Success Rate Lawsuit TPL count</td>
                                    <td>61%</td>
                                    <td>61%</td>
                                    <td>Phase III</td>
                                </tr>
                                <tr>
                                    <td>Recovery Success Rate 1st party value</td>
                                    <td>35%</td>
                                    <td>35%</td>
                                    <td>Phase III</td>
                                </tr>
                                <tr>
                                    <td>Recovery Success Rate Pre-Lawsuit TPL value</td>
                                    <td>35%</td>
                                    <td>35%</td>
                                    <td>Phase III</td>
                                </tr>
                                <tr>
                                    <td>Recovery Success Rate Lawsuit TPL value</td>
                                    <td>35%</td>
                                    <td>35%</td>
                                    <td>Phase III</td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div style={{paddingRight : '80em', paddingBottom : '3em'}} key={"vendorTableDiv"}>
                            <BootstrapTable
                                striped
                                hover
                                keyField="vendor"
                                data={ this.state.rates }
                                columns={ columnsRates }
                                cellEdit={ cellEditFactory({ mode: 'dbclick', beforeSaveCell, afterSaveCell: this.handleChange }) }
                                key={"vendorTable"}
                            />
                        </div>
                        <div style={{paddingBottom : '3em'}} key={"driverTableDiv"}>
                            <BootstrapTable
                                striped
                                hover
                                keyField="Legacy / Lookback"
                                data={ this.state.metrics }
                                columns={ columns }
                                cellEdit={ cellEditFactory({ mode: 'dbclick', beforeSaveCell, afterSaveCell: this.handleChange,
                                    nonEditableRows: this.nonEditRws }) }
                                key={"driverTable"}
                            />
                        </div>
                    </TabPanel>
                    <TabPanel key={"cashFlowTab"}>
                        <h2>Cash Flow Summary</h2>
                        <Table responsive striped bordered hover style={{position: 'relative'}}>
                            <thead>
                            <tr>
                                <th>Assuming Legacy Data Received 12/30/2020</th>
                                <th>Quarter Ending March 21</th>
                                <th>Quarter Ending June 21</th>
                                <th>Quarter Ending September 21</th>
                                <th>Quarter Ending December 21</th>
                                <th>Year Ending December 21</th>
                                <th>Quarter Ending March 22</th>
                                <th>Quarter Ending June 22</th>
                                <th>Quarter Ending September 22</th>
                                <th>Quarter Ending December 22</th>
                                <th>Year Ending December 22</th>
                                <th>Quarter Ending March 23</th>
                                <th>Quarter Ending June 23</th>
                                <th>Quarter Ending  September 23</th>
                                <th>Quarter Ending December 23</th>
                                <th>Year Ending December 23</th>
                                <th>Total Through December 23</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Bills</td>
                                <td>{this.state.b1}</td>
                                <td>{this.state.b2}</td>
                                <td>{this.state.b3}</td>
                                <td>{this.state.b4}</td>
                                <th>{this.state.b5}</th>
                                <td>{this.state.b6}</td>
                                <td>{this.state.b7}</td>
                                <td>{this.state.b8}</td>
                                <td>{this.state.b9}</td>
                                <th>{this.state.b10}</th>
                                <td>{this.state.b11}</td>
                                <td>{this.state.b12}</td>
                                <td>{this.state.b13}</td>
                                <td>{this.state.b14}</td>
                                <th>{this.state.b15}</th>
                                <th>{this.state.b16}</th>
                            </tr>
                            <tr>
                                <td>Liens</td>
                                <td>{this.state.c1}</td>
                                <td>{this.state.c2}</td>
                                <td>{this.state.c3}</td>
                                <td>{this.state.c4}</td>
                                <th>{this.state.c5}</th>
                                <td>{this.state.c6}</td>
                                <td>{this.state.c7}</td>
                                <td>{this.state.c8}</td>
                                <td>{this.state.c9}</td>
                                <th>{this.state.c10}</th>
                                <td>{this.state.c11}</td>
                                <td>{this.state.c12}</td>
                                <td>{this.state.c13}</td>
                                <td>{this.state.c14}</td>
                                <th>{this.state.c15}</th>
                                <th>{this.state.c16}</th>
                            </tr>
                            <tr>
                                <td>Lawsuits</td>
                                <td>{this.state.d1}</td>
                                <td>{this.state.d2}</td>
                                <td>{this.state.d3}</td>
                                <td>{this.state.d4}</td>
                                <th>{this.state.d5}</th>
                                <td>{this.state.d6}</td>
                                <td>{this.state.d7}</td>
                                <td>{this.state.d8}</td>
                                <td>{this.state.d9}</td>
                                <th>{this.state.d10}</th>
                                <td>{this.state.d11}</td>
                                <td>{this.state.d12}</td>
                                <td>{this.state.d13}</td>
                                <td>{this.state.d14}</td>
                                <th>{this.state.d15}</th>
                                <th>{this.state.d16}</th>
                            </tr>
                            <tr>
                                <th>Total</th>
                                <td>{this.state.e1}</td>
                                <td>{this.state.e2}</td>
                                <td>{this.state.e3}</td>
                                <td>{this.state.e4}</td>
                                <th>{this.state.e5}</th>
                                <td>{this.state.e6}</td>
                                <td>{this.state.e7}</td>
                                <td>{this.state.e8}</td>
                                <td>{this.state.e9}</td>
                                <th>{this.state.e10}</th>
                                <td>{this.state.e11}</td>
                                <td>{this.state.e12}</td>
                                <td>{this.state.e13}</td>
                                <td>{this.state.e14}</td>
                                <th>{this.state.e15}</th>
                                <th>{this.state.e16}</th>
                            </tr>
                            <tr>
                                <th>Net to Client 65%</th>
                                <td>{this.state.f1}</td>
                                <td>{this.state.f2}</td>
                                <td>{this.state.f3}</td>
                                <td>{this.state.f4}</td>
                                <th>{this.state.f5}</th>
                                <td>{this.state.f6}</td>
                                <td>{this.state.f7}</td>
                                <td>{this.state.f8}</td>
                                <td>{this.state.f9}</td>
                                <th>{this.state.f10}</th>
                                <td>{this.state.f11}</td>
                                <td>{this.state.f12}</td>
                                <td>{this.state.f13}</td>
                                <td>{this.state.f14}</td>
                                <th>{this.state.f15}</th>
                                <th>{this.state.f16}</th>
                            </tr>
                            <tr>
                                <th>Discover Gross</th>
                                <td>{this.state.g1}</td>
                                <td>{this.state.g2}</td>
                                <td>{this.state.g3}</td>
                                <td>{this.state.g4}</td>
                                <th>{this.state.g5}</th>
                                <td>{this.state.g6}</td>
                                <td>{this.state.g7}</td>
                                <td>{this.state.g8}</td>
                                <td>{this.state.g9}</td>
                                <th>{this.state.g10}</th>
                                <td>{this.state.g11}</td>
                                <td>{this.state.g12}</td>
                                <td>{this.state.g13}</td>
                                <td>{this.state.g14}</td>
                                <th>{this.state.g15}</th>
                                <th>{this.state.g16}</th>
                            </tr>
                            <tr>
                                <th>Processing Fee @10%</th>
                                <td>{this.state.h1}</td>
                                <td>{this.state.h2}</td>
                                <td>{this.state.h3}</td>
                                <td>{this.state.h4}</td>
                                <th>{this.state.h5}</th>
                                <td>{this.state.h6}</td>
                                <td>{this.state.h7}</td>
                                <td>{this.state.h8}</td>
                                <td>{this.state.h9}</td>
                                <th>{this.state.h10}</th>
                                <td>{this.state.h11}</td>
                                <td>{this.state.h12}</td>
                                <td>{this.state.h13}</td>
                                <td>{this.state.h14}</td>
                                <th>{this.state.h15}</th>
                                <th>{this.state.h16}</th>
                            </tr>
                            <tr>
                                <th>Agent Fee @ 6% of DC Net</th>
                                <td>{this.state.i1}</td>
                                <td>{this.state.i2}</td>
                                <td>{this.state.i3}</td>
                                <td>{this.state.i4}</td>
                                <th>{this.state.i5}</th>
                                <td>{this.state.i6}</td>
                                <td>{this.state.i7}</td>
                                <td>{this.state.i8}</td>
                                <td>{this.state.i9}</td>
                                <th>{this.state.i10}</th>
                                <td>{this.state.i11}</td>
                                <td>{this.state.i12}</td>
                                <td>{this.state.i13}</td>
                                <td>{this.state.i14}</td>
                                <th>{this.state.i15}</th>
                                <th>{this.state.i16}</th>
                            </tr>
                            <tr>
                                <th>Data Cost</th>
                                <td>{this.state.j1}</td>
                                <td>{this.state.j2}</td>
                                <td>{this.state.j3}</td>
                                <td>{this.state.j4}</td>
                                <th>{this.state.j5}</th>
                                <td>{this.state.j6}</td>
                                <td>{this.state.j7}</td>
                                <td>{this.state.j8}</td>
                                <td>{this.state.j9}</td>
                                <th>{this.state.j10}</th>
                                <td>{this.state.j11}</td>
                                <td>{this.state.j12}</td>
                                <td>{this.state.j13}</td>
                                <td>{this.state.j14}</td>
                                <th>{this.state.j15}</th>
                                <th>{this.state.j16}</th>
                            </tr>
                            <tr>
                                <th>Total Cost</th>
                                <td></td>
                                <td>{this.state.k2}</td>
                                <td>{this.state.k3}</td>
                                <td>{this.state.k4}</td>
                                <th>{this.state.k5}</th>
                                <td>{this.state.k6}</td>
                                <td>{this.state.k7}</td>
                                <td>{this.state.k8}</td>
                                <td>{this.state.k9}</td>
                                <th>{this.state.k10}</th>
                                <td>{this.state.k11}</td>
                                <td>{this.state.k12}</td>
                                <td>{this.state.k13}</td>
                                <td>{this.state.k14}</td>
                                <th>{this.state.k15}</th>
                                <th>{this.state.k16}</th>
                            </tr>
                            <tr>
                                <th>Discover Claims EBITDA Return</th>
                                <td>{this.state.kk1}</td>
                                <td>{this.state.kk2}</td>
                                <td>{this.state.kk3}</td>
                                <td>{this.state.kk4}</td>
                                <th>{this.state.kk5}</th>
                                <td>{this.state.kk6}</td>
                                <td>{this.state.kk7}</td>
                                <td>{this.state.kk8}</td>
                                <td>{this.state.kk9}</td>
                                <th>{this.state.kk10}</th>
                                <td>{this.state.kk11}</td>
                                <td>{this.state.kk12}</td>
                                <td>{this.state.kk13}</td>
                                <td>{this.state.kk14}</td>
                                <th>{this.state.kk15}</th>
                                <th>{this.state.kk16}</th>
                            </tr>
                            </tbody>
                        </Table>
                    </TabPanel>
                    <TabPanel key={"legLookbackTab"}>
                        <h2>Legacy Look Back</h2>
                        <div style={{paddingBottom: '3em'}} key={"LegLookDiv"}>
                            <Table striped bordered hover style={{position: 'relative'}}>
                                <thead>
                                <tr>
                                    <th>Stage</th>
                                    <th>Total Billed Charges Charity</th>
                                    <th>Number of Patient Accounts</th>
                                    <th>Average Value</th>
                                    <th>As a % of Previous Stage</th>
                                    <th>Cash Recovery</th>
                                    <th>% of Total UCC</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>No Patient Contact or TPL Insurance Found</td>
                                    <td>{this.state.l1}</td>
                                    <td>{this.state.l2}</td>
                                    <td>{this.state.l3}</td>
                                    <td></td>
                                    <td></td>
                                    <td>100%</td>
                                </tr>
                                <tr>
                                    <td>Qualified Inventory "QI"</td>
                                    <td>{this.state.l4}</td>
                                    <td>{this.state.l5}</td>
                                    <td>{this.state.l6}</td>
                                    <td>{this.state.metrics[6].Actual}</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Eligible for Insurance Discovery</td>
                                    <td>{this.state.l8}</td>
                                    <td>{this.state.l9}</td>
                                    <td></td>
                                    <td>{this.state.metrics[9].Actual}</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Successful Insurance Discoveries</td>
                                    <td>{this.state.l11}</td>
                                    <td>{this.state.l12}</td>
                                    <td>{this.state.l13}</td>
                                    <td>{this.state.metrics[16].Actual}</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Eligible for Courthouse Discovery</td>
                                    <td>{this.state.l15}</td>
                                    <td>{this.state.l16}</td>
                                    <td></td>
                                    <td>Calculation</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Successful Courthouse Discoveries</td>
                                    <td>{this.state.l17}</td>
                                    <td>{this.state.l18}</td>
                                    <td>{this.state.l19}</td>
                                    <td>{this.state.metrics[24].Actual}</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Bills - 1st Party Insurance Claims (Insurance Discoveries)</td>
                                    <td>{this.state.l21}</td>
                                    <td>{this.state.l22}</td>
                                    <td>{this.state.l23}</td>
                                    <td>Recovered Value @ 35% of billed charges</td>
                                    <td>{this.state.l24}</td>
                                    <td>{this.state.l25}</td>
                                </tr>
                                <tr>
                                    <td>Liens - 3rd Party Claims & Lawsuits (Insurance Discoveries)</td>
                                    <td>{this.state.l26}</td>
                                    <td>{this.state.l27}</td>
                                    <td>{this.state.l28}</td>
                                    <td>Recovered Value @ 35% of billed charges</td>
                                    <td>{this.state.l29}</td>
                                    <td>{this.state.l30}</td>
                                </tr>
                                <tr>
                                    <td>Liens - Lawsuit (Courthouse Discoveries)</td>
                                    <td>{this.state.l31}</td>
                                    <td>{this.state.l32}</td>
                                    <td>{this.state.l33}</td>
                                    <td>Recovered Value @ 35% of billed charges</td>
                                    <td>{this.state.l34}</td>
                                    <td>{this.state.l35}</td>
                                </tr>
                                <tr>
                                    <th colSpan={5}>Total Recovery</th>
                                    <th>{this.state.l36}</th>
                                    <th>{this.state.l37}</th>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div style={{float: 'left', paddingLeft: '1em'}} key={"bottomTableDiv"}>
                            <Table striped bordered hover style={{position: 'relative'}}>
                                <thead>
                                <tr>
                                    <td>Recovery Period Lawsuit Liens</td>
                                    <td>Recovery Period Claims Liens</td>
                                    <td>Recovery Period Claim Bills</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Lawsuit Liens year 1 - 50%</td>
                                    <td>Claims Liens year 1 - 50%</td>
                                    <td>Claim Bills year 1 - 90%</td>
                                </tr>
                                <tr>
                                    <td>Lawsuit Liens year 2 - 25%</td>
                                    <td>Claims Liens year 2 - 42%</td>
                                    <td>Claim Bills year 2 - 10%</td>
                                </tr>
                                <tr>
                                    <td>Lawsuit Liens year 3 - 20%</td>
                                    <td>Claims Liens year 3 - 8%</td>
                                    <td>0%</td>
                                </tr>
                                <tr>
                                    <td>Lawsuit Liens year 3+ - 5%</td>
                                    <td>0%</td>
                                    <td>0%</td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                    </TabPanel>
                    <TabPanel key={"quartForwardFlTab"}>
                        <h2>Quarterly Forward Flow</h2>
                        <div style={{paddingBottom: '3em'}} key={"FFDiv"}>
                            <Table striped bordered hover style={{position: 'relative'}}>
                                <thead>
                                <tr>
                                    <th>Stage</th>
                                    <th>Total Billed Charges Charity</th>
                                    <th>Number of Patient Accounts</th>
                                    <th>Average Value</th>
                                    <th>As a % of Previous Stage</th>
                                    <th>Cash Recovery</th>
                                    <th>% of Total UCC</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>No Patient Contact or TPL Insurance Found</td>
                                    <td>{this.state.w1}</td>
                                    <td>{this.state.w2}</td>
                                    <td>{this.state.w3}</td>
                                    <td></td>
                                    <td></td>
                                    <td>100%</td>
                                </tr>
                                <tr>
                                    <td>Qualified Inventory "QI"</td>
                                    <td>{this.state.w4}</td>
                                    <td>{this.state.w5}</td>
                                    <td>{this.state.w6}</td>
                                    <td>{this.state.metrics[6].Actual__1}</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Eligible for Insurance Discovery</td>
                                    <td>{this.state.w8}</td>
                                    <td>{this.state.w9}</td>
                                    <td></td>
                                    <td>{this.state.metrics[9].Actual__1}</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Successful Insurance Discoveries</td>
                                    <td>{this.state.w11}</td>
                                    <td>{this.state.w12}</td>
                                    <td>{this.state.w13}</td>
                                    <td>{this.state.metrics[16].Actual__1}</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Eligible for Courthouse Discovery</td>
                                    <td>{this.state.w15}</td>
                                    <td>{this.state.w16}</td>
                                    <td></td>
                                    <td>Calculation</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Successful Courthouse Discoveries</td>
                                    <td>{this.state.w17}</td>
                                    <td>{this.state.w18}</td>
                                    <td>{this.state.w19}</td>
                                    <td>{this.state.metrics[24].Actual__1}</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Bills - 1st Party Insurance Claims (Insurance Discoveries)</td>
                                    <td>{this.state.w21}</td>
                                    <td>{this.state.w22}</td>
                                    <td>{this.state.w23}</td>
                                    <td>Recovered Value @ 35% of billed charges</td>
                                    <td>{this.state.w24}</td>
                                    <td>{this.state.w25}</td>
                                </tr>
                                <tr>
                                    <td>Liens - 3rd Party Claims & Lawsuits (Insurance Discoveries)</td>
                                    <td>{this.state.w26}</td>
                                    <td>{this.state.w27}</td>
                                    <td>{this.state.w28}</td>
                                    <td>Recovered Value @ 35% of billed charges</td>
                                    <td>{this.state.w29}</td>
                                    <td>{this.state.w30}</td>
                                </tr>
                                <tr>
                                    <td>Liens - Lawsuit (Courthouse Discoveries)</td>
                                    <td>{this.state.w31}</td>
                                    <td>{this.state.w32}</td>
                                    <td>{this.state.w33}</td>
                                    <td>Recovered Value @ 35% of billed charges</td>
                                    <td>{this.state.w34}</td>
                                    <td>{this.state.w35}</td>
                                </tr>
                                <tr>
                                    <th colSpan={5}>Total Recovery</th>
                                    <th>{this.state.w36}</th>
                                    <th>{this.state.w37}</th>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div style={{float: 'left', paddingLeft: '1em', paddingBottom: '3em'}} key={"bottomTableDiv2"}>
                            <Table striped bordered hover style={{position: 'relative'}}>
                                <thead>
                                <tr>
                                    <td>Recovery Period Lawsuit Liens</td>
                                    <td>Recovery Period Claims Liens</td>
                                    <td>Recovery Period Claim Bills</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Lawsuit Liens year 1 - 50%</td>
                                    <td>Claims Liens year 1 - 50%</td>
                                    <td>Claim Bills year 1 - 90%</td>
                                </tr>
                                <tr>
                                    <td>Lawsuit Liens year 2 - 25%</td>
                                    <td>Claims Liens year 2 - 42%</td>
                                    <td>Claim Bills year 2 - 10%</td>
                                </tr>
                                <tr>
                                    <td>Lawsuit Liens year 3 - 20%</td>
                                    <td>Claims Liens year 3 - 8%</td>
                                    <td>0%</td>
                                </tr>
                                <tr>
                                    <td>Lawsuit Liens year 3+ - 5%</td>
                                    <td>0%</td>
                                    <td>0%</td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div style={{paddingBottom:'5em'}} key={"lastTableDiv"}>
                            <Table responsive striped bordered hover style={{position: 'relative'}}>
                                <thead>
                                <tr>
                                    <td></td>
                                    <td>Quarter 1</td>
                                    <td>Quarter 2</td>
                                    <td>Quarter 3</td>
                                    <td>Quarter 4</td>
                                    <th>Year 1</th>
                                    <td>Quarter 5</td>
                                    <td>Quarter 6</td>
                                    <td>Quarter 7</td>
                                    <td>Quarter 8</td>
                                    <th>Year 2</th>
                                    <td>Quarter 9</td>
                                    <td>Quarter 10</td>
                                    <td>Quarter 11</td>
                                    <td>Quarter 12</td>
                                    <th>Year 3</th>
                                    <td>Year 3+ Remaining</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Recovery Period Claim Bills</td>
                                    <td>0.000%</td>
                                    <td>27.000%</td>
                                    <td>29.700%</td>
                                    <td>33.300%</td>
                                    <td>90.000%</td>
                                    <td>2.800%</td>
                                    <td>2.700%</td>
                                    <td>2.700%</td>
                                    <td>1.800%</td>
                                    <td>10.000%</td>
                                    <td>0.000%</td>
                                    <td>0.000%</td>
                                    <td>0.000%</td>
                                    <td>0.000%</td>
                                    <td>0.000%</td>
                                    <td>0.000%</td>
                                </tr>
                                <tr>
                                    <td>Recovery Period Claim Liens</td>
                                    <td>0.000%</td>
                                    <td>12.500%</td>
                                    <td>15.000%</td>
                                    <td>22.500%</td>
                                    <td>50.000%</td>
                                    <td>21.250%</td>
                                    <td>14.500%</td>
                                    <td>3.750%</td>
                                    <td>2.500%</td>
                                    <td>42.000%</td>
                                    <td>2.100%</td>
                                    <td>2.100%</td>
                                    <td>2.100%</td>
                                    <td>1.700%</td>
                                    <td>8.000%</td>
                                    <td>0.000%</td>
                                </tr>
                                <tr>
                                    <td>Recovery Period Lawsuit Liens</td>
                                    <td>0.000%</td>
                                    <td>12.500%</td>
                                    <td>15.000%</td>
                                    <td>22.500%</td>
                                    <td>50.000%</td>
                                    <td>8.250%</td>
                                    <td>8.250%</td>
                                    <td>4.500%</td>
                                    <td>4.000%</td>
                                    <td>25.000%</td>
                                    <td>5.000%</td>
                                    <td>5.000%</td>
                                    <td>5.000%</td>
                                    <td>5.000%</td>
                                    <td>20.000%</td>
                                    <td>5.000%</td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}