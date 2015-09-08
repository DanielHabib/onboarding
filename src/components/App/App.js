
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
// import xmlhttp from 'xmlhttp';
@withContext
@withStyles(styles)
class App extends React.Component{

  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object
  };

    constructor() {
        super();
        this.state = {
            result: 0
        };
    };
  componentDidMount() {
    // var access_token = "ya29.6AFN4RML0WD9MnJsLh55pYTWzBd4pqbZwRmTnfLoZWCEwWONvmbrwNndX6wCKL6US8FF";
    // var url = "https://spreadsheets.google.com/feeds/list/1xIwPItf_qYQDzcfwAHx9-a2LNLQpj_pdfq-cO4nAeyM/od6/private/full";
    // url = url.concat("?access_token=".concat(access_token));
    var url = "http://45.55.167.3:5000/"
    var xmlhttp = new XMLHttpRequest();
    console.log(xmlhttp);
    xmlhttp.open("GET",url, false);

    xmlhttp.send();
    var rezz = xmlhttp.responseText
    this.setState({
      result: rezz
     });
  }
  render() {
    return !this.props.error ? (
      <div id="FullScreen">
        <TreeNode />
        <div className="TeamDiv">
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
        </div>
        <p>{this.state.result}</p>
      </div>
    ) : this.props.children;
  }

}

export default App;
