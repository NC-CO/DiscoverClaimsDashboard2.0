import React, {Component} from 'react';
import { Container, Row, Col, Input, InputGroup, FormGroup, Label, Button, ButtonGroup, ListGroup, ListGroupItem, Collapse, CustomInput} from 'reactstrap';
import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import ReactDOM from 'react-dom';
import Client1 from "./Client1";
import Client2 from "./Client2";

class DropDown extends Component {
    onChange = (e) => {
        this.props.history.push(`/${e.target.value}`);
    }
    render() {
        return (
            <div>
            <div style={{paddingTop: "1.5em"}} key={"saveDivKeyStylingOuter"}>
                <Table borderless>
                    <tbody>
                    <tr>
                        <th>Opportunity Assessment Calculator</th>
                    </tr>
                    </tbody>
                </Table>
            </div>
            <Form style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Form.Group controlId="selectHospital.ControlSelect1">
                    <Form.Label style={{fontSize:"16px"}}>Select Client</Form.Label>
                    <Input className="btn-csu" type={"select"} name={"select"} style={{position: "relative", fontSize: 18, width: "370px"}}
                           onChange={this.onChange}>
                        <option value={"OpportunityAssessmentCalculator"}>Opportunity Assessment Calculator</option>
                        <option value={"BarnabasHealth"}>Barnabas Health</option>
                        <option value={"BonSecours"}>Bon Secours</option>
                        <option value={"Hackensack"}>Hackensack</option>
                        <option value={"Jamaica"}>Jamaica</option>
                        <option value={"JTMather"}>JT Mather</option>
                        <option value={"Meridian"}>Meridian</option>
                        <option value={"RobertWoodJohnsonHealthSystem"}>Robert Wood Johnson Health System</option>
                        <option value={"St.BarnabasHospital"}>St. Barnabas Hospital</option>
                        <option value={"StamfordHealth"}>Stamford Health</option>
                        <option value={"TexasHealthResources"}>Texas Health Resources</option>
                        <option value={"UnityHealth"}>Unity Health</option>
                    </Input>
                </Form.Group>
            </Form>
            </div>
        )
    }
}
const Menu = withRouter(DropDown);

function App(){
        return(
            <BrowserRouter>
                <div className="App" style={{margin: '0', height: '100vh', width: '100%'}} id={'pageID'} key={"SaveDivKey"}>
                    <Menu />
                    <Route path="/OpportunityAssessmentCalculator" render={() => <Client1 />}/>
                    <Route path="/BarnabasHealth" render={() => <Client2 />}/>
                </div>
            </BrowserRouter>
        );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
export default App;
