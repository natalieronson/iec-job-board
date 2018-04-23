import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom';
import Home from './home';
import Admin from './admin';
import JobPost from './jobPost';


var config = {
  apiKey: "AIzaSyCInp4pvpvhskPIdL9ErvkCTBPusHCfhNg",
  authDomain: "iec-job-board.firebaseapp.com",
  databaseURL: "https://iec-job-board.firebaseio.com",
  projectId: "iec-job-board",
  storageBucket: "",
  messagingSenderId: "1017426856269"
};
firebase.initializeApp(config);


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      createEmail: '',
      createPassword: '',
      loginEmail: '',
      loginPassword: '',
      jobTitle: '',
      jobLink: '',
      jobDescription: '',
      jobList: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.createUser = this.createUser.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.addJob = this.addJob.bind(this);
    

  }

  handleChange(event, field) {
    const newState = Object.assign({}, this.state);
    newState[field] = event.target.value;
    this.setState(newState);
  }

  handleInput(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  signOut() {
    firebase.auth().signOut().then(function (success) {
      console.log('Signed out!')
    }, function (error) {
      console.log(error);
    });
  }

  createUser(event) {
    event.preventDefault();
    const email = this.state.createEmail;
    const password = this.state.createPassword;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch((error) => console.log(error.code, error.message));

  }

  signIn(event) {
    event.preventDefault();
    const email = this.state.loginEmail;
    const password = this.state.loginPassword;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((success) => {
        console.log(`Logged in as ${success.email}`);
      }), (error) => {
        console.log(error);
      }
  }

  addJob(e) {
    e.preventDefault();
    const job = {
      jobTitle: this.state.jobTitle,
      jobLink: this.state.jobLink,
      jobDescription: this.state.jobDescription
    }
    const dbref = firebase.database().ref('/jobs')
    dbref.push(job);
    this.setState({
      jobTitle: '',
      jobLink: '',
      jobDescription: ''
    })
  }





  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      this.setState({
        loggedIn: true
      }, () => {
        const userDBRef = firebase.database().ref('/jobs');

        userDBRef.on('value', (snapshot) => {
          const jobList = []
          const data = snapshot.val();
          for (let key in data) {
            data[key].id = key;
            jobList.push(data[key]);
          }
          this.setState({
            jobList: jobList
          })
        });
      });
    }
    else {
      this.setState({
        loggedIn: false
      })
    }
  })
  }



    render() {
      return (
        <Router>
          <div>
            <Route 
              path="/"
              exact
              render={(props) => <Home {...props}
              jobList={this.state.jobList}
              handleInput={this.handleInput}
               />}
            />
            <Route 
              path="/admin" 
              exact
              render={(props) => <Admin {...props}
                data={this.state}
                loggedIn={this.state.loggedIn}
                signIn={this.signIn}
                handleChange={this.handleChange}
                signOut={this.signOut}
                handleInput={this.handleInput}
                addJob={this.addJob}
                jobList={this.state.jobList} />}
               />
          </div>
        </Router>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
