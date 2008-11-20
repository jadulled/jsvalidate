/**
 * validate.js - version: 1.0
 * Marcos J. Medrano <marcos[at]zauber.com.ar>
 */


// validate namespace
var validate = {};


// private namespace
(function(){


var NULL_VALUE = null;
var UNDEFINED_VALUE = undefined;


// The error that is throwed when validation fails.
var IllegalArgumentError = Error;


/** Generic function that validates an object if equals a value.
 * Throws IllegalArgumentError if the obj equals the value. */
var validate_not_value = function(obj, value, msg){
	if (obj === value)
		throw new IllegalArgumentError(msg);
}

/** Validate object constructor */
var Validate = function(){};

Validate.prototype = {
	/** Validate an argument, throwing IllegalArgumentError if the argument is null.
	 * Optionally it takes a message string argument for the error message. */
	notNull: function(obj, msg){
		validate_not_value(obj, NULL_VALUE, msg || "Expected a not null argument.");
	},

	/** Validate an argument, throwing IllegalArgumentError if the argument is undefined.
	 * Optionally it takes a message string argument for the error message. */
	notUndefined: function(obj, msg){
		validate_not_value(obj, UNDEFINED_VALUE, msg || "Expected a not undefined argument."); 
	},

	/** Validate an argument, throwing IllegalArgumentError if the argument is not defined.
	 * Optionally it takes a message string argument for the error message. */
	isDefined: function(obj, msg){
		validate_not_value(obj, UNDEFINED_VALUE, msg || 'Expected a defined argument.');
		validate_not_value(obj, NULL_VALUE, msg || 'Expected a defined argument.');
	},

	/** Validate an argument, throwing IllegarArgumentError if the argument is not a function.
	 *  Optionally it takes a message string argument for the error message. */
	isFunction: function(func, msg){
		if (typeof(func) != typeof(function (){}))
			throw new IllegalArgumentError(msg || "Expected a function argument.");
	},

	/** Validate an argument, throwing IllegalArgumentError if the object does not have the property prop.
	 *  Optionally it takes a message string argument for the error message. */
	hasProperty: function(obj, prop, msg){
		this.isDefined(obj, msg || 'Expected a defined argument.');
		this.isDefined(obj[prop], msg || 'Expected a defined property.');
	},
	
	/** Validate an array, throwing IllegalArgumentError if the array is empty (null or no elements).
	 *  Optionally it takes a message string argument for the error message. */
	notEmpty: function(arr, msg){
		this.isDefined(arr, msg || 'Expected a defined array.');
		this.hasProperty(arr,'length', msg || 'Expected an array argument.');
		if (arr.length == 0)
			throw new IllegalArgumentError(msg || 'Expected a not empty array.');
	},

	/** Validate an array, throwing IllegalArgumentError if the array contains a null element.
	 * Optionally it takes a message string argument for the error message. */
	definedElements: function(arr, msg){
		this.isDefined(arr); // validate is defined
		for(var i in arr){
			validate_not_value(arr[i], NULL_VALUE, msg || 'Expected an array with no null elements');
		}
	}
}

var Type = function(){};
var Method = function(){};
var Attribute = function(){};

Type.prototype = {};

Method.prototype = {};

Attribute.prototype = {};


// "Export" Validate class
validate.Validate = new Validate();
validate.IllegalArgumentError = IllegalArgumentError;
})();
