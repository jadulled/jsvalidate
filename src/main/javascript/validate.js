/*
 * Copyright (c) 2005-2008 Zauber S.A. <http://www.zauber.com.ar/>
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.    
 */

/**
 * validate.js
 * @fileOverview Javascript validation library to perform common validations and type checking.
 * 
 * More info:
 * <a href="http://commons.apache.org/lang/apidocs/org/apache/commons/lang/Validate.html">org.apache.commons.lang.Validate</a>
 *  
 * @author Marcos J. Medrano <marcos [at] zauber [dot] com [dot] ar>
 * @version 0.1
 */


/**
 * Define the 'validate' namespace 
 * @name validate
 * @namespace Holds all validate classes. 
 */
var validate = {};


// anonymous function to provide a 'private' namespace
(function(){


var NULL_VALUE = null;
var UNDEFINED_VALUE = undefined;


/** 
 * Validate object constructor 
 * @name validate.Validate
 * @class Holds validation static methods.
 * @memberOf validate 
 */
var Validate = function(){
	function throwError(errorMessage){
		throw new IllegalArgumentError(errorMessage);
	}
};

Validate.prototype = {
	/** 
	 * Validate an argument, throwing IllegalArgumentError if the argument is null.
	 * Optionally it takes a message string argument for the error message. 
	 *
	 * @name validate.Validate#notNull
	 * @methodOf validate.Validate
	 * @throws {IllegalArgumentError} If argument is null.
	 * @param {Object} obj the object to validate.
	 * @param {String} [msg="Expected a not null argument."] message to show if a validation error.
	 */
	notNull: function(obj, msg){
		if (obj === NULL_VALUE)
			this.throwError(msg || "Expected a not null argument.");
	},

	/** 
	 * Validate an argument, throwing IllegalArgumentError if the argument is undefined.
	 * Optionally it takes a message string argument for the error message. 
	 *
	 * @name validate.Validate#notUndefined
	 * @methodOf validate.Validate
	 * @throws {IllegalArgumentError} If argument is undefined.
	 * @param {Object} obj the object to validate.
	 * @param {String} [msg="Expected a not undefined argument."] message to show if a validation error.
	 */
	notUndefined: function(obj, msg){
		if (obj === UNDEFINED_VALUE)
			this.throwError(msg || "Expected a not undefined argument.");
	},

	/** 
	 * Validate an argument, throwing IllegalArgumentError if the argument is not defined.
	 * Optionally it takes a message string argument for the error message. 
	 *
	 * @name validate.Validate#isDefined
	 * @methodOf validate.Validate
	 * @throws {IllegalArgumentError} If argument is not defined (null or undefined)
	 * @param {Object} obj the object to validate.
	 * @param {String} [msg="Expected a defined argument."] message to show if a validation error.
	 */
	isDefined: function(obj, msg){
		try{
			this.notNull(obj);
			this.notUndefined(obj);
		}catch(e){
			this.throwError(msg || "Expected a defined argument.");
		}
	},

	/** 
	 * Validate an argument, throwing IllegarArgumentError if the argument is not a function.
	 * Optionally it takes a message string argument for the error message. 
	 *
	 * @name validate.Validate#isFunction
	 * @methodOf validate.Validate
	 * @throws {IllegalArgumentError} If argument is not a function. 
	 * @param {Function} func a function object to validate.
	 * @param {String} [msg="Expected a function argument."] message to show if a validation error.
	 */
	isFunction: function(func, msg){
		if (typeof(func) != typeof(function (){}))
			this.throwError(msg || "Expected a function argument.");
	},

	/** 
	 * Validate an argument, throwing IllegalArgumentError if the object does not have the property prop.
	 * Optionally it takes a message string argument for the error message. 
	 *
	 * @name validate.Validate#hasProperty
	 * @methodOf validate.Validate
	 * @throws {IllegalArgumentError} If obj argument does not have a 'prop' property.
	 * @param {Object} obj the object to validate.
	 * @param {String} prop the name of the property to validate.
	 * @param {String} [msg="Expected a defined property."] message to show if a validation error.
	 */
	hasProperty: function(obj, prop, msg){
		try{
			this.isDefined(obj);
			this.isDefined(obj[prop]);
		}catch(e){
			this.throwError(msg || "Expected a defined property.")
		}
	},
	
	/** 
	 * Validate an array, throwing IllegalArgumentError if the array is empty (null or no elements).
	 * Optionally it takes a message string argument for the error message. 
	 *
	 * @name validate.Validate#notEmpty
	 * @methodOf validate.Validate
	 * @throws {IllegalArgumentError} If the array argument is empty (or if not an array argument).
	 * @param {Array} arr an array to validate.
	 * @param {String} [msg="Expected a not empty array."] message to show if a validation error.
	 */
	notEmpty: function(arr, msg){
		try{
			this.isDefined(arr);
			this.hasProperty(arr, "length");
		}catch(e){
			this.throwError(msg || "Expected an array argument.")
		}
		if (arr.length == 0)
			this.throwError(msg || "Expected a not empty array.");
	},

	/** 
	 * Validate an array, throwing IllegalArgumentError if the array contains a null element.
	 * Optionally it takes a message string argument for the error message. 
	 *
	 * @name validate.Validate#definedElements
	 * @methodOf validate.Validate
	 * @throws {IllegalArgumentError} If array argument has one or more not-defined elements (null or undefined).
	 * @param {Array} arr an array to validate.
	 * @param {String} [msg="Expected an array with all the elements defined."] message to show if a validation error.
	 */
	definedElements: function(arr, msg){
		try{
			this.isDefined(arr);
		}catch(e){
			this.throwError(msg || "Expected an array argument.");
		}
		for(var i in arr)
			this.notNull(arr[i],msg || 'Expected an array with all the elements defined');
	}
}

var Type = function(){};
var Method = function(){};
var Attribute = function(){};

Type.prototype = {};

Method.prototype = {};

Attribute.prototype = {};

/** 
 * IllegalArgumentError object constructor 
 * @name validate.IllegalArgumentError
 * @class The error throwed by validation methods.
 * @memberOf validate 
 * @param {String} errorMessage the error message to show.
 */
var IllegalArgumentError = function(errorMessage){
	var error = new Error(errorMessage);
	error.name = "IllegalArgumentError";
	return error;
};


// "Export" Validate class
validate.Validate = new Validate();
validate.IllegalArgumentError = IllegalArgumentError;

})();

