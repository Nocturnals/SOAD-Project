import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { matching } from "../../actions";

class docMatch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text1: "as",
      text2: "",
      data: null,
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { text1, text2 } = this.state;
    if (text1 && text2) {
      this.props.matching(text1, text2);
      this.setState({ data: docMatch.value });
      console.log(this.state.data);
    }
  }

  render() {
    return (
      <div className="docmatch">
        <form onSubmit={this.handleSubmit} className="form docmatch">
          text1 :{" "}
          <input type="text" name="text1" onChange={this.handleChange} />
          <br></br>
          <br></br>
          text2 :{" "}
          <input type="text" name="text2" onChange={this.handleChange} />
          <br></br>
          <button className="button-badge">Submit</button>
          {!this.props.docMatch.isFailed ? (
            <p>{this.props.docMatch.value.valueOne}</p>
          ) : (
            <p>Null</p>
          )}
        </form>
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
