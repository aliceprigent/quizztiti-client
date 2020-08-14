import React, { Component } from 'react'
import { Link } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import { withUser } from "../Auth/withUser";
import apiUser from "../../api/apiUser";

export class MemberManagement extends Component {



    componentDidMount() {
        const managedMemberId = this.props.location.state
        console.log(managedMemberId)
        apiUser
        .manageUser(managedMemberId)
        .then((apiRes) => {
            console.log(apiRes)
        //   this.setState(
        //     {
        //       name: apiRes.data.name,
        //       email: apiRes.data.email,
        //       password: apiRes.data.password,
        //       image: apiRes.data.image,
        //     },
        //   );
        })
        .catch((error) => {
          console.log(error);
        });
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default withUser(MemberManagement)
