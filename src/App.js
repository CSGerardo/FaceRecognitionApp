import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import Navigation from "./Components/Navigation/Navigation.js";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition.js";
import Logo from "./Components/Logo/Logo.js";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm.js";
import Rank from "./Components/Rank/Rank.js";
import Signin from "./Components/Signin/Signin.js";
import Register from "./Components/Register/Register.js";
import ParticlesBg from 'particles-bg';
import Profile from "./Components/Profile/Profile.js"
import './App.css';

const initialState={
  input:"",
  imageUrl: "",
  boxes: [],
  route: "signin",
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
    pet: "",
    age: ""
  }
};

class App extends Component{
  constructor(){
    super();
    this.state=initialState;

  }

  componentDidMount(){
    const token=window.localStorage.getItem("token");
    if (token){
      fetch("https://still-brushlands-93531-5b4027c4ac44.herokuapp.com/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      })
      .then(resp=>resp.json())
      .then(data=>{
        if(data && data.id){
          fetch(`https://still-brushlands-93531-5b4027c4ac44.herokuapp.com/profile/${data.id}`, {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              "Authorization": token
            }
          })
          .then(resp=>resp.json())
          .then(user=>{
            if(user && user.email){
              this.loadUser(user);
              this.onRouteChange("home");
            }
          })
        }
      })
      .catch(console.log);
    }
  };

  loadUser=(data)=>{
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
      pet: data.pet,
      age: data.age
    }});
  };

  calculateFaceLocations=(regions)=>{
    if (regions && regions[0]){
      return regions.map(face=>{
        const clarifaiFace=face.region_info.bounding_box
        const image=document.getElementById("inputimage");
        const width=Number(image.width);
        const height=Number(image.height);
        return {
          leftCol: clarifaiFace.left_col*width,
          topRow: clarifaiFace.top_row*height,
          rightCol: width-(clarifaiFace.right_col*width),
          bottomRow: height-(clarifaiFace.bottom_row*height)
        };
      });
    }
    return;
  };

  displayFaceBoxes=(boxes)=>{
    if (boxes){
      this.setState({boxes: boxes});
    }
  };

  onInputChange=(event)=>{
    this.setState({input: event.target.value});
  };

  onButtonSubmit=()=>{
    this.setState({imageUrl: this.state.input});

        fetch("https://still-brushlands-93531-5b4027c4ac44.herokuapp.com/imageurl", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          "Authorization": window.localStorage.getItem("token")
        },
          body: JSON.stringify({
              input: this.state.input
          })
        })
        .then(response=>response.json())
        .then(result => {
            const regions = result.outputs[0].data.regions;
            if(regions){

              fetch("https://still-brushlands-93531-5b4027c4ac44.herokuapp.com/image", {
                method: "put",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": window.localStorage.getItem("token")
                },
                body: JSON.stringify({
                    id: this.state.user.id
                })
              })
              .then(response=>response.json())
              .then(count=>{
                this.setState(Object.assign(this.state.user, {entries: count}));
              }).catch(console.log);

              this.displayFaceBoxes(this.calculateFaceLocations(regions));
          }else{
            this.setState({boxes: []});
          }
        })
        .catch(error => console.log('error', error));
  };

  onRouteChange=(route)=>{
    if(route==="signout"){
      this.setState(initialState);
      this.setState({route:"signin"});
      return;
    }else if (route==="home"){
      this.setState({isSignedIn: true});
    }
    this.setState({route:route});
  };

  toggleModal=()=>{
    this.setState(prevState=>({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }));
  };

  render(){
    const {imageUrl, boxes, route, isSignedIn, user, isProfileOpen}=this.state;
    return (
      <div>
        <ParticlesBg num={50} type="lines" bg={{position:"absolute", zIndex:-1, top:0, left:0, height:"565px"}}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} toggleModal={this.toggleModal}/>
        { isProfileOpen && createPortal(
          <Profile 
            isProfileOpen={isProfileOpen} 
            toggleModal={this.toggleModal}
            loadUser={this.loadUser}
            user={user}
          />,
          document.getElementById("modal-root")
        )}
        {route==="home" 
          ? <div> 
              <Logo />
              <Rank name={user.name} entries={user.entries}/>
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition  boxes={boxes} imageUrl={imageUrl}/>
            </div>
          : (
                route==="signin"
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            ) 
        }
      </div>
    );
  };
};

export default App;
