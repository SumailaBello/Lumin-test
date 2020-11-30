import React, { Component } from 'react';
import './Products.css';
import Productitem from '../Productitem/Productitem';
import PropTypes from 'prop-types';

export class Products extends Component {
    render() {
        if(this.props.products) {
            console.log(this.props.products)

        }
        return (
            <div>
                <div className = "jumbotron" style = {{background: "white"}}>
                    <div className = "container">
                        <h1 className = "display-4">All Products</h1>
                        <div className = "row">
                            <div className = "col">
                                <p className = "float-left">A 360° look at Lumin</p>
                                <div className = "float-right pr-5">
                                    <select className = "select-style">
                                        <option value = "">Filter by</option>
                                        <option value = "latest">Latest</option>
                                        <option value = "price">Price</option>
                                    </select>
                                </div>
                                {/* <form className="form-inline">
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                                </form> */}
                            </div>
                        </div>
                    </div> 
                </div>

                <div className = "bg-light pt-3 pb-5">
                    <div className = "container mt-3">
                        <div className="row">
                            <Productitem products = {this.props.products} productsCopy = {JSON.parse(JSON.stringify(this.props.productsCopy))} addToCart = {this.props.addToCart} currency = {this.props.currency} cart = {this.props.parentCart} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Productitem.propTypes = {
    products: PropTypes.array.isRequired
}

export default Products
