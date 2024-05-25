import React, { Component } from 'react';
import Navigation from "./Components/Navigation/Navigation.js";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition.js";
import Logo from "./Components/Logo/Logo.js";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm.js";
import Rank from "./Components/Rank/Rank.js";
import Signin from "./Components/Signin/Signin.js";
import Register from "./Components/Register/Register.js";
import ParticlesBg from 'particles-bg';
import './App.css';

const initialState={
  input:"",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};

class App extends Component{
  constructor(){
    super();
    this.state={
      input:"",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: ""
      }
    };
  }

  loadUser=(data)=>{
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
  };

  calculateFaceLocation=(clarifaiFace)=>{
    const image=document.getElementById("inputimage");
    const width=Number(image.width);
    const height=Number(image.height);
    return {
      leftCol: clarifaiFace.left_col*width,
      topRow: clarifaiFace.top_row*height,
      rightCol: width-(clarifaiFace.right_col*width),
      bottomRow: height-(clarifaiFace.bottom_row*height)
    };
  };

  displayFaceBox=(box)=>{
    this.setState({box: box});
  };

  onInputChange=(event)=>{
    this.setState({input: event.target.value});
  };

  onButtonSubmit=()=>{
    this.setState({imageUrl: this.state.input});

        fetch("https://still-brushlands-93531-5b4027c4ac44.herokuapp.com/imageurl", {
          method: "post",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
              input: this.state.input
          })
        })
        .then(response=>response.json())
        .then(result => {
            const regions = result.outputs[0].data.regions;
            if(regions){

              const clarifaiFace=regions[0].region_info.bounding_box;

              fetch("https://still-brushlands-93531-5b4027c4ac44.herokuapp.com/image", {
                method: "put",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    id: this.state.user.id
                })
              })
              .then(response=>response.json())
              .then(count=>{
                this.setState(Object.assign(this.state.user, {entries: count}));
              }).catch(console.log);

              this.displayFaceBox(this.calculateFaceLocation(clarifaiFace));
          }else{
            this.setState({box: {}});
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

  render(){
    const {imageUrl, box, route, isSignedIn, user}=this.state;
    return (
      <div>
        <ParticlesBg num={50} type="lines" bg={{position:"absolute", zIndex:-1, top:0, left:0, height:"565px"}}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route==="home" 
          ? <div> 
              <Logo />
              <Rank name={user.name} entries={user.entries}/>
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition  box={box} imageUrl={imageUrl}/>
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
