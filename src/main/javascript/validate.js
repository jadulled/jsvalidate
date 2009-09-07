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
var Validate = function(){};

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
     * Validate an argument, throwing IllegarArgumentError if the argument is not a number.
     * Optionally it takes a message string argument for the error message. 
     *
     * @name validate.Validate#isNumber
     * @methodOf validate.Validate
     * @throws {IllegalArgumentError} If argument is not a number. 
     * @param {Number} number a number object to validate.
     * @param {String} [msg="Expected a number argument."] message to show if a validation error.
     */
    isNumber: function(number, msg){
	    this.isType(string, 'number', msg || 'Expected number argument');
    },

    /** 
     * Validate an argument, throwing IllegarArgumentError if the argument is not a string.
     * Optionally it takes a message string argument for the error message. 
     *
     * @name validate.Validate#isString
     * @methodOf validate.Validate
     * @throws {IllegalArgumentError} If argument is not a string. 
     * @param {String} string a string object to validate.
     * @param {String} [msg="Expected a string argument."] message to show if a validation error.
     */
    isString: function(string, msg){
        this.isType(string, 'string', msg || 'Expected string argument');
    },
    
    /** 
     * Validate an argument, throwing IllegarArgumentError if the string is empty.
     * Optionally it takes a message string argument for the error message. 
     *
     * @name validate.Validate#isString
     * @methodOf validate.Validate
     * @throws {IllegalArgumentError} If string is empty. 
     * @param {String} string a string object to validate.
     * @param {String} [msg="Expected a string argument."] message to show if a validation error.
     */
    isNonEmptyString: function(string, msg){
        this.isString(string);
        if (!(string.length > 0))
            this.throwError(msg || "Expected a non empty string argument.");
    },
    
    /** 
     * Validate an argument, throwing IllegarArgumentError if the string is blank.
     * Optionally it takes a message string argument for the error message. 
     *
     * @name validate.Validate#isString
     * @methodOf validate.Validate
     * @throws {IllegalArgumentError} If string is blank. 
     * @param {String} string a string object to validate.
     * @param {String} [msg="Expected a string argument."] message to show if a validation error.
     */
    isNotBlankString: function(string, msg){
        this.isString(string);
        if (!(string.length > 0) && (string.replace(/^\s+|\s+$/g,"").length == 0))
            this.throwError(msg || "Expected a non blank string argument.");
    },
    
    /** 
     * Validate an argument, throwing IllegarArgumentError if the expression is false
     * Optionally it takes a message string argument for the error message. 
     *
     * @name validate.Validate#isString
     * @methodOf validate.Validate
     * @throws {IllegalArgumentError} If expression is false
     * @param {String} [msg="Expected a string argument."] message to show if a validation error.
     */
    isTrue: function(expression, msg) {
        this.isDefined(expression, msg);
        this.isType(expression, 'boolean', msg);
        if(!expression)
            this.throwError(msg || "Expected a true expression.");
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
			this.throwError(msg || "Expected a defined property: " + prop + ".\n Got(" + obj[prop] + ")")
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
		
	},
	
	 /** 
     * Validate an argument, throwing IllegalArgumentException if the argument 
     * collection is null or has elements that are not of type clazz. 
     * Optionally it takes a message string argument for the error message. 
     *
     * @name validate.Validate#allElementsOfType
     * @methodOf validate.Validate
     * @throws {IllegalArgumentError} If array argument has one or more elements not of type clazz.
     * @param {Array} arr an array to validate.
     * @param {Clazz} clazz is the type to validate.
     * @param {String} [msg="Expected an array with all the elements defined."] message to show if a validation error.
     */
    allElementsOfType: function(arr, clazz, msg){
        try{
            this.definedElements(arr);            
        }catch(e){
            this.throwError(msg || "Expected an array argument with no null Elements.");
        }
        for(var i in arr)
            this.isType(arr[i], clazz, msg || 'Expected an array with all the elements of type clazz');
    },
    
    /** 
     * Validate an argument, throwing IllegarArgumentError if the argument is not of type clazz.
     * Optionally it takes a message string argument for the error message. 
     *
     * @name validate.Validate#isNumber
     * @methodOf validate.Validate
     * @throws {IllegalArgumentError} If argument is not of type clazz. 
     * @param {Object} object to validate.
     * @param {Clazz} clazz is the type to validate.
     * @param {String} [msg="Expected a number argument."] message to show if a validation error.
     */
    isType: function(object, clazz, msg){
        this.isDefined(object, msg);
        if (typeof(object) != clazz)
            this.throwError(msg || "Expected an argument of type ");
    },    
	
	throwError: function(errorMessage){
        throw new validate.IllegalArgumentError(errorMessage);
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

