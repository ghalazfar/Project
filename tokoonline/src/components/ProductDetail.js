import React, { Component } from 'react';
import { 
    Panel,
    Thumbnail,
    Button,
    ButtonToolbar,
    ToggleButtonGroup,
    ToggleButton,
    Tooltip,
    Tabs,
    Tab,
    Jumbotron
 } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { connect } from 'react-redux';
import queryString from 'query-string';
import { showLogin, getUserTransaction } from '../actions';
import tshirt from '../supports/img/tshirt.jpg';
import { API_URL_1 } from '../supports/api-url/apiurl';
import loadinggif from '../supports/img/loading.gif';

class ProductDetail extends Component {
    state = {
        productData: [],
        selectedSize: '',
        selectedColor: '',
        quantity: 1,
        addToCartPressed: false,
        selectedThumbnail: ''
    }
    componentWillMount() {
        const params = queryString.parse(this.props.location.search)
        axios.get(API_URL_1 +'/productdetail?id='+ params.id
        ).then(res => {
        this.setState({ productData: res.data.detail, images: res.data.images, selectedThumbnail: res.data.images[0].image1 })
        })
    }

    renderSize = () => {
        const clothesSizes = ['S', 'M', 'L', 'XL']
        var available = false
        var inSupply = []
        for (var i in clothesSizes){
            for (var j in this.state.productData){
                available = false
                if (clothesSizes[i]==this.state.productData[j].size){
                    inSupply.push({
                        size: clothesSizes[i],
                        disabled: false
                    })
                    available = true
                    break
                }
            }          
            if (available == false){
                inSupply.push({
                    size: clothesSizes[i],
                    disabled: true
                })
            }
        }
        return inSupply.map((supply) => 
            <ToggleButton value={supply.size} disabled={supply.disabled} onClick={() => {this.selectSize(supply.size)}}>{supply.size}</ToggleButton>
        )
    }

    selectSize = (size) => {
        this.setState({selectedSize: size, selectedColor: ''})
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
            <ToggleButton value={color} bsSize="large" style={{ backgroundColor: `${color}`, padding: "7px" }} onClick={() => {this.selectColor(color)}}></ToggleButton>
        )        
    }

    selectColor = (color) => {
        this.setState({selectedColor: color})
    }
    
    selectQuantity = (qty) => {
        if (qty <= 0) this.setState({quantity: 1, price: this.state.productData[0].price })
        else this.setState({quantity: qty, price: this.state.productData[0].price*qty })
    }

    addToCart = () => {
        this.setState({ addToCartPressed: true })
        if (this.state.selectedSize!==''&&this.state.selectedColor!=='') {
            if(this.props.auth.email !=='') {
                axios.post(API_URL_1 + '/addtocart', {
                    iduser: this.props.auth.iduser,
                    idproduct: this.state.productData[0].idproduct,
                    price: this.state.quantity*this.state.productData[0].price,
                    size: this.state.selectedSize,
                    color: this.state.selectedColor,
                    quantity: this.state.quantity
                }).then(res => {
                    console.log(res)
                    this.props.getUserTransaction(this.props.auth.iduser)
                }).catch((err) => {
                    console.log(err)
                    alert("ERROR")
                })
            }
            else {
                this.props.showLogin()
            }
        }
    }

    renderColorHead () {
        if (this.state.selectedSize !== '') return 'COLOR'
        else return <span style={{ opacity: 0 }}>_</span>
    }

    renderSizeTooltip () {
        if (this.state.addToCartPressed==true&&this.state.selectedSize==''){
            return (
                <Tooltip placement="bottom" className="in" id="tooltip-right">
                Please select a size
                </Tooltip>
            )
        }
    }

    renderColorTooltip () {
        if (this.state.addToCartPressed==true&&this.state.selectedSize!==''&&this.state.selectedColor==''){
            return (
                <Tooltip placement="bottom" className="in" id="tooltip-right">
                Please select a color
                </Tooltip>
            )
        }
    }

    render() {
        if (this.state.productData.length > 0) {
            return(
                <div className="container">
                    <div className="col-sm-offset-1 col-sm-5 col-xs-12">
                        <Thumbnail href="#" src={this.state.selectedThumbnail} alt=""/>
                        <Thumbnail href="#" src={this.state.images[0].image1} alt="" className="col-xs-3" onClick={() => this.setState({selectedThumbnail: this.state.images[0].image1})}/>
                        <Thumbnail href="#" src={this.state.images[0].image2} alt="" className="col-xs-3" onClick={() => this.setState({selectedThumbnail: this.state.images[0].image2})}/>
                        <Thumbnail href="#" src={this.state.images[0].image3} alt="" className="col-xs-3" onClick={() => this.setState({selectedThumbnail: this.state.images[0].image3})}/>
                        <Thumbnail href="#" src={this.state.images[0].image4} alt="" className="col-xs-3" onClick={() => this.setState({selectedThumbnail: this.state.images[0].image4})}/>
                    </div>
                    <div className="col-sm-5 col-xs-12">
                        <h4 style={{ fontWeight: "bold" }}>{this.state.productData[0].name}</h4>
                        <h4 className="col-xs-6" style={{ fontWeight: "bold", padding: 0 }}>SIZE</h4>
                        <h4 className="col-xs-6" style={{ fontWeight: "bold", padding: 0 }}>{this.renderColorHead()}</h4>
                        <hr/>
                        <hr/>
                        <hr/>
                        <div className="col-xs-6" style={{ padding: 0 }}>                         
                            <ButtonToolbar>
                                <ToggleButtonGroup bsSize="xsmall" type="radio" name="options">
                                    {this.renderSize()}
                                </ToggleButtonGroup>
                            </ButtonToolbar>
                            {this.renderSizeTooltip()}
                        </div>    
                        <div className="col-xs-6" style={{ padding: 0 }}>    
                            <ButtonToolbar>
                                <ToggleButtonGroup bsSize="xsmall" type="radio" name="options">
                                    {this.renderColorBox()}
                                </ToggleButtonGroup>
                            </ButtonToolbar>
                            {this.renderColorTooltip()}
                        </div>
                        <div className="col-xs-12" style={{ padding: 0 }}>                          
                        <h4 style={{ fontWeight: "bold" }}>QUANTITY</h4>
                        <hr/>
                        <form className="col-xs-3" style={{ marginLeft: "-14px" }}>
                            <input type="number" value={this.state.quantity} className="form-control input-sm" ref="quantity" onChange={()=> {this.selectQuantity(this.refs.quantity.value)}}/>
                        </form>
                        <br/>
                        </div>
                        <div className="col-xs-12" style={{ padding: 0, paddingTop: "50px", paddingBottom: "50px"}}>
                            <Button style={{ padding: "0px", paddingRight: "5px" }} bsStyle="success" bsSize="xsmall" onClick={this.addToCart}>
                                <span style={{ fontWeight: "bold", fontSize: "large" }}><mark style={{ padding: "4px", paddingBottom: "5px", marginLeft: "-3px" }}>IDR {this.state.productData[0].price*this.state.quantity}</mark> ADD TO CART</span>
                            </Button>
                        </div>
                    </div>
                    <div className="col-xs-12">
                    <Tabs defaultActiveKey={1} justified animation={false} >
                        <Tab eventKey={1} title="Description">
                        <Panel style={{ marginTop: "-1px" }}>
                                <Panel.Body>
                                    {this.state.productData[0].description}
                                </Panel.Body>
                            </Panel>
                        </Tab>
                        <Tab eventKey={2} title="Size Chart">
                            Tab 2 content
                        </Tab>
                    </Tabs>
                    </div>
                    <div className="col-xs-12">
                        
                    </div>
                </div>
            )
        }
        return (
            <div className="container">
                <Jumbotron className="col-xs-12">
                <h2>Sorry, this item is out of stock!</h2>
                </Jumbotron>        
            </div>
        )
    }    
}

const mapStateToProps = (state) => {
    return { auth: state.auth, loginform: state.loginform }
}
export default connect(mapStateToProps, { showLogin, getUserTransaction })(ProductDetail);
  
