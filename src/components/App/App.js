
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
import $ from 'jquery';
import PubSub from 'pubsub-js';
// import xmlhttp from 'xmlhttp';
@withContext
@withStyles(styles)
class App extends React.Component{

  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object
  };
  static defaultProps = {
  }
  constructor() {
    super();
      this.state = {
        result: 0,
        criteria: 'squad/',
        children:[],
        root: "Root",
        currentNode:"node",
        childDom: [],
        treeRoot: "None"
      };
    };

    componentDidMount() {
        var puhsuh = function(string) {
            this.backToTop();
        }.bind(this);
        PubSub.subscribe('text_pushed', puhsuh);

    var url = "http://45.55.167.3:5000/".concat(this.state.criteria)

    $.ajax({
       type: 'GET',
        url: url,
        async: true,
        dataType: 'json',
        success: function(json) {
           console.log("sucess");
           this.onSuccess(json)

        }.bind(this),
        error: function(e) {
          console.log("fail");
          console.log(e.message);
        }
    });
  }


  onSuccess(json) {
    this.setState({
      root: json.result,
      treeRoot: json.result
    });
    this.buildChildren();
  }

  buildChildren() {

    for (var index in this.state.childDom) {
      var el = this.state.childDom[index];
      el.remove();
    }
    var element = document.getElementById("CenterNode");
      this.setState({
        children: this.state.root.children
    });
    for (var index in this.state.children) {
      var node = this.state.root.children[index];
      this.state.currentNode = node;
      var val = node.name;
      var desc = node.desc;
      var child = document.createElement("p");
      var text = document.createTextNode(val);
      child.id = index;

      child.onclick = function(node) {
        this.onClickChild(node)

      }.bind(this, node);

      child.className='ChildNode';
      child.appendChild(text);
      element.appendChild(child);
      this.state.childDom.push(child);
    }
  }

  onClickChild (node){
    console.log("Child Clicked");
    this.setState({
      root: node
          });
    console.log(node);
    this.buildChildren();
  }

  backToTop() {
    console.log("back to top");
    this.setState({
      root: this.state.treeRoot,
          });
    this.buildChildren();
  }
  displayDescription() {

  }

  displayChildren() {
    console.log("display children");
  }

  render() {
    return !this.props.error ? (
      <div id="FullScreen" onClick={this.displayChildren.bind(this)}>
        <MemberNode onClick={this.backToTop.bind(this)} />
        <TeamNode name={this.state.root.name} desc={this.state.root.desc} />
        <p>{this.state.result}</p>
      </div>
    ) : this.props.children;
  }
}

export default App;
