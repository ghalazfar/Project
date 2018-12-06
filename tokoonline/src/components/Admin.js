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
import { IconContext } from "react-icons";
import { MdAdd, MdDelete, MdEdit, MdCheck, MdUndo } from 'react-icons/md';
import { showLogin, getUserTransaction } from '../actions';
import { API_URL_1 } from '../supports/api-url/apiurl';
import loadinggif from '../supports/img/loading.gif';

class Admin extends Component {
    state = {
        productList: [],
        userList: [],
        transactionList: [],
        selectedProduct: 0,
        categoryEdited: 0,
        categoryAdd: 1,
        catdetailEdited: 0,
        catdetailAdd: 1,
        category: ''
    }
    
    componentWillMount(){
        axios.get(API_URL_1 + '/admin'
        ).then(res => {      
        this.setState({ productList: res.data.productList, userList: res.data.userList, transactionList: res.data.transactionList, topidproduct: res.data.topidproduct })      
      })
    }

    AddProduct = () => {
        axios.post(API_URL_1 + '/product', {
            idproduct: this.state.topidproduct[0].top + 1,
            name: this.refs.Name.value,
            price: this.refs.Price.value,
            description: this.refs.Description.value,
            thumbnail: this.refs.Thumbnail.value,
            discount: this.refs.Discount.value,
            idcatgroup: this.refs.addcatgroup.value,
            idcatdetail: this.refs.addcatdetail.value,
            image1: this.refs.addimage1.value,
            image2: this.refs.addimage2.value,
            image3: this.refs.addimage3.value,
            image4: this.refs.addimage4.value
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

    editButton = (idproduct) => {
        axios.post(API_URL_1 + '/adminproductdetails', {
            id: idproduct
        }).then(res => { 
            console.log(res.data)
          this.setState({ images: res.data.images, category: res.data.category, selectedProduct: idproduct})
        }).catch((err) => {
            console.log(err)
        })
    }

    updateProduct = (idproduct) => {
        axios.put(API_URL_1 + '/product/' + idproduct, {
            name: this.refs.editname.value,
            price: this.refs.editprice.value,
            description: this.refs.editdescription.value,
            thumbnail: this.refs.editthumbnail.value,
            discount: this.refs.editdiscount.value,
            idcatgroup: this.refs.editcatgroup.value,
            idcatdetail: this.refs.editcatdetail.value,
            image1: this.refs.editimage1.value,
            image2: this.refs.editimage2.value,
            image3: this.refs.editimage3.value,
            image4: this.refs.editimage4.value
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

    renderAddCategory = () => {
        if (this.state.categoryAdd == 0){
            return (
                <label for="catdetail">Detail:</label>
            )
        }
        else if (this.state.categoryAdd == 1){
            return (
                <div>
                <label for="catdetail">Detail:</label>
                <select className="form-control input-sm" ref="addcatdetail" id="catgroup" onChange={() => this.setState({catdetailAdd: this.refs.addcatdetail.value})}>
                    <option value={1}>Outerwear</option>
                    <option value={2}>Tops</option>
                    <option value={3}>Bottom</option>
                    <option value={4}>Shoes</option>
                </select>
                </div>
            )
        }
        else if (this.state.categoryAdd == 2){
            return (
                <div>
                <label for="catdetail">Detail:</label>
                <select className="form-control input-sm" ref="addcatdetail" id="catgroup" onChange={() => this.setState({catdetailAdd: this.refs.addcatdetail.value})}>
                    <option value={5}>Outerwear</option>
                    <option value={6}>Tops</option>
                    <option value={7}>Bottom</option>
                    <option value={8}>Shoes</option>
                </select>
                </div>
            )
        }
        else if (this.state.categoryAdd == 3){
            return (
                <div>
                <label for="catdetail">Detail:</label>
                <select className="form-control input-sm" ref="addcatdetail" id="catgroup" onChange={() => this.setState({catdetailAdd: this.refs.addcatdetail.value})}>
                    <option value={9}>Rings</option>
                    <option value={10}>Necklaces</option>
                    <option value={11}>Hats</option>
                    <option value={12}>Bags</option>
                </select>
                </div>
            )
        }
    }

    renderEditCategory = () => {
        if (this.state.categoryEdited == 0){
            return (
                <div>
                <label for="catdetail">Detail:</label>
                <select className="form-control input-sm" ref="editcatdetail" defaultValue={this.state.category[0].idcatdetail} id="catgroup" onChange={() => this.setState({catdetailEdited: this.refs.editcatdetail.value})}>
                </select>
                </div>
            )
        }
        else if (this.state.categoryEdited == 1){
            return (
                <div>
                <label for="catdetail">Detail:</label>
                <select className="form-control input-sm" ref="editcatdetail" defaultValue={this.state.category[0].idcatdetail} id="catgroup" onChange={() => this.setState({catdetailEdited: this.refs.editcatdetail.value})}>
                    <option value={1}>Outerwear</option>
                    <option value={2}>Tops</option>
                    <option value={3}>Bottom</option>
                    <option value={4}>Shoes</option>
                </select>
                </div>
            )
        }
        else if (this.state.categoryEdited == 2){
            return (
                <div>
                <label for="catdetail">Detail:</label>
                <select className="form-control input-sm" ref="editcatdetail" defaultValue={this.state.category[0].idcatdetail} id="catgroup" onChange={() => this.setState({catdetailEdited: this.refs.editcatdetail.value})}>
                    <option value={5}>Outerwear</option>
                    <option value={6}>Tops</option>
                    <option value={7}>Bottom</option>
                    <option value={8}>Shoes</option>
                </select>
                </div>
            )
        }
        else if (this.state.categoryEdited == 3){
            return (
                <div>
                <label for="catdetail">Detail:</label>
                <select className="form-control input-sm" ref="editcatdetail" defaultValue={this.state.category[0].idcatgroup} id="catgroup" onChange={() => this.setState({catdetailEdited: this.refs.editcatdetail.value})}>
                    <option value={9}>Rings</option>
                    <option value={10}>Necklaces</option>
                    <option value={11}>Hats</option>
                    <option value={12}>Bags</option>
                </select>
                </div>
            )
        }
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
                    <td>
                        <Button bsSize="xsmall" onClick={() => this.editButton(item.idproduct)}><MdEdit/></Button>
                    </td>
                    <td>
                        <Button bsSize="xsmall" onClick={() => this.editButton(item.idproduct)}><MdEdit/></Button>
                    </td>
                    <td>
                        <Button bsSize="xsmall" onClick={() => this.editButton(item.idproduct)}><MdEdit/></Button>
                        <Button bsSize="xsmall" onClick={() => this.deleteProduct(item.idproduct)}><MdDelete/></Button>
                    </td>
                    </tr>)
                }
            else if (this.state.category !== '') {
                return (
                    <tr key={index} >
                    <td><input type="text" className="form-control input-sm" ref="editname" defaultValue={item.name}/></td>
                    <td><input type="text" className="form-control input-sm" ref="editprice" defaultValue={item.price}/></td>
                    <td><textarea className="form-control" row="5" ref="editdescription" defaultValue={item.description}/></td>
                    <td><input type="text" className="form-control input-sm" ref="editthumbnail" defaultValue={item.thumbnail}/></td>
                    <td><input type="text" className="form-control input-sm" ref="editdiscount" defaultValue={item.discount}/></td>
                    <td>
                        <label for="catgroup">Group:</label>
                        <select className="form-control input-sm" ref="editcatgroup" defaultValue={this.state.category[0].idcatgroup} id="catgroup" onChange={() => this.setState({categoryEdited: this.refs.editcatgroup.value})}>
                            <option key={index} value={1}>Men</option>
                            <option key={index} value={2}>Women</option>
                            <option key={index} value={3}>Accessories</option>
                        </select>
                        <br/>
                        {this.renderEditCategory()}
                    </td>
                    <td>
                        <input type="text" className="form-control input-sm" ref="editimage1" defaultValue={this.state.images[0].image1}/>
                        <input type="text" className="form-control input-sm" ref="editimage2" defaultValue={this.state.images[0].image2}/>
                        <input type="text" className="form-control input-sm" ref="editimage3" defaultValue={this.state.images[0].image3}/>
                        <input type="text" className="form-control input-sm" ref="editimage4" defaultValue={this.state.images[0].image4}/>
                    </td>
                    <td>
                        <Button bsSize="xsmall" onClick={() => this.setState({ selectedProduct: 0 })}><MdUndo/></Button>
                        <Button bsSize="xsmall" onClick={() => this.updateProduct(item.idproduct)}><MdCheck/></Button>
                    </td>
                    </tr>
                )
            }      
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
                            <td>Categories</td>
                            <td>Images</td>
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
                                <label for="catgroup">Group:</label>
                                <select className="form-control input-sm" ref="addcatgroup" id="catgroup" onChange={() => this.setState({categoryAdd: this.refs.addcatgroup.value})}>
                                    <option value={1}>Men</option>
                                    <option value={2}>Women</option>
                                    <option value={3}>Accessories</option>
                                </select>
                                <br/>
                                {this.renderAddCategory()}
                            </td>
                            <td>
                                <input type="text" className="form-control input-sm" ref="addimage1"/>
                                <input type="text" className="form-control input-sm" ref="addimage2"/>
                                <input type="text" className="form-control input-sm" ref="addimage3"/>
                                <input type="text" className="form-control input-sm" ref="addimage4"/>
                            </td>
                            <td>
                            <Button bsSize="xsmall" onClick={this.AddProduct}><MdAdd/></Button>
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
        console.log(this.state)
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
  
