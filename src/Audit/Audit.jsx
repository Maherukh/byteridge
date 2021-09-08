import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { Pagination } from '../Pagination/Pagination';


import { Navbar, Nav } from 'react-bootstrap';
import { users } from '../_reducers/users.reducer';


class Auditpage extends React.Component {
    
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    timeChangeHandler(event, users) {
        if(event.target.value === "12") {
            users.items.map(function changeDate(user){
                let d = new Date(user.createdDate).toLocaleString();
                user.createdDate = d;
                //code working as console.log useState not working
                console.log(d)
            })
        }
        else {
            users.items.map(function changeDate(user){
                let time = new Date(user.createdDate).toLocaleTimeString('it-IT');
                let date = new Date(user.createdDate).toLocaleDateString(undefined);
                let comDate = date + " " + time;
                user.createdDate = comDate;
                //code working as console.log useState not working
                console.log(comDate)
            })
        }
    }

    //for pagination not working
    // const [posts, setPosts] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [postsPerPage] = useState(10);
    // const indexOfLastPost = currentPage * postPerPage;
    // const indexOfFirstPost = indexOfFirstPost - postsPerPage;
    // const currentPosts = users.slice(this.indexOfFirstPost, this.indexOfLastPost);
    //changing pages 
    // const paginate = (pageNumber) => setCurrentPage(PageNumber)
 
    render() {
        const { user, users } = this.props;
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand ></Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link ><Link to="/">Home</Link></Nav.Link>
                        <Nav.Link href="#features">Auditor</Nav.Link>
                        <Nav.Link> <Link to="/login">Logout</Link></Nav.Link>
                    </Nav>
                </Navbar>

                <div className="col-md-6 col-md-offset-3">
                    <h1>Hi {user.firstName}!</h1>
                    <p>Welcome to the audit page!! your role is "{user.role}"</p>
                    <select onChange={() => this.timeChangeHandler(event, users)}>
                        <option value="12" >12 hour</option>
                        <option value="24" selected>24 hour</option>
                    </select>
                    <h3>All login audit :</h3>
                    
                    {users.loading && <em>Loading users...</em>}
                    {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                    {users.items && <table className="table table-striped table-class">
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
                                {users.items.map((user) =>
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
                    {/* <Pagination postsPerPage={postsPerPage} totalPosts={users.length} paginate={paginate}/> */}
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

const connectedAuditPage = connect(mapState, actionCreators)(Auditpage);
export { connectedAuditPage as Auditpage };