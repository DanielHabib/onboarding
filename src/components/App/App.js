
import React, { PropTypes } from 'react';
import styles from './App.css';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';
import TreeNode from '../TreeNode';
import TeamNode from '../TeamNode';
import MemberNode from '../MemberNode';

@withContext
@withStyles(styles)
class App {

  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object
  };

  render() {
    return !this.props.error ? (
      <div id="FullScreen">
        <TreeNode />
        <div className="TeamDiv">
          <TeamNode />
          <TeamNode />
          <TeamNode />
          <TeamNode />
        </div>
        <div className="MemberDiv">
          <MemberNode />
          <MemberNode />
          <MemberNode />
          <MemberNode />
          <MemberNode />
          <MemberNode />
          <MemberNode />
          <MemberNode />
        </div>
      </div>
    ) : this.props.children;
  }

}

export default App;
