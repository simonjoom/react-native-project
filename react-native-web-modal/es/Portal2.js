function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import ReactDOM from 'react-dom';
import { Component } from "react";
//import { unstable_renderSubtreeIntoContainer, unmountComponentAtNode } from "react-dom";

var canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);
var Portal = function (_Component) {
  _inherits(Portal, _Component);

  function Portal() {
    _classCallCheck(this, Portal);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

 /* Portal.prototype.componentDidMount = function componentDidMount() {
    this.renderPortal(this.props.children);
  };

  Portal.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref) {
    var children = _ref.children;

    this.renderPortal(children);
  };*/

  Portal.prototype.componentWillUnmount = function componentWillUnmount() {
  
    if (this.defaultNode) {
      document.body.removeChild(this.defaultNode);
    }
    this.defaultNode = null;
    /*
    if (!this.node) return;

    unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);

    this.portal = null;
    this.node = null;*/
  };

  Portal.prototype.render = function render() {
  
    if (!canUseDOM) {
      return null;
    }
    if (!this.props.node && !this.defaultNode) {
      this.defaultNode = document.createElement('div');
      document.body.appendChild(this.defaultNode);
    }
    return ReactDOM.createPortal(
      this.props.children,
      this.props.node || this.defaultNode
    );
  }
  
  //  return null;
  //};
/*
  Portal.prototype.renderPortal = function renderPortal(children) {
    if (!this.node) {
      this.node = document.createElement("div");
      document.body.appendChild(this.node);
    }

    this.portal = unstable_renderSubtreeIntoContainer(this, children, this.node);
  };*/

  return Portal;
}(Component);

Portal.displayName = "Portal";
export default Portal;