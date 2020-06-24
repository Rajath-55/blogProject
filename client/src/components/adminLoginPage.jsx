import React, { Component } from "react";
import BlogCard from "./blogCard";
import axios from "axios";
import { Link } from "react-router-dom";

const bcrypt = require('bcryptjs')

class AdminLoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      usernameVerified : false,
      passwordVerified : true,
      redirect : "/login",
     
    };
  }
  handleUsernameChange = async (e) => {
    await this.setState({ username: e.target.value });
    console.log(this.state.username);
    const res = await this.getUsername();
    console.log(res);
    if(this.state.username === res)
       this.setState({usernameVerified : true})
  };
  handlePasswordChange = async (e) => {
       await this.setState({password : e.target.value});
       console.log(this.state.password);
       const res = await this.getPassword();
       console.log(res);
       if(this.state.password === res)
       this.setState({passwordVerified : true})
       

  }  
  handleSubmit = () => {
    if(this.state.usernameVerified && this.state.passwordVerified){
      this.setState({redirect : "/dashboard"})
    }
    else{
      alert("Wrong username or password!")
    }
  }

  getPassword = async () => {
      let res = await axios.get('/admin/login')
      // console.log(res, "getpassword")
      return res.data.admins[0].password;
      
  }
  getUsername = async () => {
    let res = await axios.get('/admin/login')
    // console.log(res, "gerusetnam")
    return res.data.admins[0].username;
    
}

  

  

  render() {
    return (
      <>
        <div className="container middle padding">
          <div className="jumbotron gradient">
            <form>
              <div className="form-group crete">
                <label for="exampleInputEmail1">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter username"
                  value={this.state.username}
                  onChange={this.handleUsernameChange}
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your details with anyone else.
                </small>
              </div>
              <div className="form-group crete">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                />
              </div>
              
              <div>
                <Link to={this.state.redirect} className="btn btn-primary" onClick={this.handleSubmit}>Submit</Link>
              </div>
            </form>
          </div>
        </div>

      </>
    );
  }
}

export default AdminLoginPage;
