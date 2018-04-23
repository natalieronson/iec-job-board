import React from 'react';
import JobPost from './jobPost';
import EditJob from './editJob';

class Admin extends React.Component {
    constructor() {
        super();
        this.state = {
            addJobView: true,
            viewExistingJobs: false,
            admin: true,
            selectedJob: '',
            editMode: false,
            editTitle: '',
            editLink: '',
            editDescription: ''
        }
        this.viewExistingJobs = this.viewExistingJobs.bind(this);
        this.addJobView = this.addJobView.bind(this);
        this.deleteJob = this.deleteJob.bind(this);
        this.editJob = this.editJob.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.cancelChanges = this.cancelChanges.bind(this);
        this.handleInput = this.handleInput.bind(this);

    }

    viewExistingJobs() {
        this.setState({
            addJobView: false,
            viewExistingJobs: true
        })
    }

    addJobView() {
        this.setState({
            addJobView: true,
            viewExistingJobs: false
        })
    }

    deleteJob(jobID) {
        const result = window.confirm("Do you want to delete this job?");
        if (result) {
            const dbref = firebase.database().ref(`/jobs/${jobID}`);
            dbref.remove();
        }
    }

    saveChanges() {
        const job = {
            jobTitle: this.state.editTitle,
            jobLink: this.state.editLink,
            jobDescription: this.state.editDescription
        }
        const dbref = firebase.database().ref(`jobs/${this.state.selectedJob}`);
        dbref.set(job);
        this.setState({
            editTitle: '',
            editLink: '',
            editDescription: '',
            editMode: false,
            selectedJob: ''
        })
    }

    editJob (jobID) {
        // if(jobID) {
        //     this.setState({
        //         selectedJob: jobID
        //     })
        // }
        const dbref = firebase.database().ref(`/jobs/${jobID}`);
        dbref.on('value', (snapshot) => {
            const data = snapshot.val();
            this.setState({
                editMode: true,
                editTitle: data.jobTitle,
                editLink: data.jobLink,
                editDescription: data.jobDescription,
            })
            
        })

        console.log("edit")
        console.log(jobID)
        this.setState({
            selectedJob: jobID
        })
        
        
    }

    handleInput(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    cancelChanges() {
        console.log("cancel");
        this.setState({
            editMode: false,
            editTitle: '',
            editLink: '',
            editDescription: ''
        })
    }




    render() {
       return (
           <div>
               <div>
                   {this.props.loggedIn ? 
                   <div>
                        <nav>
                            <ul>
                                <li onClick={this.addJobView}>Add Job</li>
                                <li onClick={this.viewExistingJobs}>View Current Jobs</li>
                                <li onClick={this.props.signOut}>Sign Out</li>
                            </ul>
                        </nav>
                        {this.state.viewExistingJobs ? 
                            this.props.jobList.map((job) => {
                                return (
                                    <JobPost job={job} adminView={this.state.admin} deleteJob = {this.deleteJob} editJob={this.editJob}/>
                                )
                            })
                            : null }
                            {this.state.editMode ? 
                                <EditJob jobTitle={this.state.editTitle} jobLink={this.state.editLink} jobDescription={this.state.editDescription} saveChanges={this.saveChanges} handleInput={this.handleInput} cancelChanges={this.cancelChanges} />
                                :
                                null
                            }

                        {this.state.addJobView ? 
                            <form className="addJobForm addPosting">
                                <input type="text" placeholder="Job Title" onChange={this.props.handleInput} id="jobTitle" value={this.props.data.jobTitle} />
                                <input type="text" placeholder="Link" id="jobLink" onChange={this.props.handleInput} value={this.props.data.jobLink} />
                                <textarea name="" id="" placeholder="Description" id="jobDescription" onChange={this.props.handleInput} value={this.props.data.jobDescription}></textarea>
                                <button onClick={this.props.addJob}>Add new job</button>
                            </form>
                            : null
                        }
                        
                   </div>
                    :
                   <form className="login" onSubmit={(event) => this.props.signIn(event)}>
                       <input type="text" placeholder="Please enter your e-mail address" onChange={(event) => this.props.handleChange(event, "loginEmail")} />
                       <input type="password" placeholder="Please enter your password" onChange={(event) => this.props.handleChange(event, "loginPassword")} />
                       <button>Login</button>
                   </form>
                   }

               </div>
           </div>
       )
    }
}

export default Admin;