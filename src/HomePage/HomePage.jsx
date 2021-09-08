import React from 'react';
import { Auditpage } from '../Audit';

import { history } from '../_helpers';
import { Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import './Homepage.css';
import { Navbar, Nav } from 'react-bootstrap';
class HomePage extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;
        return (<div>         <Navbar bg="dark" variant="dark">
            <Navbar.Brand ></Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link ><Link to="/">Home</Link></Nav.Link>
                <Nav.Link ><Link to="/Audit">Auditor</Link></Nav.Link>
                <Nav.Link> <Link to="/login">Logout</Link></Nav.Link>
            </Nav>
        </Navbar>
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.firstName}!</h1>
                <p>Welcome to the Home page!! your role is "{user.role}"</p>
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    // <ul>
                    //     {users.items.map((user, index) =>
                    //         <li key={user.id}>
                    //             {user.firstName + ' ' + user.lastName}
                    //             {
                    //                 user.deleting ? <em> - Deleting...</em>
                    //                     : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                    //                         : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                    //             }
                    //         </li>
                    //     )}
                    // </ul>
                    <table className="table table-striped table-class">
                            <thead>
	                            <tr>
		                        <th>Id</th>
		                        <th>Role</th>
		                        <th>Created Date</th>
		                        <th>First Name</th>
                                <th>Last Name</th>
	                            </tr>
                            </thead>
                           
                            <tbody>
                            {users.items.map((user, index) =>
                                <tr>
		                            <td>{user.id}</td>
		                            <td>{user.role}</td>
		                            <td>{user.createdDate}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{
                                        user.deleting ? <em> - Deleting...</em>
                                            : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                                : <span> <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                    }</td>
	                            </tr>
                            )}
                            </tbody>
                        </table>
                }
                <p>
                </p>
            </div>
        </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };