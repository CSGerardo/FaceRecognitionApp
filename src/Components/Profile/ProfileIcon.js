import React from "react";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';

class ProfileIcon extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dropdownOpen: false
        };
    }

    toggle=()=>{
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render(){
        return (
            <div className="pa4 tc">
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle 
                        tag="span"
                        data-toggle="dropdown"
                        aria-expanded={this.state.dropdownOpen}
                    >
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/026/630/551/original/profile-icon-symbol-design-illustration-vector.jpg"
                            className="b--light-purple bw2 br-100-l ba h3 w3 dib" alt="avatar"
                        />
                    </DropdownToggle>
                    <DropdownMenu 
                        className="b--transparent" 
                        style={{marginTop: "20px", backgroundColor: "rgba(255, 255, 255, 0.9"}}
                    >
                        <DropdownItem>View Profile</DropdownItem>
                        <DropdownItem onClick={() => this.props.onRouteChange("signout")}>Sign Out</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    };
};

export default ProfileIcon;