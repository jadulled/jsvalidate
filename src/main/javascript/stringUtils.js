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
 * stringUtils.js
 * @fileOverview Javascript error library to perform common error throwing.
 * 
 * More info:
 * <a href="http://commons.apache.org/lang/api-release/index.html">org.apache.commons.lang</a>
 *  
 * 
 * @author cecilia
 */


/**
 * Define the 'stringUtils' namespace 
 * @name stringUtils
 * @namespace Holds all error classes. 
 */
var stringUtils = {};

// anonymous function to provide a 'private' namespace
(function(){

var NULL_VALUE = null;


//"import" error class
ErrorValidate= error.ErrorValidate;

/** 
 * StringUtils object constructor 
 * @name stringUtils.StringUtils
 * @class Holds validation static methods.
 * @memberOf stringUtils 
 */
var StringUtils = function(){};

StringUtils.prototype = {
        
        /** 
         * Validate an argument, throwing IllegarArgumentError if the string is empty.
         * Optionally it takes a message string argument for the error message. 
         *
         * @name stringUtils.StringUtils#isNonEmpty
         * @methodOf stringUtils.StringUtils
         * @throws {IllegalArgumentError} If string is empty. 
         * @param {String} string a string object to validate.
         * @param {String} [msg="Expected a string argument."] message to show if a validation error.
         */
        isNonEmpty: function(string, msg){
            if ((string === NULL_VALUE) || typeof(string) != 'string' || !(string.length > 0))
                this.throwError(msg || "Expected a non empty string argument.");
        },
        
        /** 
         * Validate an argument, throwing IllegarArgumentError if the string is blank.
         * Optionally it takes a message string argument for the error message. 
         *
         * @name stringUtils.StringUtils#isNotBlank
         * @methodOf stringUtils.StringUtils
         * @throws {IllegalArgumentError} If string is blank. 
         * @param {String} string a string object to validate.
         * @param {String} [msg="Expected a string argument."] message to show if a validation error.
         */
        isNotBlank: function(string, msg){
            var stringO = string;
            if ((string === NULL_VALUE) || typeof(string) != 'string' || (!(string.length > 0) && (stringO.replace(/^\s+$/g,"").length == 0)))
                this.throwError(msg || "Expected a non blank string argument.");
        },
        
        /** 
         * Removes control characters (char <= 32) from both ends of this String,
         * handling null by returning null.
         *
         * @name stringUtils.StringUtils#trim
         * @methodOf stringUtils.StringUtils
         * @param {String} string a string object to validate.
         * @param {String} [msg="Expected a string argument."] message to show if a validation error.
         */
        trim: function(string){
            if(string != NULL_VALUE) {
                if(string.length > 0) {
                    var stringO = string;
                    return stringO.replace(/^\s*|\s*$/g,"");
                } else {
                    return "";
                }
            } else {
                return NULL_VALUE;
            }
        },
        
        /** 
         * Joins the elements of the provided array into a single String
         * containing the provided list of elements.
         *
         * @name stringUtils.StringUtils#join
         * @methodOf stringUtils.StringUtils 
         * @param {String} string a string object to validate.
         * @param {String} [msg="Expected a string argument."] message to show if a validation error.
         */
        join: function(array, separator){
            if(array != NULL_VALUE) {
                  var string = "";
                  for(var i = 0; i < array.length; i++) {
                          if(array[i] != NULL_VALUE) {
                              string = string + array[i];
                          }
                          if(i != array.length - 1 && separator != NULL_VALUE) {
                                  string = string + separator;
                          }
                  }
                  return string;
            } else {
                return NULL_VALUE;
            }
        },

        throwError: function(errorMessage){
            throw ErrorValidate.IllegalArgumentError(errorMessage);
        }
        
}


//"Export" Validate class
stringUtils.StringUtils = new StringUtils();

})();