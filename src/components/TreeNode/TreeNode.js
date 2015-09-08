import React, { PropTypes } from 'react';
import styles from './TreeNode.css';
import withViewport from '../../decorators/withViewport';
import withStyles from '../../decorators/withStyles';
import Link from '../../utils/Link';

// Why do I need decorators?
@withViewport
@withStyles(styles)
class TreeNode {

  // What do these do?
  static propTypes = {
    viewport: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }).isRequired
  };

  render() {
    let { width, height } = this.props.viewport;

    return (
      <div className="TreeNode">
        <p className="NodeText">
          Organization
        </p>
      </div>
    );
  }

}

export default TreeNode;
