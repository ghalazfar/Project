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
import { connect } from 'react-redux';
import queryString from 'query-string';
import tshirt from '../supports/img/tshirt.jpg';
import { API_URL_1 } from '../supports/api-url/apiurl';
import loadinggif from '../supports/img/loading.gif';

class ProductDetail extends Component {
    state = {
        productData: [''],
        selectedSize: '',
        selectedColor: '',
        quantity: 1
    }
    componentWillMount() {
        const params = queryString.parse(this.props.location.search)
        axios.get(API_URL_1 +'/productdetail?id='+ params.id
        ).then(res => {
        this.setState({ productData: res.data })
        })
    }

    renderSize = () => {
        const clothesSizes = ['S', 'M', 'L', 'XL']
        var foundSize = false
        var inSupply = []
        for (var i in clothesSizes){
            for (var j in this.state.productData){
                if (clothesSizes[i]==this.state.productData[j].size){
                    inSupply.push({
                        size: clothesSizes[i],
                        disabled: false
                    })
                }
            }          
            for (var j in this.state.productData){
                foundSize = false
                if (clothesSizes[i] == this.state.productData[j].size){
                    foundSize = true
                    break
                }              
            }
            if (foundSize == false){
                inSupply.push({
                    size: clothesSizes[i],
                    disabled: true
                })
            }
        }
        return inSupply.map((supply) => 
            <ToggleButton disabled={supply.disabled} onClick={() => {this.selectSize(supply.size)}}>{supply.size}</ToggleButton>
        )
    }

    selectSize = (size) => {
        this.setState({selectedSize: size})
    }

    renderColorBox = () => {
        var colorList = []
        var colorAdded = false
        for (var i in this.state.productData) {
            if (this.state.productData[i].size == this.state.selectedSize) {
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
        }
        return colorList.map((color) => 
            <ToggleButton bsSize="large" style={{ backgroundColor: `${color}`, padding: "7px" }} onClick={() => {this.selectColor(color)}}></ToggleButton>
        )        
    }

    selectColor = (color) => {
        this.setState({selectedColor: color})
    }
    
    selectQuantity = (qty) => {
        this.setState({quantity: qty, price: this.state.productData[0].price*qty })
    }

    addToCart = () => {
        axios.post(API_URL_1 + '/cart', {
            iduser: this.props.authGlobal.iduser,
            idproduct: this.state.productData[0].idproduct,
            price: this.state.price,
            size: this.state.selectedSize,
            color: this.state.selectedColor,
            quantity: this.state.quantity
        }).then(res => {
            this.setState({ redirectToCheckout: true})
        }).catch((err) => {
          console.log(err)
          alert("ERROR")
        })
      }

    render() {
        console.log(this.state)
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
                                {this.renderSize()}
                            </ToggleButtonGroup>
                        </ButtonToolbar>
                        <h4 style={{ fontWeight: "bold" }}>COLOR</h4>
                        <hr/>
                        <ButtonToolbar>
                            <ToggleButtonGroup bsSize="xsmall" type="radio" name="options">
                                {this.renderColorBox()}
                            </ToggleButtonGroup>
                        </ButtonToolbar>                        
                        <h4 style={{ fontWeight: "bold" }}>QUANTITY</h4>
                        <hr/>
                        <form className="col-xs-3" style={{ marginLeft: "-14px" }}>
                            <input type="number" defaultValue="1" className="form-control input-sm" ref="quantity" onChange={()=> {this.selectQuantity(this.refs.quantity.value)}}/>
                        </form>
                        <br/>
                        <div className="center" style={{ marginTop: "50px", marginBottom: "50px"}}>
                            <Button style={{ padding: "0px", paddingRight: "5px" }} bsStyle="success" bsSize="xsmall" onClick={this.addToCart}>
                                <span style={{ fontWeight: "bold", fontSize: "large" }}><mark style={{ padding: "4px", paddingBottom: "5px", marginLeft: "-3px" }}>IDR {this.state.price}</mark> ADD TO CART</span>
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

const mapStateToProps = (state) => {
    return { authGlobal: state.auth };
  }
  export default connect(mapStateToProps)(ProductDetail);
  
