import React from 'react';
import JobPost from './jobPost';

class Home extends React.Component {
    constructor() {
        super();

        this.state = {
            admin: false,
            careers: true,
            postJob: false,
            newsletter: false,
            contact: false,
            subscribeEmail: ''
        }
        this.postJobView = this.postJobView.bind(this);
        this.careerView = this.careerView.bind(this);
        this.newsletterView = this.newsletterView.bind(this);
        this.contactView = this.contactView.bind(this);
        this.getSubscribeEmail = this.getSubscribeEmail.bind(this);
    }

    postJobView() {
        this.setState ({
            careers: false,
            postJob: true,
            newsletter: false,
            contact: false
        })
    }

    careerView() {
        this.setState ({
            careers: true,
            postJob: false,
            newsletter: false,
            contact: false
        })
    }

    newsletterView() {
        this.setState ({
            careers: false,
            postJob: false,
            newsletter: true,
            contact: false
        })
    }

    contactView() {
        this.setState ({
            careers: false,
            postJob: false,
            newsletter: false,
            contact: true
        })
    }

    getSubscribeEmail() {
        console.log("subscribed");
    }

    

    render() {
        return (
            <div>
                <nav>
                   <ul>
                        <li onClick={this.careerView}>Careers</li>
                        <li onClick={this.postJobView}>Post a job</li>
                        <li onClick={this.newsletterView}>Newsletter</li>
                        <li onClick={this.contactView}>Contact</li>
                   </ul>
                </nav>
                {this.state.careers ?
                <p className="wrapper">Welcome to intedcareers.ca – the source for international education jobs across Canada. Whether you want to post a vacancy or are looking for a new position, you have come to the right place. 
                Here are the latest jobs available: 
                </p>
                 : null
                }
                {this.state.postJob ? 
                <div>
                    <p className="wrapper">Looking for top talent to fill a vacancy in your organization? We can help. We work with organizations across the international sector in Canada, including: 
                        -	School districts
                        -	Colleges and universities
                        -	Language schools
                        -	Private schools
                        -	Homestay agencies
                        -	Student recruiting companies
                        Filling your vacancy
                        When you post an opening with us, it’s listed on the website and made available to job-seekers across the country. With each posting, we include a listing in our twice-monthly newsletter, which is chock full of news about the international education sector in Canada. Each job vacancy is promoted for 30 days. 
                        It’s free!
                        Until June 30, 2018, you can post your vacancy at no cost. 
                    </p>
                    <div>
                        <form className="addPosting wrapper">
                                <input type="text" placeholder="Name" id="postingName" />
                                <input type="text" placeholder="Organization" id="postingOrganization" />
                                <input type="text" placeholder="Email" id="postingEmail" />
                                <input type="text" placeholder="Phone" id="postingPhone" />
                                <input type="text" placeholder="Job Title" id="postingTitle" />
                                <input type="text" placeholder="Link" id="postingLink" />
                                <input type="text" placeholder="Location" id="postingLocation" />
                                <textarea placeholder="Description" id="postingDescription"></textarea>
                                <button>Submit Job </button>
                        </form>
                    </div>
                </div>
                : null 
                }
                {this.state.newsletter ? 
                <div className="wrapper newsletter">
                    <p>The International Education Times is Canada’s source for news about the international education sector. It’s published twice monthly and is a must-read for everyone who wants to keep up to date about the industry. 
                    In each issue of the International Education Times, the latest job listings are posted. This provides outstanding publicity to organizations wishing to fill job vacancies. 
                    Subscribe now: 
                    </p>
                    <form>
                        <input placeholder="Email" id="subscribeEmail" onChange={this.props.handleInput} />
                        <button onClick={this.getSubscribeEmail}>Subscribe!</button>
                    </form>
                </div>

                
                :null
                }
                {this.state.contact ? 
                <p className="wrapper">To learn more about International Education Careers, please contact Doug Ronson at:
                613-888-9560
                douglasronson (at) yahoo.ca
                </p>                
                :null
                }
                {this.props.jobList && this.state.careers ? 
                    <div className="jobListings">
                    {this.props.jobList.map((job) => {
                       return (
                           <JobPost job={job} adminView={this.state.admin} />
                       ) 
                    })}
                    </div>
                    : 
                    null
                }
                
            </div>
        )
    }
    
}

export default Home;