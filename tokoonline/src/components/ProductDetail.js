import React, { Component } from 'react';
import { 
    Panel,
    Thumbnail,
    Button,
    ButtonToolbar,
    ToggleButtonGroup,
    ToggleButton
 } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'
import queryString from 'query-string';
import tshirt from '../supports/img/tshirt.jpg';
import { API_URL_1 } from '../supports/api-url/apiurl';
import loadinggif from '../supports/img/loading.gif';

class ProductDetail extends Component {
    state = {
        productData: ['']
    }
    componentWillMount() {
        const params = queryString.parse(this.props.location.search)
        axios.get(API_URL_1 +'/productdetail?id='+ params.id
        ).then(res => {
        this.setState({ productData: res.data })
        console.log(this.state.productData)
        })
    }

    renderColorBox = () => {
        var colorList = []
        var colorAdded = false
        for (var i in this.state.productData) {
            for (var j in colorList) {
                if (colorList[j] == this.state.productData[i].color) {
                    colorAdded = true
                }                
            }
            if (colorAdded == false) {
                colorList.push(this.state.productData[i].color)
            }
            else {
                colorAdded = false
            }
        }
        return colorList.map((color) => 
            <Button bsSize="small" style={{ backgroundColor: `${color}` }}></Button>
        )        
    }
    
    render() {
        if (this.state.productData[0] !== '') {
            return(
                <div className="container">
                    <div className="col-sm-offset-1 col-sm-5 col-xs-12">
                        <Thumbnail src={tshirt} alt=""/>
                        <Thumbnail src={tshirt} alt="" className="col-xs-3"/>
                        <Thumbnail src={tshirt} alt="" className="col-xs-3"/>
                        <Thumbnail src={tshirt} alt="" className="col-xs-3"/>
                        <Thumbnail src={tshirt} alt="" className="col-xs-3"/>
                    </div>
                    <div className="col-sm-5 col-xs-12">
                        <h4 style={{ fontWeight: "bold" }}>{this.state.productData[0].name}</h4>
                        <h4 style={{ fontWeight: "bold" }}>SIZE</h4>
                        <hr/>
                        <ButtonToolbar>
                            <ToggleButtonGroup bsSize="xsmall" type="radio" name="options">
                                <ToggleButton value={1}>S</ToggleButton>
                                <ToggleButton value={2}>M</ToggleButton>
                                <ToggleButton value={3}>L</ToggleButton>
                                <ToggleButton value={4}>XL</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar>
                        <h4 style={{ fontWeight: "bold" }}>COLOR</h4>
                        <hr/>
                        {this.renderColorBox()}
                        <h4 style={{ fontWeight: "bold" }}>QUANTITY</h4>
                        <hr/>
                        <form className="col-xs-3" style={{ marginLeft: "-14px" }}>
                            <input type="number" defaultValue="1" className="form-control input-sm" ref="quantity"/>
                        </form>
                        <br/>
                        <div className="center" style={{ marginTop: "50px", marginBottom: "50px"}}>
                            <Button style={{ padding: "0px", paddingRight: "5px" }} bsStyle="success" bsSize="xsmall">
                                <span style={{ fontWeight: "bold", fontSize: "large" }}><mark style={{ padding: "5px", paddingBottom: "4px", marginLeft: "-2px" }}>IDR {(this.state.productData[0].price)/1000}K</mark> ADD TO CART</span>
                            </Button>
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <Panel style={{ marginRight: "-30px", marginLeft: "-30px" }}>
                            <Panel.Body>
                                {this.state.productData[0].description}
                            </Panel.Body>
                        </Panel>
                    </div>
                </div>
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

export default ProductDetail;
