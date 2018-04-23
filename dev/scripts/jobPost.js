import React from 'react';

export default function (props) {
    return (
        <div className="wrapper jobPost">
            <h1>{props.job.jobTitle}</h1>
            <a href={props.job.jobLink} target="_blank">{props.job.jobLink}</a>
            <p>{props.job.jobDescription}</p>
            {props.adminView ? 
                <div>
                    <p onClick={()=>props.editJob(props.job.id)} className="edit"> Edit </p>
                    <p onClick={()=>props.deleteJob(props.job.id)} className="delete"> Delete </p>
                </div>
            : null
            }
        </div>
    )
}