import React from "react";
import ProfileIcon from "../Profile/ProfileIcon";

const Navigation=({onRouteChange, isSignedIn})=>{
    if(isSignedIn){
        return(
            <nav className="flex justify-end">
                <ProfileIcon />
                <p onClick={()=>onRouteChange("signout")} className="f3 link dim light-purple underline pa3 pointer">Sign Out</p>
            </nav>
        );
    }else{
        return(
            <nav className="flex justify-end">
                <p onClick={()=>onRouteChange("signin")} className="f3 link dim light-purple underline pa3 pointer">Sign In</p>
                <p onClick={()=>onRouteChange("register")} className="f3 link dim light-purple underline pa3 pointer">Register</p>
            </nav>
        );
    }
};

export default Navigation;