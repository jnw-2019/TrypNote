import React, { Component } from 'react';

class Login extends Component {

    render () {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col">
                        <div className="card text-center mt-5 w-50 mx-auto">
                            <div className="card-body">
                                <h2>TrypNote</h2>
                                <form>
                                    <div className="form-group">
                                        <input type="email" className="form-control" name="email" placeholder="Email" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" name="password" placeholder="Password" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
