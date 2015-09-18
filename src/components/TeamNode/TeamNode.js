import React, { PropTypes } from 'react';
import styles from './TeamNode.css';
import withViewport from '../../decorators/withViewport';
import withStyles from '../../decorators/withStyles';
import Link from '../../utils/Link';
import $ from 'jquery';

// Why do I need decorators?
@withViewport
@withStyles(styles)
class TeamNode {

  // What do these do?
  static propTypes = {
    viewport: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }).isRequired
  };

    constructor() {
        // super();

        this.state = {
            name: "TEAMNAME",
            desc: "This is a Description",
            desc_visable: true
        };
    };
  display() {
    var element = document.getElementById("CenterNodeDescription");

    console.log("enter");
    console.log(this.state.desc_visable);
    if (this.state.desc_visable) {
      element.style.display = 'none';
      this.state.desc_visable = false;
    }else{
      element.style.display = 'inline-block';
      this.state.desc_visable = true;
    }


  }
  render() {

    let { width, height } = this.props.viewport;
    var name = this.props.name;
    var desc = this.props.desc;
    return !this.props.error ? (
      <div className="TeamNode-Buffer" id="CenterNode">
        <div className="TeamNode" onClick={this.display.bind(this)}>
          <p className="TeamNode-Name" >
            {name}
          </p>
        </div>
        <div className="TeamNode-Description" id="CenterNodeDescription">
          <p>
            {desc}
          </p>
        </div>
      </div>
    ): this.props.children;
  }

}

export default TeamNode;
