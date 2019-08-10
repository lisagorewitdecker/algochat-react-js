import React, { Component } from "react";
// import CCUserList from './CCUserList';
// import CCGroupList from './CCGroupList';
// import CCBlockedUserList from './CCBlockedUserList';
import * as utils from "./../../lib/uiComponentLib";

import * as actionCreator from './../../store/actions/cc_action';
// import translate from './../../lib/localization/translate';

// import SVGInline from "react-svg-inline";
// import tab_icon_chats from './../../../public/img/icon_tab_chat.svg';
// import tab_icon_contact from './../../../public/img/icon_tab_contact.svg';
// import tab_icon_group from './../../../public/img/icon_tab_group.svg';

import { Controlled as CodeMirror } from "react-codemirror2";
import Pusher from "pusher-js";
import pushid from "pushid";
import axios from "axios";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";

// var heightCCUserList = utils.calculateAvailableHeight(74, 63, "CCAlgoChat");

// var cclisttabStyle = {
//     "width": "50% !important",
//     "text-align": "center !important",
// }
// var ccUserStyle = {
//     height: heightCCUserList,
//     overflow: "auto",
//     margin: "0 20px 0 20px",

// };
class CCAlgoChat extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      html: "",
      css: "",
      js: ""
    };
    this.pusher = new Pusher("4465540f005d4a2f0627", {
      cluster: "us3",
      forceTLS: true
    });

    this.channel = this.pusher.subscribe("editor");
  }

  componentDidUpdate() {
    this.runCode();
  }

  componentDidMount() {
    this.setState({
      id: pushid()
    });

    this.channel.bind("code-update", data => {
      const { id } = this.state;
      if (data.id === id) return;

      this.setState({
        html: data.html,
        css: data.css,
        js: data.js
      });
    });
  }

  syncUpdates = () => {
    const data = { ...this.state };

    axios
      .post("/update-editor", data)
      .catch(console.error);
  };

  runCode = () => {
    const { html, css, js } = this.state;
    const iframe = this.refs.iframe;
    const document = iframe.contentDocument;
    const documentContents = `
        
          <style>
            ${css}
          </style>
        </head>
        <body>
          ${html}

          <script type="text/javascript">
            ${js}
          </script>
       `;

    document.open();
    document.write(documentContents);
    document.close();
  };

  render() {
    const { html, js, css } = this.state;
    const codeMirrorOptions = {
      theme: "material",
      lineNumbers: true,
      scrollbarStyle: null,
      lineWrapping: true
    };
    return (
      <div className="App">
        <section className="playground">
          <div className="code-editor html-code">
            <div className="editor-header">HTML</div>
            <CodeMirror
              value={html}
              options={{
                mode: "htmlmixed",
                ...codeMirrorOptions
              }}
              onBeforeChange={(editor, data, html) => {
                this.setState({ html }, () => this.syncUpdates()); // update this line
              }}
            />
          </div>
          <div className="code-editor css-code">
            <div className="editor-header">CSS</div>
            <CodeMirror
              value={css}
              options={{
                mode: "css",
                ...codeMirrorOptions
              }}
              onBeforeChange={(editor, data, css) => {
                this.setState({ css }, () => this.syncUpdates()); // update this line
              }}
            />
          </div>
          <div className="code-editor js-code">
            <div className="editor-header">JavaScript</div>
            <CodeMirror
              value={js}
              options={{
                mode: "javascript",
                ...codeMirrorOptions
              }}
              onBeforeChange={(editor, data, js) => {
                this.setState({ js }, () => this.syncUpdates()); // update this line
              }}
            />
          </div>
        </section>
        <section className="result">
          <iframe title="result" className="iframe" ref="iframe" />
        </section>
      </div>
      
    );
  }
}
export default CCAlgoChat;
