import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import particlesConfig from './particles.json';
import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Rank from './components/Rank/Rank';


const app = new Clarifai.App({
 apiKey: '8d360775eaf1414aabc8116be7cd0c65'
});

const initialState = {
        imageUrl: '',
        boxArray: [],
        route: 'signin',
        urlError: false,
        user: {}
      };

class App extends Component {


  constructor()
  {
      super();
      this.state = initialState;
  }

  loadUser = (user) => {
      this.setState({user: user});
  }


  componentDidMount() {


  }


  checkURL = (url) =>  
  {
    const words = ['jpeg', 'jpg', 'png'];


    return(new RegExp(words.join('|')).test(url));
  }

  updateImage = (event) => 
  {
      if(this.checkURL(event.target.value))
      {
        this.setState({imageUrl: event.target.value, urlError: false, boxArray: []});
      }
      else
      {
        this.setState({imageUrl: '', urlError: true, boxArray: []});
      }

  }

  calculateFaceLocation = (data) =>
  {

    const clarifaiData = data.outputs[0].data.regions;
    // console.log(clarifaiData);
    
    if(clarifaiData !== undefined)
    {
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height); 

      const clarifaiFaces = clarifaiData.map((data, i) => {
          
          return {
            leftCol: data.region_info.bounding_box.left_col * width,
            topRow: data.region_info.bounding_box.top_row * height,
            rightCol: width - (data.region_info.bounding_box.right_col * width),
            bottomRow: height - (data.region_info.bounding_box.bottom_row * height)
          };
      });

      return clarifaiFaces;
    }
    return null;

  }

  displayFaceBox = (boxArray) => {
    // console.log(boxArray);
    if(boxArray)
    {
      this.setState({boxArray: boxArray});
    }
    

  }

  detectImage = (event) =>
  {
    if(this.checkURL(this.state.imageUrl))
         {
             // console.log(this.state.imageUrl);
             this.setState({imageUrl: this.state.imageUrl, urlError: false});
             app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.imageUrl)
             .then(response => {

                this.displayFaceBox(this.calculateFaceLocation(response))
                if(response)
                {
                    fetch("http://localhost:3001/image", {
                      method: 'put',
                      headers: {'Content-Type': 'application/json'},
                      body: JSON.stringify({
                        id: this.state.user.id
                      })
                    })
                    .then(response => response.json())
                    .then(count => {
                        this.setState(Object.assign(this.state.user, {entries: count}));
                    });
                }

              })  
             .catch(err => console.log(err));
         }
         else
         {
              this.setState({urlError: true});
         } 
  }

  onRouteChange = (route) => {

    if(route === 'signout')
    {
      this.setState(initialState);
    }
    else
    {
      this.setState({route: route});
    }
    

  }


  routeSwitch = (route) => {
    switch(route)
    {
       
       case 'signin':
       {
          return <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
       }
      
       case 'signupSuccess':
       {
         return <SignIn showSignUpSuccess={true} onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
       }
      
       case 'home':
       {
          return (
            <div>
            <Logo /> 
            <Rank user={this.state.user.name} rank={this.state.user.entries}/> 
            <ImageLinkForm updateImage={this.updateImage} detectImage={this.detectImage} urlError={this.state.urlError}/>
            <FaceRecognition boxArray={this.state.boxArray} imageURL={this.state.imageUrl} />
          </div>
          );
       }
      
       case 'signup':
       {
          return <SignUp onRouteChange={this.onRouteChange} />
       }
      
       default:
       {
          return <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}  />
       }
    }
  }
  


  render() {
    return (
      <div className="App">
          <Particles className='particles' params={particlesConfig} />
          <Navigation routeStatus={this.state.route} onRouteChange={this.onRouteChange} />
          {this.routeSwitch(this.state.route)}      
      </div>
    );
  }
}

export default App;
