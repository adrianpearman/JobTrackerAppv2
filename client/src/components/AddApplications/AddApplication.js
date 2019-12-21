import React, { Component } from "react";

// Redux
import { connect } from "react-redux";
import { onInputHandler } from "../../redux/actions/index";
// Components
import SingleUploads from "./SingleUpload";
import BulkUpload from "./BulkUpload";

class Tabs extends Component {
  state = { selected: 0 };

  handleChange(index) {
    this.setState({ selected: index });
  }

  render() {
    return (
      <div>
        <ul className="inline text-center">
          {this.props.children.map((elem, index) => {
            let style = index === this.state.selected ? "selected" : "";
            return (
              <li
                className={style}
                key={index}
                onClick={() => this.handleChange(index)}
              >
                {elem.props.title}
              </li>
            );
          })}
        </ul>
        <div className="tab">{this.props.children[this.state.selected]}</div>
      </div>
    );
  }
}

class AddApplication extends Component {
  render() {
    return (
      <div className="col-12">
        <Tabs selected={1}>
          <div title="Single Upload">
            <h2 className="text-center">Add an Application</h2>
            <SingleUploads />
          </div>
          <div title="Bulk Upload">
            <h2 className="text-center">Bulk Upload Applications</h2>
            <BulkUpload />
          </div>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    jobs: state.jobs
  };
};

export default connect(mapStateToProps, { onInputHandler })(AddApplication);
