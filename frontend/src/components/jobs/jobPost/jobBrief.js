import React, { Component } from "react";
import { Link } from "react-router-dom";

class JobBrief extends Component {
    render() {
        return (
            <React.Fragment>
                <h6 className="header">Qualifications:</h6>
                <div className="row body qualifications">
                    <ul>
                        <li>
                            BS degree in Computer Science, similar technical
                            field of study or equivalent practical experience.
                        </li>
                        <li>
                            Software development experience in one or more
                            general purpose programming languages.
                        </li>
                        <li>
                            Experience working with two or more from the
                            following: web application development, Unix/Linux
                            environments, mobile application development,
                            distributed and parallel systems, machine learning,
                            information retrieval, natural language processing,
                            networking, developing large software systems,
                            and/or security software development.
                        </li>
                        <li>
                            Working proficiency and communication skills in
                            verbal and written English.
                        </li>
                    </ul>
                </div>
                <Link to="/jobs/job/results/">
                    <button className="expandJob">Expand</button>
                </Link>
            </React.Fragment>
        );
    }
}

export default JobBrief;
