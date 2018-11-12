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
    Tab
 } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'
import { connect } from 'react-redux';
import queryString from 'query-string';
import { showLogin, getUserTransaction } from '../actions';
import tshirt from '../supports/img/tshirt.jpg';
import { API_URL_1 } from '../supports/api-url/apiurl';
import loadinggif from '../supports/img/loading.gif';

class Admin extends Component {
    state = {
        productList: [],
        userList: [],
        transactionList: [],
        selectedProduct: 0   
    }
    
    componentWillMount(){
        axios.get(API_URL_1 + '/admin'
        ).then(res => {      
        this.setState({ productList: res.data.productList, userList: res.data.userList, transactionList: res.data.transactionList })      
      })
    }

    AddProduct = () => {
        axios.post(API_URL_1 + '/product', {
            name: this.refs.Name.value,
            price: this.refs.Price.value,
            description: this.refs.Description.value,
            thumbnail: this.refs.Thumbnail.value,
            discount: this.refs.Discount.value
        }).then(res => {
            if(res.data.status === 'Error'){
                alert(res.data.err.sqlMessage)
            }
            else {
                alert("Add Success")
                this.setState({ productList: res.data.productList }) 
            }            
        }).catch((err) => {
            console.log(err)
            alert("ERROR")
        })
    }

    deleteProduct = (idproduct) => {
        if(window.confirm('Are you sure?')) {
            axios.delete(API_URL_1 + '/product/' + idproduct
            ).then(res => {
                if(res.data.status === 'Error'){
                alert(res.data.err.sqlMessage)
                }
                else {
                alert("Delete Success")
                this.setState({ productList: res.data.productList }) 
                }             
            }).catch((err) => {
                console.log(err)
                alert("ERROR")
            })
        }  
    }

    updateProduct = (idproduct) => {
        axios.put(API_URL_1 + '/product/' + idproduct, {
            name: this.refs.editname.value,
            price: this.refs.editprice.value,
            description: this.refs.editdescription.value,
            thumbnail: this.refs.editthumbnail.value,
            discount: this.refs.editdiscount.value
        }).then(res => {
            if(res.data.status === 'Error'){
                alert(res.data.err.sqlMessage)
            }
            else {
                alert("Add Success")
                this.setState({ productList: res.data.productList, selectedProduct: 0 }) 
            }            
        }).catch((err) => {
            console.log(err)
            alert("ERROR")
        })
    }

    searchProduct = (query) => {
        axios.get(API_URL_1 + '/search?q=' + query
        ).then(res => {      
          this.setState({ productList: res.data})
        }).catch((err) => {
            console.log(err)
        })
    }

    renderProductData = () => {    
        const arrJSX = this.state.productList.map((item, index) => {
            if (this.state.selectedProduct !== item.idproduct) {
                return (
                    <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>{item.thumbnail}</td>
                    <td>{item.discount}</td>
                    <td><input type="button" className="btn btn-primary btn-xs" value="Edit" onClick={() => this.setState({ selectedProduct: item.idproduct })}/><input type="button" className="btn btn-primary btn-xs" value="Delete" onClick={() => this.deleteProduct(item.idproduct)}/></td>
                    </tr>)
                }
                return (
                    <tr key={index} >
                    <td><input type="text" className="form-control input-sm" ref="editname" defaultValue={item.name}/></td>
                    <td><input type="text" className="form-control input-sm" ref="editprice" defaultValue={item.price}/></td>
                    <td><input type="text" className="form-control input-sm" ref="editdescription" defaultValue={item.description}/></td>
                    <td><input type="text" className="form-control input-sm" ref="editthumbnail" defaultValue={item.thumbnail}/></td>
                    <td><input type="text" className="form-control input-sm" ref="editdiscount" defaultValue={item.discount}/></td>
                    <td><input type="button" className="btn btn-primary btn-xs" value="Cancel" onClick={() => this.setState({ selectedProduct: 0 })}/><input type="button" className="btn btn-primary btn-xs" value="Update" onClick={() => this.updateProduct(item.idproduct)}/></td>
                </tr>)      
            })
        return arrJSX
    }

    renderProductTable = () => {
        return (
            <Panel style={{ marginTop: "-1px" }}>
                <Panel.Body>
                    <div className="container-fluid">
                        <div className="input-group col-xs-5">
                        <input type="text" className="form-control input-sm" ref="searchproduct" placeholder="Search Name..."/>
                        <div className="input-group-btn">
                        <button className="btn btn-default btn-sm" onClick={() => this.searchProduct(this.refs.searchproduct.value)}>
                            <i className="glyphicon glyphicon-search"></i>
                        </button>
                        </div>
                     </div>
                     <br/>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Description</td>
                            <td>Thumbnail</td>
                            <td>Discount</td>
                            <td></td>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderProductData()}
                        <td></td>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td><input type="text" className="form-control input-sm" ref="Name"/></td>
                            <td><input type="number" className="form-control input-sm" ref="Price"/></td>
                            <td><input type="text" className="form-control input-sm" ref="Description"/></td>
                            <td><input type="text" className="form-control input-sm" ref="Thumbnail"/></td>
                            <td><input type="number" className="form-control input-sm" ref="Discount"/></td>
                            <td>
                            <input className="btn btn-primary btn-xs" type="button" value="Add" onClick={this.AddProduct}/>
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                </div>                                    
                </Panel.Body>
            </Panel>
        )
    }

    render() {
        if (this.props.auth.status == 'admin') {
            return(
                <div className="container">
                    <Tabs defaultActiveKey={1} justified animation={false} >
                        <Tab eventKey={1} title="Products">
                            {this.renderProductTable()}
                        </Tab>
                        <Tab eventKey={2} title="Users">
                            Tab 2 content
                        </Tab>
                        <Tab eventKey={3} title="Transactions">
                            Tab 3 content
                        </Tab>
                        <Tab eventKey={4} title="Front Page">
                            Tab 3 content
                        </Tab>
                    </Tabs>
                </div>
            )
        }
        return <Redirect to='/' />
    }    
}

const mapStateToProps = (state) => {
    return { auth: state.auth, loginform: state.loginform }
}
export default connect(mapStateToProps, { showLogin, getUserTransaction })(Admin);
  
