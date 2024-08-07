import React from "react";

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state={
            name: "",
            email: "",
            password: ""
        };
    }

    onNameChange=(event)=>{
        this.setState({name: event.target.value})
    };

    onEmailChange=(event)=>{
        this.setState({email: event.target.value})
    };

    onPasswordChange=(event)=>{
        this.setState({password: event.target.value})
    };

    saveAuthTokenInSession=(token)=>{
        window.localStorage.setItem("token", token);
    };

    onSubmitSignIn=()=>{
        fetch("https://still-brushlands-93531-5b4027c4ac44.herokuapp.com/register", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response=>response.json())
        .then(data=>{
            if(data.userId && data.success==="true"){
                this.saveAuthTokenInSession(data.token);
                    fetch(`https://still-brushlands-93531-5b4027c4ac44.herokuapp.com/profile/${data.userId}`, {
                      method: "get",
                      headers: {
                        "Content-Type": "application/json",
                        "Authorization": data.token
                      }
                    })
                    .then(resp=>resp.json())
                    .then(user=>{
                      if(user && user.email){
                        this.props.loadUser(user);
                        this.props.onRouteChange("home");
                      }
                    }).catch(console.log);
            }
        }).catch(console.log);
    };

    render(){
        return(
            <article className="br3 ba light-purple light-purple mv4 w-100 w-50-m w-25-l mw6 center tc">
            <main className="pa4 light-purple">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent white hover-bg-mid-gray hover-white w-100 hover-black" 
                                type="text" name="name"  id="name"
                                onChange={this.onNameChange}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent white hover-bg-mid-gray hover-white w-100 hover-black" 
                                type="email" name="email-address"  id="email-address"
                                onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent white hover-bg-mid-gray hover-white w-100 hover-black" 
                                type="password" name="password"  id="password"
                                onChange={this.onPasswordChange}
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <input onClick={this.onSubmitSignIn} 
                        className="b ph3 pv2 input-reset ba b--light-purple light-purple 
                        bg-transparent grow pointer f6 dib hover-black" type="submit" value="Register"/>
                    </div>
                </div>
            </main>
            </article>
        );
    }
};

export default Register;