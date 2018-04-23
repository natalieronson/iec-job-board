import React from 'react';

export default function (props) {
    return (
        <div className="editJobForm">
            <input type="text" value={props.jobTitle} id="editTitle" onChange={props.handleInput} />
            <input type="text" value={props.jobLink} id="editLink" onChange={props.handleInput}/>
            <textarea value={props.jobDescription} id="editDescription" onChange={props.handleInput}></textarea>
            <button onClick={props.saveChanges}>Save</button>
            <button onClick={props.cancelChanges}>Cancel</button>
        </div>
    )
}