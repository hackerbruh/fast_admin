import React, { Component } from 'react';
import './App.css';
import fire from './config/fire';
import Login from'./screens/Login';
import Home from './screens/Home';
class App extends Component{
  constructor(props){
    super(props);
    this.state={
      user: null,
    }
  }
  componentDidMount(){
    this.authListener();
  }
  
  authListener(){
    fire.auth().onAuthStateChanged((user)=>{
      if(user){
        const db = fire.firestore()
        var users = fire.auth().currentUser;
        const docRef = db.collection("users").doc(users.email);
        docRef.get().then((doc)=> {
            if (doc.exists) {
                const datadb = doc.data();
                if(datadb.role=="admin"){
                  console.log(datadb.role)
                  this.setState({user})
                }
            } else {
                console.log("No such document!");
                this.setState({user:null})
            }
        })
      }
      else{
        this.setState({user:null})
      }
    })
  }

  render(){
    return (
      <div className="App">
        {!this.state.user?<Login/>:<Home/>}
      </div>
    );
  }
}


export default App;
