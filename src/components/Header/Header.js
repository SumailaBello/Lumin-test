import React, { Component } from 'react';
import './Header.css';
// import { FaShoppingCartAlt } from "@react-icons/fa";
export class Header extends Component {
    render() {
        return (
            <div className = "">
                <nav className="container-fluid navbar navbar-light ">
                    {/* <a className="navbar-brand" href = "#">Navbar</a> */}
                    <div className = "float-left">
                        <span className = "btn header-style mr-5">Lumin</span>
                        <span className = "btn mr-4">Shop</span> <span className = "btn">Learn</span>
                    </div>

                    <div className = "float-right">
                        <span className = "btn mr-5">Account</span>
                        <span className = "btn fas fa-cart-plus" onClick = {this.props.toggleMenu}> </span> 
                        <span>{this.props.cart.length}</span>
                    </div>
                    
                    {/* <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form> */}
                </nav>
            </div>
        )
    }
}

export default Header
