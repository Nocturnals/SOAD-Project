import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { matching } from "../../actions";

class docMatch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text1: "",
      text2: "",
      data: null,
      plag: null,
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayText = this.displayText.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { text1, text2 } = this.state;
    console.log(text1 + text2);
    if (text1 && text2) {
      this.props.matching(text1, text2);
    }
  }
  displayText = plager => {
    let marks = [];
    var allSentences = this.state.text2.split(".");
    var data;
    console.log(plager);

    if (this.props.docMatch.isLoading === false) {
      if (plager) {
        data = this.props.docMatch.vPlag.valueTwo;
        marks.push(
          <h3>
            verbatimPlagiarism (
            {this.props.docMatch.vPlag.valueOne.toFixed(4) * 100}%)
          </h3>
        );
      } else {
        // console.log(this.props.docMatch.pPlag.valueTwo);
        data = this.props.docMatch.pPlag.valueTwo;
        if (data > 1) {
          marks.push(
            <h3>
              paraphrasingPlagiarism (
              {this.props.docMatch.pPlag.valueOne.toFixed(4) * 100}%)
            </h3>
          );
        } else {
          marks.push(<h3>paraphrasingPlagiarism ({100}%)</h3>);
        }
      }

      console.log(data);
      let matched = [];
      for (let index = 0; index < data.length; index++) {
        if (data[index][1] < 0) {
          matched.push(allSentences.length - 1);
        } else {
          matched.push(data[index][1]);
        }
      }

      console.log("matched list: " + matched);
      // console.log(allSentences);
      console.log(allSentences.length);
      for (let index = 0; index < allSentences.length; index++) {
        if (matched.includes(index)) {
          marks.push(
            <mark style={{ backgroundColor: "lightblue" }}>
              {allSentences[index] + "."}
            </mark>
          );
        } else {
          marks.push(
            <mark style={{ backgroundColor: "white" }}>
              {allSentences[index] + "."}
            </mark>
          );
        }
      }
    }

    // console.log(data);

    // for (let index=0)
    return marks;
  };

  render() {
    return (
      <div className="docmatch container-fluid">
        <form onSubmit={this.handleSubmit} className="form docmatch row">
          <div className="md-form" className="col-6 p-4">
            text1 :{" "}
            <textarea
              id="form7"
              className="md-textarea form-control"
              name="text1"
              rows="10"
              cols="30"
              onChange={this.handleChange}
            ></textarea>
            <label for="form7">Material textarea</label>
          </div>

          <div className="col-6 p-4">
            text2 :{" "}
            <textarea
              id="form8"
              className="md-textarea form-control"
              type="text"
              rows="10"
              cols="30"
              name="text2"
              onChange={this.handleChange}
            ></textarea>
            <label for="form8">Material textarea</label>
          </div>
          <div className="col-12 text-center">
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>

        {this.displayText(true)}

        {this.displayText(false)}
      </div>
    );
  }
}
docMatch.prototypes = {
  matching: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  docMatch: state.docMatch
});

export default connect(mapStateToProps, { matching })(docMatch);
