import React from "react";
import "./Profile.css";

const Profile=({isProfileOpen, toggleModal})=>{
    return(
        <div className="profile-modal">
            <div className="w-100 w-50-m w-25-l">
                <article className=" bg-black br3 ba light-purple mv4 mw6 center">
                <main className="pa4 light-purple w-80">
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/026/630/551/original/profile-icon-symbol-design-illustration-vector.jpg"
                        className="b--light-purple bw2 ba h3 w3 dib" alt="avatar"
                    />
                    <h1>User Name</h1>
                    <h4>Images Submitted: 5</h4>
                    <p>Member since: January</p>
                    <hr/>
                    <div style={{display: "flex", justifyContent: "flex-start"}}>
                        <label className="mt2 fw6" htmlFor="user-name">Name:</label>
                    </div>
                    <input 
                        className="pa2 ba bg-mid-gray white hover-bg-mid-gray hover-white w-100 hover-black" 
                        placeholder="User Name" type="text" name="user-name"  id="name"      
                    />
                    <div style={{display: "flex", justifyContent: "flex-start"}}>
                        <label className="mt2 fw6" htmlFor="user-age">Age:</label>
                    </div>
                    <input 
                        className="pa2 ba bg-mid-gray white hover-bg-mid-gray hover-white w-100 hover-black" 
                        placeholder="User Age" type="text" name="user-age"  id="age"      
                    />
                    <div style={{display: "flex", justifyContent: "flex-start"}}>
                        <label className="mt2 fw6" htmlFor="user-name">Pet:</label>
                    </div>
                    <input 
                        className="pa2 ba bg-mid-gray white hover-bg-mid-gray hover-white w-100 hover-black" 
                        placeholder="User Pet" type="text" name="user-pet"  id="pet"      
                    />     
                    <div className="mt4" style={{display: "flex", justifyContent: "space-around"}}>
                        <button className="b pa2 grow pointer w-40 bg-gold b--white-20">  
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

export default Profile;