import React, {
    PropTypes
}
from 'react';

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
import { render } from 'react-dom';
// import xmlhttp from 'xmlhttp';
@withContext
@withStyles(styles)
class App extends React.Component {

    static propTypes = {
        children: PropTypes.element.isRequired,
        error: PropTypes.object
    };

    static defaultProps = {
        radius: 100
    }

    calculateAngle() {
        var degreesOfSeparation = 360 / (self.this.childDom.length + 1);
        return degreesOfSeparation;
    }
    calculatePosition(degreesOfSeparation, index) {

        return [];

    }
    constructor() {
        super();
        this.state = {
            result: 0,
            criteria: 'squad/',
            children: [{name:"Loading"}],
            root: "Root",
            currentNode: "node",
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
            treeRoot: json.result,
            children: json.result.children
        });
    }

    onClickChild(node) {
        this.setState({
            root: node,
            children: node.children
        });
    }

    backToTop() {
        this.onClickChild(this.state.treeRoot)
    }
    displayDescription() {

    }

    displayChildren() {
        console.log("display children");
    }
    renderItem(item){
          return (
          <div onClick={() => this.onClickChild(item)}>
            <TeamNode name={item.name} desc={item.desc} />
          </div>
          )
        }
    renderChildren(items, node){
      if (!node.leaf){
        return (
          <ul style={{listStyleType: "none"}}>
              {items.map((item, index) =>
            <li key={item.name}>
            {this.renderItem(item)}
            </li>)}
          </ul>
          )
      }
    }

    render() {
      var items = this.state.children;
      var node = this.state.root;
        return !this.props.error ? (
      <div id = "FullScreen">
        <MemberNode onClick = {this.backToTop.bind(this)}/>
        <TeamNode name={this.state.root.name} desc={this.state.root.desc}/>
        {this.renderChildren(items, node)}
      </div >
        ) : this.props.children;
    }
}
//         <pre fontSize='5px'> {JSON.stringify(this.state.children, null, 2)} </pre>

export default App;
