import React from "react";
import "./Profile.css";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            name: this.props.user.name,
            age: this.props.user.age,
            pet: this.props.user.pet
        };
    }

    onFormChange=(event)=>{
        switch(event.target.name){
            case "user-name":
                this.setState({name: event.target.value})
                break;

            case "user-age":
                this.setState({age: event.target.value})
                break;

            case "user-pet":
                this.setState({pet: event.target.value})
                break;
            default:
                return;
        }
    };

    onProfileUpdate=(data)=>{
        fetch(`https://still-brushlands-93531-5b4027c4ac44.herokuapp.com/profile/${this.props.user.id}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": window.localStorage.getItem("token")
            },
            body: JSON.stringify({ formInput: data })
        }).then(resp=>{
            if (resp.status===200 || resp.status===304){
                this.props.toggleModal();
                this.props.loadUser({...this.props.user, ...data});
            }
        }).catch(console.log);
    };

    render() {
        const { user, toggleModal }=this.props;
        const { name, age, pet }=this.state;
        return(
            <div className="profile-modal">
                <div className="w-100 w-50-m w-25-l">
                    <article className=" bg-black br3 ba light-purple mv4 mw6 center">
                    <main className="pa4 light-purple w-80">
                        <img
                            src={require("./boy-front-color.png")}
                            className="b--light-purple bw2 ba h3 w3 dib" alt="avatar"
                        />
                        <h1>{this.state.name}</h1>
                        <h4>{`Images Submitted: ${user.entries}`}</h4>
                        <p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
                        <hr/>
                        <div style={{display: "flex", justifyContent: "flex-start"}}>
                            <label className="mt2 fw6" htmlFor="user-name">Name:</label>
                        </div>
                        <input 
                            className="pa2 ba bg-mid-gray white hover-bg-mid-gray hover-white w-100 hover-black" 
                            placeholder={user.name} type="text" name="user-name"  id="name"
                            onChange={this.onFormChange}      
                        />
                        <div style={{display: "flex", justifyContent: "flex-start"}}>
                            <label className="mt2 fw6" htmlFor="user-age">Age:</label>
                        </div>
                        <input 
                            className="pa2 ba bg-mid-gray white hover-bg-mid-gray hover-white w-100 hover-black" 
                            placeholder={user.age} type="text" name="user-age"  id="age"
                            onChange={this.onFormChange}         
                        />
                        <div style={{display: "flex", justifyContent: "flex-start"}}>
                            <label className="mt2 fw6" htmlFor="user-pet">Pet:</label>
                        </div>
                        <input 
                            className="pa2 ba bg-mid-gray white hover-bg-mid-gray hover-white w-100 hover-black" 
                            placeholder={user.pet} type="text" name="user-pet"  id="pet"
                            onChange={this.onFormChange}         
                        />     
                        <div className="mt4" style={{display: "flex", justifyContent: "space-around"}}>
                            <button 
                            onClick={()=>this.onProfileUpdate({ name, age, pet })}
                            className="b pa2 grow pointer w-40 bg-gold b--white-20">  
                                Save
                            </button>   
                            <button 
                            className="b pa2 grow pointer w-40 bg-gold b--white-20"
                            onClick={toggleModal}
                            >
                                Cancel
                            </button>   
                        </div>
                    </main>
                    <div className="modal-close" onClick={toggleModal}>&times;</div>
                    </article>  
                </div>
            </div>
        );
    };
};

export default Profile;