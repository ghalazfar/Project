import React, { Component } from 'react';
import axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl.js'
import { Carousel, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom'
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
                <h1 style={{ textAlign: "center", fontWeight: "bold" }}>T-SHIRT COLLECTION</h1>
                <div className="col-sm-push-2 col-sm-10 col-xs-12">
                    <div className="col-lg-2 col-xs-12">
                        <Link to='/productdetail'>
                            <Panel style={{ marginLeft: "-15px", marginRight: "-16px", marginBottom: "-1px" }}>                            
                                <Panel.Body>
                                    <img className="col-lg-12 col-xs-6" href="#" alt="" src={tshirt} style={{ width: "181px", marginBottom: "20px", marginLeft: "-15px" }}/>
                                    <p style={{fontWeight: "bold", fontSize: "small", paddingBottom: "20px", marginLeft: "-15px" }} className="col-lg-12 col-xs-6" >PRODUCT NAME</p>
                                    <p style={{textAlign: "right", position: "absolute", bottom: "0", right: "9px" }}><mark style={{ fontSize: "small" }} >20.000 IDR</mark></p>                                  
                                </Panel.Body>                                                       
                            </Panel>
                        </Link>
                    </div>
                    <div className="col-lg-2 col-xs-12">
                        <Link to='/productdetail'>
                            <Panel style={{ marginLeft: "-15px", marginRight: "-16px", marginBottom: "-1px" }}>                            
                                <Panel.Body>
                                    <img className="col-lg-12 col-xs-6" href="#" alt="" src={tshirt} style={{ width: "181px", marginBottom: "20px", marginLeft: "-15px" }}/>
                                    <p style={{fontWeight: "bold", fontSize: "small", paddingBottom: "20px", marginLeft: "-15px" }} className="col-lg-12 col-xs-6" >PRODUCT NAME</p>
                                    <p style={{textAlign: "right", position: "absolute", bottom: "0", right: "9px" }}><mark style={{ fontSize: "small" }} >20.000 IDR</mark></p>                                  
                                </Panel.Body>                                                       
                            </Panel>
                        </Link>
                    </div>
                    <div className="col-lg-2 col-xs-12">
                        <Link to='/productdetail'>
                            <Panel style={{ marginLeft: "-15px", marginRight: "-16px", marginBottom: "-1px" }}>                            
                                <Panel.Body>
                                    <img className="col-lg-12 col-xs-6" href="#" alt="" src={tshirt} style={{ width: "181px", marginBottom: "20px", marginLeft: "-15px" }}/>
                                    <p style={{fontWeight: "bold", fontSize: "small", paddingBottom: "20px", marginLeft: "-15px" }} className="col-lg-12 col-xs-6" >PRODUCT NAME</p>
                                    <p style={{textAlign: "right", position: "absolute", bottom: "0", right: "9px" }}><mark style={{ fontSize: "small" }} >20.000 IDR</mark></p>                                  
                                </Panel.Body>                                                       
                            </Panel>
                        </Link>
                    </div>
                    <div className="col-lg-2 col-xs-12">
                        <Link to='/productdetail'>
                            <Panel style={{ marginLeft: "-15px", marginRight: "-16px", marginBottom: "-1px" }}>                            
                                <Panel.Body>
                                    <img className="col-lg-12 col-xs-6" href="#" alt="" src={tshirt} style={{ width: "181px", marginBottom: "20px", marginLeft: "-15px" }}/>
                                    <p style={{fontWeight: "bold", fontSize: "small", paddingBottom: "20px", marginLeft: "-15px" }} className="col-lg-12 col-xs-6" >PRODUCT NAME</p>
                                    <p style={{textAlign: "right", position: "absolute", bottom: "0", right: "9px" }}><mark style={{ fontSize: "small" }} >20.000 IDR</mark></p>                                  
                                </Panel.Body>                                                       
                            </Panel>
                        </Link>
                    </div>
                    <div className="col-lg-2 col-xs-12">
                        <Link to='/productdetail'>
                            <Panel style={{ marginLeft: "-15px", marginRight: "-16px", marginBottom: "-1px" }}>                            
                                <Panel.Body>
                                    <img className="col-lg-12 col-xs-6" href="#" alt="" src={tshirt} style={{ width: "181px", marginBottom: "20px", marginLeft: "-15px" }}/>
                                    <p style={{fontWeight: "bold", fontSize: "small", paddingBottom: "20px", marginLeft: "-15px" }} className="col-lg-12 col-xs-6" >PRODUCT NAME</p>
                                    <p style={{textAlign: "right", position: "absolute", bottom: "0", right: "9px" }}><mark style={{ fontSize: "small" }} >20.000 IDR</mark></p>                                  
                                </Panel.Body>                                                       
                            </Panel>
                        </Link>
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