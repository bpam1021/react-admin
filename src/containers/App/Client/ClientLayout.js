import React, {Component} from "react";

import {Link} from 'react-router-dom';

export default class Client extends Component {
    render() {
        return (
            <div>
                <h1> Client  </h1>
                <Link to="/admin">Admin</Link>
            </div>
        );
    }
};