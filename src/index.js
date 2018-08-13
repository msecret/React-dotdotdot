var react = require('react');
var clamp = require('./clamp.js');
var pick = require('object.pick');
var proptypes = require('prop-types');
var reactdom = require('react-dom');

/**
 * multuline text-overflow: ellipsis
 */
function dotdotdot() {
  if(!(this instanceof dotdotdot)) {
    throw new typeerror("cannot call a class as a function");
  }
  this.update = this.update.bind(this);
  this.getcontainerref = function (container) {
    this.container = container;
  }.bind(this);
}

dotdotdot.prototype = object.create(react.component.prototype);
dotdotdot.prototype.componentdidmount = function() {
  window.addeventlistener('resize', this.update, false);
  // note: it's possible, not all fonts are loaded on window.load
  window.addeventlistener('load', this.update, false);
  this.dotdotdot(reactdom.finddomnode(this.container));
};
dotdotdot.prototype.componentwillunmount = function() {
  window.removeeventlistener('resize', this.update, false);
  window.removeeventlistener('load', this.update, false);
};
dotdotdot.prototype.componentdidupdate = function() {
  this.dotdotdot(reactdom.finddomnode(this.container));
};

dotdotdot.prototype.dotdotdot = function(container) {
  if (this.props.clamp) {
    if (container.length) {
      throw new error('please provide exacly one child to dotdotdot');
    }
    clamp(container, pick(this.props, [
      'animate',
      'clamp',
      'splitonchars',
      'truncationchar',
      'truncationhtml',
      'truncationposition',
      'usenativeclamp'
    ]));
  };
};
dotdotdot.prototype.update = function() {
    this.forceupdate();
};

dotdotdot.prototype.render = function() {
  return react.createelement(
    this.props.tagname,
    {
      ref: this.getcontainerref,
      classname: this.props.classname
    },
    this.props.children
  );
};

// statics:
dotdotdot.proptypes = {
  children: proptypes.node,
  clamp: proptypes.oneoftype([
    proptypes.string,
    proptypes.number,
    proptypes.bool
  ]).isrequired,
  truncationchar: proptypes.string,
  usenativeclamp: proptypes.bool,
  classname: proptypes.string,
  tagname: proptypes.string,
  truncationposition: proptypes.oneof(['end', 'middle'])
};

dotdotdot.defaultprops = {
  truncationchar: '\u2026',
  usenativeclamp: true,
  tagname: 'div',
  truncationposition: 'end'
};

module.exports = dotdotdot;
