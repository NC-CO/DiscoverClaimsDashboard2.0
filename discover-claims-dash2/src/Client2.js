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

export default class Client2 extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="client2App">
                {this.write()}
            </div>
        )
    }
    write() {
        console.log("Yes!")
    }
}