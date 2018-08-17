import React, { Component } from 'react';
import { connect } from "react-redux";
import { getRankRequest } from './../actions/index';

class UserContainer extends Component {
    constructor(props)
    {    
        super(props);
        this.props.getRank();
       
     
    }
    showResult=(rs) =>{
       var result =null;
       result = rs.map((e, i) => {

            return (<tr key={i}>
                <td className="stt" scope="row">{i+1}</td>
                <td>{e.username}</td>
                <td className="total">{e.total}</td>
            </tr>)
        });
        return result;
    }
    
    render() {

        var { username } = this.props;
        console.log(this.props.iqResult);
        console.log(this.props.choiceResult);
        var temp1=this.props.iqResult,temp2=this.props.choiceResult;
        var iqResult=null,choiceResult=null;
        if(temp1)  iqResult=this.showResult(temp1);
       if(temp2) choiceResult=this.showResult(temp2);
        


        return(<div className="container">
            <div className="row">
                <div className="col-md-10 col-md-offset-2">
                <br/>
                    <h2>Hi, <span id="hello">{localStorage.getItem('username')}</span></h2>
                    <h3>Just for fun. That is my practicions</h3>
                </div>
            </div>
            <br/>
            <div className="row">

                <div className="col-md-5">
                    <h3 className="text-center">Top IQ Quiz </h3>
                    <table className="table table-bordered table-responsive">
                        <thead className="thead-inverse table-success">
                            <tr>
                                <th>Stt</th>
                                <th>Username</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {iqResult}
                        </tbody>
                    </table>
                </div>

                <div className="col-md-5 col-md-offset-2">
                    <h3 className="text-center">Top Choice Quiz  </h3>
                    <table className="table table-bordered table-responsive">
                        <thead className="thead-inverse table-primary">
                            <tr>
                                <th>Stt</th>
                                <th>Username</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>

                            {choiceResult}

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
        );
    }


}
const mapStatetoProps = (state) => {

    return {
        username: state.user.username,
        password: state.user.password,
        avatar: state.user.avatar,
        iqResult:state.getRank.iqResult,
        choiceResult:state.getRank.choiceResult

    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        getRank: ()=>
        {
            dispatch(getRankRequest());
        }
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(UserContainer);