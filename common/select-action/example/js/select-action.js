(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.focusComponents||(g.focusComponents = {}));g=(g.common||(g.common = {}));g.selectAction = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var builder = require("focus/component/builder");
var React = window.React;
var Img = require("../img").component;

var selectActionMixin = {

    /**
     * Display name.
     */
    displayName: "select-action",
    /**
     * Default props.
     * @returns {{isExpanded: true if list of action is expanded.,
     *              operationList: list of operations,
     *              style: css class of the selector.}}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            isExpanded: false,
            operationList: [],
            style: "dots-three-vertical"
        };
    },
    /**
     * Define defautl state.
     * @returns {{isExpanded: true if list of action is expanded}}
     */
    getInitialState: function getInitialState() {
        return {
            isExpanded: this.props.isExpanded
        };
    },
    /**
     * Render the component.
     * @returns Htm code.
     */
    render: function renderSelectAcion() {
        var liList = this._getList(this.props.operationList);
        return React.createElement(
            "div",
            { className: "select-action" },
            React.createElement(Img, { onClick: this.expandHandler, src: this.props.style }),
            React.createElement("br", null),
            React.createElement(
                "ul",
                null,
                liList
            )
        );
    },

    _getList: function _getList(operationList) {
        var liList = [];
        if (this.state.isExpanded) {
            for (var key in operationList) {
                var operation = operationList[key];
                liList.push(React.createElement(
                    "li",
                    { onClick: operation.action, className: operation.style },
                    operation.label
                ));
                if (operation.childOperationList) {
                    liList.push(React.createElement(
                        "li",
                        null,
                        React.createElement(
                            "ul",
                            null,
                            this._getList(operation.childOperationList)
                        )
                    ));
                }
            }
        }
        return liList;
    },

    /**
     * Action on the root click.
     */
    expandHandler: function expandHandler() {
        this.setState({ isExpanded: !this.state.isExpanded });
    }
};

module.exports = builder(selectActionMixin);

},{"../img":2,"focus/component/builder":3}],2:[function(require,module,exports){
"use strict";

var builder = require("focus/component/builder");
var React = window.React;

var imgMixin = {
    /**
     * Display name.
     */
    displayName: "img",
    /**
     * Default props.
     * @returns {{src: name of the picture, onClick: action handler on click.}}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            src: undefined,
            onClick: undefined
        };
    },
    /**
     * Render the img.
     * @returns Html code.
     */
    render: function renderImg() {
        var className = "icon " + this.props.src;
        return React.createElement(
            "span",
            { className: className, onClick: this.props.onClick },
            " "
        );
    }
};

module.exports = builder(imgMixin);

},{"focus/component/builder":3}],3:[function(require,module,exports){
"use strict";

var React = window.React;
var assign = require("object-assign");
//var isObject = require('lodash/lang/isObject');
//var isFunction = require('lodash/lang/isFunction');

/**
 * Create a component with a mixin except id the component is mixin only.
 * @param {object}  mixin - The component mixin.
 * @param {Boolean} isMixinOnly - define if the component is a mixin only.
 * @return {object} - {component} the built react component.
 */
function createComponent(mixin, isMixinOnly) {
  if (isMixinOnly) {
    return undefined; //Error('Your class publish a mixin only...');
  }
  return { component: React.createClass(mixin) };
}

/**
 * Build a module with a mixin and a React component.
 * @param  {object} componentMixin - Mixin of the component.
 * @param {boolean} isMixinOnly - Bolean to set .
 * @return {object} {mixin: 'the component mixin', component: 'the react instanciated component'}
 */
module.exports = function (componentMixin, isMixinOnly) {

  return assign({
    mixin: componentMixin
    /*extend: function extendMixin(properties){
      if(isFunction(componentMixin)){
        throw new Error('You cannot extend a mixin function');
      }
      if(!isObject(properties)){
        throw new Error('properties should be an object');
      }
      return assign({}, componentMixin, properties);
    },*/
  }, createComponent(componentMixin, isMixinOnly));
};
},{"object-assign":4}],4:[function(require,module,exports){
'use strict';

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

module.exports = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = Object.keys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};

},{}]},{},[1])(1)
});