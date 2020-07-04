import React, { Component } from 'react';
import firebase from '../config/fire';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
const storage= firebase.storage();
class AddCarousel extends Component{
    constructor(props){
        super(props)
        this.ref = firebase.firestore().collection('carousel');
        this.state={
            isInteractive:false,
            isActive:false,
            image:null,
            photoURI:"",
            vendor:"",
            carouselID:Math.random().toString(36).substring(7)
        }
    }
    handleImageChange = e => {
        if (e.target.files[0]) {
        this.setState({image:e.target.files[0]})
        }
      };
      activeChange = e => {
        // e.preventDefault(); It's not needed
        const { isActive } = e.target;
        this.setState({
          isActive: !this.state.isActive  
        });
      }; 
      interactiveChange = e => {
        // e.preventDefault(); It's not needed
        const { isInteractive } = e.target;
        this.setState({
          isInteractive: !this.state.isInteractive  
        })
      }; 
      onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
      }
      onSubmit = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`/photos/${this.state.image.name}`).put(this.state.image) 
        uploadTask.on('state_changed', 
        (snapShot) => {
        }, (err) => {
          console.log(err)
        }, async () => {
          let photoURI = await storage.ref('photos').child(this.state.image.name).getDownloadURL()
          this.ref.doc(this.state.carouselID).set({
            photoURI
          },{ merge: true });
        })
        const {carouselID,vendor,isActive,isInteractive} = this.state;
        this.ref.doc(carouselID).set({
            vendor,
            carouselID,
            isActive,
            isInteractive
        }).then((docRef) => {
          this.setState({
              vendor:"",
              isActive:false,
              isInteractive:false
          });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
    render(){
        const {vendor,isActive,isInteractive}=this.state
        return(
            <div className="row">
          <table className="table table-borderless ">
            <thead className="thead-dark">
                <tr>
            <th><Typography variant="h4">
                Add New Carousel
              </Typography></th>
                    <th></th>
                    <th><Link to="/" >
               <button className="btn btn-primary">Home</button>
               </Link></th>
                </tr>
            </thead>
        </table>
        <div className="col-md-8 offset-md-2">
        <form autoComplete="off" onSubmit={this.onSubmit}>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-user"></i>
                    </div>
                </div>
                <input type="text" class="form-control" name="vendor" value={vendor} onChange={this.onChange} placeholder="Vendor Name" />
            </div>
            <div className="form-group input-group">
           <input type="file" onChange={this.handleImageChange} />
                </div>
            <div className="form-row">
            <div className="form-group input-group col-md-6">
            <div class="custom-control custom-switch">
                    <input type="checkbox"  id="isInteractive" onChange={this.interactiveChange} value={isInteractive} class="custom-control-input" />
                    <label class="custom-control-label" for="isInteractive">Interactive</label>
            </div>
            </div>
            <div className="form-group input-group col-md-6">
            <div class="custom-control custom-switch">
            <input type="checkbox"  id="isActive" onChange={this.activeChange} value={isActive} class="custom-control-input" />
                    <label class="custom-control-label" for="isActive">Active</label>
            </div>
            </div>
            </div>
            <div className="form-group">
            <button type="submit" class="btn btn-success">Submit</button>
            </div>
        </form>
          </div>
        </div>
        )
    }


}
export default AddCarousel;