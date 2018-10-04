import React, { Component } from 'react';
import axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl.js'
import { Carousel, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import carouselimg from '../supports/img/carousel.jpg';
import tshirt from '../supports/img/tshirt.jpg';

class HomePage extends Component {
    renderHomePage() {
        return (
            <div className="container-fluid" style={{marginTop: "-20px", marginLeft: "-15px", marginRight: "-15px"}}>
            <Carousel interval="3500" controls={false} >
                <Carousel.Item>
                    <img src={carouselimg} />
                </Carousel.Item>
                <Carousel.Item>
                    <img src={carouselimg} />
                </Carousel.Item>
                <Carousel.Item>
                    <img src={carouselimg} />
                </Carousel.Item>
            </Carousel>
            <div>
                <h1>T-SHIRT COLLECTION</h1>
                <div className="col-sm-push-2 col-sm-10 col-xs-12">
                    <div className="col-lg-2 col-xs-12">
                        <Panel style={{ marginLeft: "-15px", marginRight: "-16px", marginBottom: "-1px" }}>
                            <Panel.Body>
                                <img className="col-lg-12 col-xs-6" href="#" alt="" src={tshirt} style={{ width: "150px"}}/>
                                <p style={{fontWeight: "bold", fontSize: "small" }} className="col-lg-12 col-xs-6" >PRODUCT NAME</p>
                                <div className="col-xs-12">
                                    <mark style={{ fontSize: "small" }} className="col-sm-12 col-sm-offset-0 col-xs-offset-8 col-xs-4">20.000 IDR</mark>
                                </div>
                            </Panel.Body>                                
                        </Panel>
                    </div>
                    <div className="col-lg-2 col-xs-12">
                        <Panel style={{ marginLeft: "-15px", marginRight: "-16px", marginBottom: "-1px" }}>
                            <Panel.Body>
                                <img className="col-lg-12 col-xs-6" href="#" alt="" src={tshirt} style={{ width: "150px"}}/>
                                <p style={{fontWeight: "bold", fontSize: "small" }} className="col-lg-12 col-xs-6" >PRODUCT NAME</p>
                                <div className="col-xs-12">
                                    <mark style={{ fontSize: "small" }} className="col-sm-12 col-sm-offset-0 col-xs-offset-8 col-xs-4">20.000 IDR</mark>
                                </div>
                            </Panel.Body>                                
                        </Panel>
                    </div>
                    <div className="col-lg-2 col-xs-12">
                        <Panel style={{ marginLeft: "-15px", marginRight: "-16px", marginBottom: "-1px" }}>
                            <Panel.Body>
                                <img className="col-lg-12 col-xs-6" href="#" alt="" src={tshirt} style={{ width: "150px"}}/>
                                <p style={{fontWeight: "bold", fontSize: "small" }} className="col-lg-12 col-xs-6" >PRODUCT NAME</p>
                                <div className="col-xs-12">
                                    <mark style={{ fontSize: "small" }} className="col-sm-12 col-sm-offset-0 col-xs-offset-8 col-xs-4">20.000 IDR</mark>
                                </div>
                            </Panel.Body>                                
                        </Panel>
                    </div>
                    <div className="col-lg-2 col-xs-12">
                        <Panel style={{ marginLeft: "-15px", marginRight: "-16px", marginBottom: "-1px" }}>
                            <Panel.Body>
                                <img className="col-lg-12 col-xs-6" href="#" alt="" src={tshirt} style={{ width: "150px"}}/>
                                <p style={{fontWeight: "bold", fontSize: "small" }} className="col-lg-12 col-xs-6" >PRODUCT NAME</p>
                                <div className="col-xs-12">
                                    <mark style={{ fontSize: "small" }} className="col-sm-12 col-sm-offset-0 col-xs-offset-8 col-xs-4">20.000 IDR</mark>
                                </div>
                            </Panel.Body>                                
                        </Panel>
                    </div>
                    <div className="col-lg-2 col-xs-12">
                        <Panel style={{ marginLeft: "-15px", marginRight: "-16px", marginBottom: "-1px" }}>
                            <Panel.Body>
                                <img className="col-lg-12 col-xs-6" href="#" alt="" src={tshirt} style={{ width: "150px"}}/>
                                <p style={{fontWeight: "bold", fontSize: "small" }} className="col-lg-12 col-xs-6" >PRODUCT NAME</p>
                                <div className="col-xs-12">
                                    <mark style={{ fontSize: "small" }} className="col-sm-12 col-sm-offset-0 col-xs-offset-8 col-xs-4">20.000 IDR</mark>
                                </div>
                            </Panel.Body>                                
                        </Panel>
                    </div>
                </div>
            </div>
        </div>
        )
    }
    render() {
        return (
            this.renderHomePage()
        )
    }
}

export default HomePage