import React, {Component} from 'react';
import './users.css';

let axios = require('axios');


class Users extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            isUserGet: false,
            userName: '',
            userEmail: '',
            userPhone: '',
            userWorkPlace: ''
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleChangeWorkPlace = this.handleChangeWorkPlace.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }

    handleDelete(event){

        let parentNode = event.target.parentNode.parentNode;
        let email = parentNode.querySelectorAll('td')[1].textContent;
        let users = this.state.users;
        for(let i=0;i<users.length;i++){

            if(users[i].email===email){
                this.state.users.splice(i,1);
                this.setState({users:this.state.users});
                break;
            }

        }
        event.preventDefault()

    }

    handleChangeName(event) {

        this.setState({userName: event.target.value});

    }
    handleChangeEmail(event) {

        this.setState({userEmail: event.target.value});

    }
    handleChangePhone(event) {

        this.setState({userPhone: event.target.value});

    }
    handleChangeWorkPlace(event) {

        this.setState({userWorkPlace: event.target.value});

    }

    handleSubmit(event) {
        //console.log(this.state.users);
        //alert('User was submitted: ' + this.state.userName + ' ' + this.state.userEmail + ' ' + this.state.userPhone + ' ' + this.state.userWorkPlace);

        let newUser = {

            name: this.state.userName,
            email: this.state.userEmail,
            phone: this.state.userPhone,
            company:
                {

                    name:this.state.userWorkPlace

                }

        };
        this.state.users.push(newUser);
        //console.log(this.state.users);

        this.setState({users:this.state.users});
        event.preventDefault();
    }

    componentWillMount() {

        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                let users = response.data;
                this.setState({users});
                this.setState({isUserGet: true})
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {
        let ListUser = (props) => {
            //console.log(props);
            return <tr>

                <td>{props.value.name}</td>
                <td>{props.value.email}</td>
                <td>{props.value.phone}</td>
                <td>{props.value.company.name}</td>
                <td onClick={this.handleDelete} className="text-center show-on-hover" style={{cursor: 'pointer'}}><b>x</b></td>

            </tr>
        };

        let UserList = (props) => {

            const users = props.users;
            //console.log(users);
            const listUsers = users.map((user) =>

                <ListUser key={user.email.toString()}
                          value={user}/>
            );
            return (

                <tbody>{listUsers}</tbody>

            );
        };

        let component;
        const isUsersGet = this.state.isUserGet;
        if (isUsersGet) {
            component = (
                <div>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Work place</th>
                        </tr>
                        </thead>
                        <UserList users={this.state.users}/>
                    </table>
                    <div className="h3">Adding user</div>

                    <form>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Name"
                                   value={this.state.userName} onChange={this.handleChangeName}/>
                        </div>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="text" className="form-control" id="email" placeholder="Email"
                                   value={this.state.userEmail} onChange={this.handleChangeEmail}/>
                        </div>
                        <div className="form-group">
                            <label>Phone number</label>
                            <input type="text" className="form-control" id="phone" placeholder="Phone"
                                   value={this.state.userPhone} onChange={this.handleChangePhone}/>
                        </div>
                        <div className="form-group">
                            <label>Place of work</label>
                            <input type="text" className="form-control" id="work" placeholder="Work place"
                                   value={this.state.userWorkPlace} onChange={this.handleChangeWorkPlace}/>
                        </div>
                        <div className="form-group">
                            <button onClick={this.handleSubmit} type="button" className="btn btn-info">Add user</button>
                        </div>
                    </form>
                </div>
            )
        }
        else {
            component = (
                <div className="panel panel-default">
                    <div className="panel-body">
                        No users found.
                    </div>
                </div>
            )
        }
        return component;
    }

}

export default Users;