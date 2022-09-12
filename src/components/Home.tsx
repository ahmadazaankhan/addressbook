import * as React from 'react';
import * as ReactDOM from 'react-dom';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {Container, Row, Table, Modal} from 'react-bootstrap';


type stateVar = {
    model_show: boolean;
    items: any;
    item: any;
    list: any;
    search_term: string;
    loading: boolean;
}
type PropsVar = {}

class Home extends React.Component <PropsVar, stateVar> {
    constructor(props: any) {
        super(props);
        this.searchData = this.searchData.bind(this);
    }

    state: stateVar = {
        model_show: false,
        loading: false,
        items: undefined,
        item: undefined,
        search_term: undefined,
        list:undefined
    }
    componentDidMount() {
        this.loadData();
    }
    componentDidUpdate(prevProps: Readonly<PropsVar>, prevState: Readonly<stateVar>, snapshot?: any) {
    }

    setModalShow(modelshow: boolean, item: any) {
        this.setState({
            model_show: modelshow, item: item
        })
    }
    searchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value:string =e.currentTarget.value;
        this.setState({
            search_term: value
        })
        if(value=="")
        {
            this.searchData();
        }
    }
    searchData(){
        let i=0;
        if(this.state.search_term==undefined || this.state.search_term=="")
        {
            const showModal:any = this.setModalShow.bind(this);

            let listData=this.state.items.map(function(data:any){
                i++;
                return (<tr key={i} onClick={() => showModal(true,data)}>
                    <td>
                        <img
                            alt={data.name.first}
                            src={data.picture.thumbnail}
                            width="30"
                            height="30"
                            className="img-thumbnail d-inline-block align-top"
                        /></td>
                    <td>{data.name.first}</td>
                    <td>{data.name.last}</td>
                    <td>{data.login.username}</td>
                    <td>{data.email}</td>
                </tr>);
            });
            this.setState({list:listData});
        }
        else
        {
            const showModal:any = this.setModalShow.bind(this);
            let listData=this.state.items.filter((item:any) => item.name.first.includes(this.state.search_term) || item.name.last.includes(this.state.search_term)).map(function(data:any){
                i++;
                return (<tr key={i} onClick={() => showModal(true,data)}>
                    <td>
                        <img
                            alt={data.name.first}
                            src={data.picture.thumbnail}
                            width="30"
                            height="30"
                            className="img-thumbnail d-inline-block align-top"
                        /></td>
                    <td>{data.name.first}</td>
                    <td>{data.name.last}</td>
                    <td>{data.login.username}</td>
                    <td>{data.email}</td>
                </tr>);
            });
            this.setState({list:listData});
        }
    }

    async loadData(){
        const response = await fetch('https://randomuser.me/api/?results=1000'); // 4
        const data= await response.json();
        await this.setState({items:data.results,loading:true});
        console.log(this.state.items[0]);
        const showModal:any = this.setModalShow.bind(this);
        let i=0;
        let listData=this.state.items.map(function(data:any){
            i++;
            return (<tr key={i} onClick={() => showModal(true,data)}>
                <td>
                    <img
                    alt={data.name.first}
                    src={data.picture.thumbnail}
                    width="30"
                    height="30"
                    className="img-thumbnail d-inline-block align-top"
                /></td>
                <td>{data.name.first}</td>
                <td>{data.name.last}</td>
                <td>{data.login.username}</td>
                <td>{data.email}</td>
            </tr>);
        });
        this.setState({list:listData});
        return true;
    }
    render(): React.ReactNode {
        return (
            <>
                <div className="Breadcrumbs">
                    <div className="container">
                        <div className="row h-100 justify-content-center align-items-center"></div>
                        <InputGroup className="col-6">
                            <FormControl
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="basic-addon2" value={this.state.search_term} onChange={this.searchChange}
                            />
                            <Button onClick={this.searchData} variant="dark" id="button-addon2">
                                Search
                            </Button>
                        </InputGroup>
                    </div>
                </div>

                <Container>
                    <Row>
                        <h2 className='text-center'>
                            Address Book List
                        </h2>
                    </Row>

                    <Row>
                        <Table striped bordered hover variant="dark">
                            <thead>
                            <tr>
                                <th></th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th>Email Address</th>
                            </tr>
                            </thead>
                            <tbody>
                            { this.state.list}
                            </tbody>
                        </Table>
                    </Row>
                </Container>
                <DetailModal
                    show={this.state.model_show}
                    item={this.state.item}
                    onHide={() => this.setModalShow(false,undefined)}
                />
            </>
        );

    }
}

export default Home;

function DetailModal(props: any) {
    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.item ? props.item.name.first +" "+props.item.name.last : ""}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Details</h4>
                    <Table striped bordered hover>
                        <tr>
                            <th>Street</th>
                            <th>{props.item ? props.item.location.street.name +" Number #" +props.item.location.street.number : " "}</th>
                            <th>City</th>
                            <th>{props.item ? props.item.location.city : " "}</th>
                        </tr>
                        <tr>
                            <th>State</th>
                            <th>{props.item ? props.item.location.state : " "}</th>
                            <th>Postal Code</th>
                            <th>{props.item ? props.item.location.postcode : " "}</th>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <th>{props.item ? props.item.phone : " "}</th>
                            <th>Cell</th>
                            <th>{props.item ? props.item.cell : " "}</th>
                        </tr>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}