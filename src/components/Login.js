import React, { Component, Fragment } from 'react';
import Axios from "./../utils/function";
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            ava: '',
            showModal:false,
            ShowBtn:true
        }
    }
    componentDidMount()
    {
        this.setState({username:localStorage.getItem('username'),ava:localStorage.getItem('ava')});
        if(localStorage.getItem('username')!=null)this.showForm();
    }
    getUserInfo = (e) => {
        e.preventDefault();
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        var formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        try {
            const file = this.fileUpload.files[0];
            formData.append('ava', file, file.name);
            for (var pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }
        } catch (error) {
            console.log("Not up load file");
        }

        Axios('/login', 'POST', formData).then((res) => {
            if (typeof res.data != "string") {
                this.setState({
                    username: res.data.username,
                    ava: res.data.ava

                });
                localStorage.setItem('username', res.data.username);
                localStorage.setItem('ava', res.data.ava);
                
            }
            console.log(res.data);
        });
    }
    showForm=()=>
    {    
         this.setState({showModal:true,ShowBtn:false});
    }
    render() {
        var {showModal,ShowBtn}=this.state;
        var hiddenClass=ShowBtn?'btn btn-success my-2 my-sm-0':'btn btn-success my-2 my-sm-0 hide' ;
       
        if(ShowBtn) return <a className= {hiddenClass}  onClick={()=> this.showForm()} >Login</a>;
        var { ava, username } = this.state;
        if (ava == ''||ava==null) {
            ava = "/image/ava.png";
        }

        if (username != null) return (<span><label id="username" className="label label-success">{username}</label>
            <img className="img-circle" src={ava} width="40" height="40" /></span>);
        else
            return (
                <form className="form-inline my-2 my-lg-0" onSubmit={this.getUserInfo} method="post" enctype="multipart/form-data">
                    <input class="form-control mr-sm-2 text-center" ref="username" type="text" placeholder="Username" name="username" required />
                    <input class="form-control mr-sm-2 text-center" ref="password" type="password" placeholder="Password" name="password" required />
                    <input type="file" class="form-control" ref={(ref) => this.fileUpload = ref} id="ava" name="ava" />
                    <input className="btn btn-success my-2 my-sm-0" type="submit" value="Login" />
                </form>
            );


    }
}

export default Login;