import React, { PropTypes } from 'react';
import styles from './TeamNode.css';
import withViewport from '../../decorators/withViewport';
import withStyles from '../../decorators/withStyles';
import Link from '../../utils/Link';

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
            desc: "This is a Description"
        };
    };
  display() {
    console.log("Test");
  }
  render() {
    let { width, height } = this.props.viewport;
    var name = this.state.name;
    var desc = this.state.desc;
    return (
      <div className="TeamNode-Buffer">
        <div className="TeamNode" onClick={this.display.bind(this)}>
          <p className="TeamNode-Name">
            {name}
          </p>
        </div>
        <div className="TeamNode-Description">
          <p>
            {desc}
          </p>
        </div>
      </div>
    );
  }

}

export default TeamNode;
