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


const app = new Clarifai.App({
 apiKey: '8d360775eaf1414aabc8116be7cd0c65'
});

class App extends Component {


  constructor()
  {
      super();
      this.state = {
        imageUrl: '',
        boxArray: [],
        route: 'signin' 
      };
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
        this.setState({imageUrl: event.target.value, boxArray: []});
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
             this.setState({imageUrl: this.state.imageUrl})

             app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.imageUrl)
             .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
             .catch(err => console.log(err));
         } 
  }

  onRouteChange = (route) => {

    this.setState({route: route});

  }

  


  render() {
    return (
      <div className="App">
          <Particles className='particles' params={particlesConfig} />
          <Navigation routeStatus={this.state.route} onRouteChange={this.onRouteChange} />
          {
            this.state.route === 'home' 
            ? <div>
                <Logo />  
                <ImageLinkForm updateImage={this.updateImage} detectImage={this.detectImage} />
                <FaceRecognition boxArray={this.state.boxArray} imageURL={this.state.imageUrl} />
              </div>

            : (
                this.state.route === 'signin'
                ? <SignIn onRouteChange={this.onRouteChange} />
                : <SignUp onRouteChange={this.onRouteChange} />

              )

              
          }
           
      </div>
    );
  }
}

export default App;
