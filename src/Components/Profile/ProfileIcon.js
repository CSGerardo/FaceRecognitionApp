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

    onSubmitSignOut=()=>{
        const token=window.localStorage.getItem("token");
        window.localStorage.removeItem("token")
        console.log(token);
        if (token){
          fetch("http://localhost:3001/signout", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              "Authorization": token
            }
          }).catch(console.log);
        };

        this.props.onRouteChange("signout");
    };

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
                            src={require("./boy-front-color.png")}
                            className="b--light-purple bw2 br-100 ba h3 w3 dib" alt="avatar"
                        />
                    </DropdownToggle>
                    <DropdownMenu 
                        className="b--transparent" 
                        style={{marginTop: "20px", backgroundColor: "rgba(255, 255, 255, 0.9"}}
                    >
                        <DropdownItem onClick={this.props.toggleModal}>View Profile</DropdownItem>
                        <DropdownItem onClick={this.onSubmitSignOut}>Sign Out</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    };
};

export default ProfileIcon;