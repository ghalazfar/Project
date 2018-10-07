import React, { Component } from 'react';
import { 
    Panel,
    PanelGroup,
    ListGroup,
    ListGroupItem
 } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ProductList extends Component {    
    render() {
        console.log(this.props.selectedCategory[0])
        return(
            <div className="container-fluid">
                <div className="col-sm-3 col-xs-12">
                    <PanelGroup accordion activeKey={this.props.selectedCategory[0]}>
                        <Panel eventKey={1}>
                            <Panel.Heading>
                            <Panel.Title toggle>Men</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body collapsible>
                            <ListGroup style={{ margin: "-16px" }}>
                                <ListGroupItem>Outerwear</ListGroupItem>
                                <ListGroupItem>Tops</ListGroupItem>
                                <ListGroupItem>Bottoms</ListGroupItem>
                                <ListGroupItem>Shoes</ListGroupItem>
                            </ListGroup>
                            </Panel.Body>
                        </Panel>
                        <Panel eventKey={2}>
                            <Panel.Heading>
                            <Panel.Title toggle>Women</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body collapsible>
                            <ListGroup style={{ margin: "-16px" }}>
                                <ListGroupItem>Outerwear</ListGroupItem>
                                <ListGroupItem>Tops</ListGroupItem>
                                <ListGroupItem>Bottoms</ListGroupItem>
                                <ListGroupItem>Shoes</ListGroupItem>
                            </ListGroup>
                            </Panel.Body>
                        </Panel>
                        <Panel eventKey={3}>
                            <Panel.Heading>
                            <Panel.Title toggle>Accessories</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body collapsible>
                            <ListGroup style={{ margin: "-16px" }}>
                                <ListGroupItem>Rings</ListGroupItem>
                                <ListGroupItem>Necklaces</ListGroupItem>
                                <ListGroupItem>Hats</ListGroupItem>
                                <ListGroupItem>Bags</ListGroupItem>
                            </ListGroup>
                            </Panel.Body>
                        </Panel>
                    </PanelGroup>
                </div>
            </div>
        )
    }    
}

const mapStateToProps = (props) => {
    const { selectedCategory } = props
    return { selectedCategory: selectedCategory.selectedCategory };
}
export default connect(mapStateToProps)(ProductList);
