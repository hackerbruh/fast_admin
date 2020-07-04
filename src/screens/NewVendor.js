import React, { Component } from 'react';
import firebase from '../config/fire';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
const user =firebase.firestore().collection('users');
const storage= firebase.storage();
class NewVendor extends Component {

  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('vendors');
    this.state = {
      vendor: '',
      openTime: '',
      closeTime: '',
      email:'',
      password:'',
      categories:[''],
      tags:[''],
      image:null,
      photoURI:"",
      isBusy:false,
      location:"",
      minPrice:0,
      averageRating:0,
      numRatings:0,

    };
  }
  handleImageChange = e => {
    if (e.target.files[0]) {
    this.setState({image:e.target.files[0]})
    }
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
      console.log(snapShot)
    }, (err) => {
      console.log(err)
    }, async () => {
      let photoURI = await storage.ref('photos').child(this.state.image.name).getDownloadURL()
      this.ref.doc(this.state.vendor).set({
        photoURI
      },{ merge: true });
    })
    const { averageRating,vendor, openTime, closeTime,categories,email,password,isBusy,tags,location,numRatings,minPrice} = this.state;
    this.ref.doc(vendor).set({
      name:vendor,
      openTime,
      closeTime,
      categories,
      isBusy,
      tags,
      physicalLocation:location,
      minOrder:Number(minPrice),
      averageRating,
      numRatings
    }).then((docRef) => {
      this.setState({
        openTime: '',
        closeTime: '',
        categories:[''],
        tags:[''],
        location:"",
        minPrice:0
      });
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });

    user.doc(email).set({
      email,
      vendor

    }).then((docRef) => {
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {   });
      this.setState({
       email: '',
       password:'',
      });
      this.props.history.push("/vendors")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }
  handleCategoryNameChange = idx => evt => {
    const newCategory = this.state.categories.map((category, sidx) => {
      if (idx !== sidx) return category;
      return evt.target.value;
    });

    this.setState({ categories: newCategory });
  };

  handleAddCategory = () => {
    this.setState({
      categories: this.state.categories.concat([ "" ])
    });
  };

  handleRemoveCategory = idx => () => {
    this.setState({
      categories: this.state.categories.filter((s, sidx) => idx !== sidx)
    });
  };
  handleTagNameChange = idx => evt => {
    const newTag = this.state.tags.map((tag, sidx) => {
      if (idx !== sidx) return tag;
      return evt.target.value;
    });

    this.setState({ tags: newTag });
  };

  handleAddTag = () => {
    this.setState({
      tags: this.state.tags.concat([ "" ])
    });
  };

  handleRemoveTag = idx => () => {
    this.setState({
      tags: this.state.tags.filter((s, sidx) => idx !== sidx)
    });
  };
  


  render() {
    const { vendor, openTime, closeTime,email,password,location,minPrice } = this.state;
    return (
        <div className="row">
          <table className="table table-borderless ">
            <thead className="thead-dark">
                <tr>
            <th><Typography variant="h4">
                Add New Vendor
              </Typography></th>
                    <th></th>
                    <th><Link to="/vendors" >
               <button className="btn btn-primary">Vendors List</button>
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
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-mobile-alt"></i>
                    </div>
                </div>
                <input type="text" class="form-control" name="openTime" value={openTime} onChange={this.onChange} placeholder="Opening Time" />
            </div>
            <div className="form-group input-group col-md-6">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-envelope"></i>
                    </div>
                </div>
                <input type="text" class="form-control" name="closeTime" value={closeTime} onChange={this.onChange} placeholder="Closing Time" />
            </div>    
            </div>
            <div className="form-row">
          {this.state.categories.map((category, idx) => (
          <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
              <div className="input-group-text">
                  <i className="fas fa-user"></i>
              </div>
          </div>
          <input
              type="text"
              placeholder={`Category #${idx + 1}`}
              value={category.name}
              onChange={this.handleCategoryNameChange(idx)}
            />
            <button
              type="button"
              onClick={this.handleRemoveCategory(idx)}
              className="btn btn-primary"
            >
              -</button>
            </div>
        ))}
        </div>
        <div className="form-group input-group col-md-6">
        <button
          type="button"
          onClick={this.handleAddCategory}
          className="btn btn-primary"
        >Add Category</button>
        </div>
        <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-envelope"></i>
                    </div>
                </div>
                <input type="email" class="form-control" name="email" value={email} onChange={this.onChange} placeholder="Email Address" />
            </div>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-envelope"></i>
                    </div>
                </div>
                <input type="password" class="form-control" name="password" value={password} onChange={this.onChange} placeholder="Password" />
            </div>
            <div className="form-row">
          {this.state.tags.map((tag, idx) => (
          <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
              <div className="input-group-text">
                  <i className="fas fa-user"></i>
              </div>
          </div>
          <input
              type="text"
              placeholder={`Tag #${idx + 1}`}
              value={tag.name}
              onChange={this.handleTagNameChange(idx)}
            />
            <button
              type="button"
              onClick={this.handleRemoveTag(idx)}
              className="btn btn-primary"
            >
              -</button>
            </div>
        ))}
        </div>
        <div className="form-group input-group col-md-6">
        <button
          type="button"
          onClick={this.handleAddTag}
          className="btn btn-primary"
        >Add Tag</button>
        </div>
        <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-envelope"></i>
                    </div>
                </div>
                <input type="text" class="form-control" name="location" value={location} onChange={this.onChange} placeholder="Location" />
            </div>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-envelope"></i>
                    </div>
                </div>
                <input type="number" class="form-control" name="minPrice" value={minPrice} onChange={this.onChange} placeholder="Min Price" />
            </div>
            <div className="form-group">
            <button type="submit" class="btn btn-success">Submit</button>
            </div>
        </form>
          </div>
        </div>
    );
  }
}

export default NewVendor;

