import React, { Component } from 'react';
import axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl.js'
import { Carousel, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import carouselimg from '../supports/img/carousel.jpg';
import tshirt from '../supports/img/tshirt.jpg';
import loadinggif from '../supports/img/loading.gif';

class HomePage extends Component {
    state = {
        carousel: ''
    }

    componentWillMount() {
        axios.get(API_URL_1 +'/home'
        ).then(res => {
            console.log(res.data)
        this.setState({ carousel: res.data })
        })
    }
    
    renderHomePage() {
        return (
            <div className="container-fluid" style={{marginTop: "-20px", marginLeft: "-15px", marginRight: "-15px"}}>
            <Carousel interval="3500" controls={false} >
                <Carousel.Item>
                    <a href={this.state.carousel[0].link}><img src={this.state.carousel[0].image} /></a>
                </Carousel.Item>
                <Carousel.Item>
                    <a href={this.state.carousel[1].link}><img src={this.state.carousel[1].image} /></a>
                </Carousel.Item>
                <Carousel.Item>
                    <a href={this.state.carousel[2].link}><img src={this.state.carousel[2].image} /></a>
                </Carousel.Item>
            </Carousel>
            <div>
                <h1 style={{ textAlign: "center", fontWeight: "bold" }}>NEW MEN COLLECTION</h1>
                <div className="col-sm-push-2 col-sm-10 col-xs-12">
                    <div className="col-lg-2 col-xs-12">
                        <Link to='/productdetail?id=7'>
                            <Panel style={{ marginLeft: "-15px", marginRight: "-16px", marginBottom: "-1px" }}>                            
                                <Panel.Body>
                                    <img className="col-lg-12 col-xs-6" href="#" alt="" src="https://i.imgur.com/g9amdfA.jpg" style={{ width: "181px", marginBottom: "20px", marginLeft: "-15px" }}/>
                                    <p style={{fontWeight: "bold", fontSize: "small", paddingBottom: "20px", marginLeft: "-15px" }} className="col-lg-12 col-xs-6" >ACRONYM J69-GT Gore-Tex Jacket</p>
                                    <p style={{textAlign: "right", position: "absolute", bottom: "0", right: "9px" }}><mark style={{ fontSize: "small" }} >IDR 23990000</mark></p>                                  
                                </Panel.Body>                                                       
                            </Panel>
                        </Link>
                    </div>
                    <div className="col-lg-2 col-xs-12">
                        <Link to='/productdetail?id=11'>
                            <Panel style={{ marginLeft: "-15px", marginRight: "-16px", marginBottom: "-1px" }}>                            
                                <Panel.Body>
                                    <img className="col-lg-12 col-xs-6" href="#" alt="" src="https://acrnm.com/content/images/product/289/6250/9d0e3e0023_w710.jpg" style={{ width: "181px", marginBottom: "20px", marginLeft: "-15px" }}/>
                                    <p style={{fontWeight: "bold", fontSize: "small", paddingBottom: "20px", marginLeft: "-15px" }} className="col-lg-12 col-xs-6" >ACRONYM  S8-DS Jersey Tank Top </p>
                                    <p style={{textAlign: "right", position: "absolute", bottom: "0", right: "9px" }}><mark style={{ fontSize: "small" }} >IDR 11900000</mark></p>                                  
                                </Panel.Body>                                                       
                            </Panel>
                        </Link>
                    </div>
                    <div className="col-lg-2 col-xs-12">
                        <Link to='/productdetail?id=17'>
                            <Panel style={{ marginLeft: "-15px", marginRight: "-16px", marginBottom: "-1px" }}>                            
                                <Panel.Body>
                                    <img className="col-lg-12 col-xs-6" href="#" alt="" src="https://i.imgur.com/8QRqkmh.jpg" style={{ width: "181px", marginBottom: "20px", marginLeft: "-15px" }}/>
                                    <p style={{fontWeight: "bold", fontSize: "small", paddingBottom: "20px", marginLeft: "-15px" }} className="col-lg-12 col-xs-6" >NikeLab ACG Gore-Tex Jacket </p>
                                    <p style={{textAlign: "right", position: "absolute", bottom: "0", right: "9px" }}><mark style={{ fontSize: "small" }} >IDR 7890000</mark></p>                                  
                                </Panel.Body>                                                       
                            </Panel>
                        </Link>
                    </div>
                    <div className="col-lg-2 col-xs-12">
                        <Link to='/productdetail?id=13'>
                            <Panel style={{ marginLeft: "-15px", marginRight: "-16px", marginBottom: "-1px" }}>                            
                                <Panel.Body>
                                    <img className="col-lg-12 col-xs-6" href="#" alt="" src="https://acrnm.com/content/images/product/313/5988/528fa8f934_w710.jpg" style={{ width: "181px", marginBottom: "20px", marginLeft: "-15px" }}/>
                                    <p style={{fontWeight: "bold", fontSize: "small", paddingBottom: "20px", marginLeft: "-15px" }} className="col-lg-12 col-xs-6" >ACRONYM P27H-DS Trouser </p>
                                    <p style={{textAlign: "right", position: "absolute", bottom: "0", right: "9px" }}><mark style={{ fontSize: "small" }} >17800000</mark></p>                                  
                                </Panel.Body>                                                       
                            </Panel>
                        </Link>
                    </div>
                    <div className="col-lg-2 col-xs-12">
                        <Link to='/productdetail?id=18'>
                            <Panel style={{ marginLeft: "-15px", marginRight: "-16px", marginBottom: "-1px" }}>                            
                                <Panel.Body>
                                    <img className="col-lg-12 col-xs-6" href="#" alt="" src="https://acrnm.com/content/images/product/304/5771/a29ec94140_w710.jpg" style={{ width: "181px", marginBottom: "20px", marginLeft: "-15px" }}/>
                                    <p style={{fontWeight: "bold", fontSize: "small", paddingBottom: "20px", marginLeft: "-15px" }} className="col-lg-12 col-xs-6" >ACRONYM  J72-DS Liner Jacket </p>
                                    <p style={{textAlign: "right", position: "absolute", bottom: "0", right: "9px" }}><mark style={{ fontSize: "small" }} >IDR 15350000</mark></p>                                  
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
        if (this.state.carousel !== '') {
            return (
                this.renderHomePage()
            )
        }
        return (
            <div className="App" style={{ display: "table", position: "absolute", width: "100%", height: "100%", left: "0", top: "0", backgroundColor: "white", overflowX: "hidden" }}>
                <div style={{ display: "table-cell", verticalAlign: "middle" }}>
                <img className="center" style={{ width: "150px" }} src={loadinggif}/>
                </div>        
          </div>
        )
    }
}

export default HomePage