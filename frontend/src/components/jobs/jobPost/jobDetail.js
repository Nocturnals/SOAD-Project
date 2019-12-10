import React, { Component } from "react";

class JobDetail extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="jobDetail">
                    <div className="row detail qualifications">
                        <div className="col">
                            <h6 className="header">Qualifications:</h6>
                            <div className="row body qualifications">
                                <ul>
                                    <li>
                                        BS degree in Computer Science, similar
                                        technical field of study or equivalent
                                        practical experience.
                                    </li>
                                    <li>
                                        Software development experience in one
                                        or more general purpose programming
                                        languages.
                                    </li>
                                    <li>
                                        Experience working with two or more from
                                        the following: web application
                                        development, Unix/Linux environments,
                                        mobile application development,
                                        distributed and parallel systems,
                                        machine learning, information retrieval,
                                        natural language processing, networking,
                                        developing large software systems,
                                        and/or security software development.
                                    </li>
                                    <li>
                                        Working proficiency and communication
                                        skills in verbal and written English.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row detail aboutJob">
                        <div className="col">
                            <h6 className="header">About the job:</h6>
                            <div className="row body aboutJob">
                                Google aspires to be an organization that
                                reflects the globally diverse audience that our
                                products and technology serve. We believe that
                                in addition to hiring the best talent, a
                                diversity of perspectives, ideas and cultures
                                leads to the creation of better products and
                                services.<br></br>
                                <br></br> Google's software engineers develop
                                the next-generation technologies that change how
                                billions of users connect, explore, and interact
                                with information and one another. Our products
                                need to handle information at massive scale, and
                                extend well beyond web search. We're looking for
                                engineers who bring fresh ideas from all areas,
                                including information retrieval, distributed
                                computing, large-scale system design, networking
                                and data storage, security, artificial
                                intelligence, natural language processing, UI
                                design and mobile; the list goes on and is
                                growing every day. As a software engineer, you
                                will work on a specific project critical to
                                Google’s needs with opportunities to switch
                                teams and projects as you and our fast-paced
                                business grow and evolve. We need our engineers
                                to be versatile, display leadership qualities
                                and be enthusiastic to take on new problems
                                across the full-stack as we continue to push
                                technology forward.
                            </div>
                        </div>
                    </div>
                    <div className="row detail responsibilities">
                        <div className="col">
                            <h6 className="header">Responsibilities:</h6>
                            <div className="row body responsibilities">
                                <ul>
                                    <li>
                                        Design, develop, test, deploy, maintain
                                        and improve software.
                                    </li>
                                    <li>
                                        Manage individual project priorities,
                                        deadlines and deliverables.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <button className="applyButton">Apply</button>
                </div>
            </React.Fragment>
        );
    }
}

export default JobDetail;
