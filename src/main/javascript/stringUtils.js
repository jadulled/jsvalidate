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
         * Empty: empty, null, type not string
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
         * Blank: empty, spaces, null, type not string
         *
         * @name stringUtils.StringUtils#isNotBlank
         * @methodOf stringUtils.StringUtils
         * @throws {IllegalArgumentError} If string is blank. 
         * @param {String} string a string object to validate.
         * @param {String} [msg="Expected a string argument."] message to show if a validation error.
         */
        isNotBlank: function(string, msg){
            if ((string === NULL_VALUE) || typeof(string) != 'string' || (!(string.length > 0) && (this.strip(string).length == 0)))
                this.throwError(msg || "Expected a non blank string argument.");
        },
        
        
        /** 
         * Removes spaces from both ends of this String,
         * handling null by returning null.
         * If the string is empty return empty string.
         * If there are spaces in the middle of the string between 2 characters, they are not removed.
         * If the string is all whitespaces returns an empty string.
         *
         * @name stringUtils.StringUtils#strip
         * @methodOf stringUtils.StringUtils
         * @param {String} string a string object to validate.
         * @param {String} [msg="Expected a string argument."] message to show if a validation error.
         */
        strip: function(string){
            if(string != NULL_VALUE) {
                if(string.length > 0) {
                    var stringO = string;
                    var stringNew = "";
                    
                    var foundLast = false;
                    var index = 0;
                    for(var i = stringO.length - 1; i >= 0 && !foundLast; i--) {
                        if(stringO[i] != ' ' || (stringO[i] == ' ' && foundLast)) {
                            index = i;
                            foundLast = true;
                        }
                    }                    
                    var foundFirst = false;
                    for(var i = 0; i < stringO.length; i++) {
                      if(stringO[i] != ' ' || (stringO[i] == ' ' && foundFirst && i < index)) {
                          stringNew = stringNew + stringO[i];
                          foundFirst = true;
                      }
                    }                    
                    return stringNew;
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
         * Returns null if the array is null.
         * Returns empty string if the array is empty.
         * Returns empty string if the array has 1 null element.
         * Returns the string without separators if the separator is null or empty
         *
         * @name stringUtils.StringUtils#join
         * @methodOf stringUtils.StringUtils 
         * @param {Array} array an array object to validate.
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
        
        /** 
         * Splits the provided text into an array, separator specified. 
         * This is an alternative to using StringTokenizer.
         * The separator is not included in the returned String array. 
         * Adjacent separators are treated as one separator. 
         * 
         * Returns null array if the string is null
         * Returns empty array if the string is empty
         * If the separator is null, it uses whitespace by default
         * If the separator is empty, it uses no separator by default (all string in the first position of the array).
         * Separators at the begining and end of the string are not considered
         *  
         * @name stringUtils.StringUtils#split
         * @methodOf stringUtils.StringUtils 
         * @param {String} string a string object to validate.
         * @param {String} [msg="Expected a string argument."] message to show if a validation error.
         */
        split: function(string, separator) {
            
            var separatorUsed = separator;
            if(separator === NULL_VALUE) {
                separatorUsed = ' ';
            }
            
            if(string != NULL_VALUE) {
                var array = new Array();
                var j = 0;
                for(var i = 0; i < string.length; i++) {
                        if(string[i] != separatorUsed) {
                            if(array[j] != NULL_VALUE) {
                                array[j] = array[j] + string[i];
                            } else {
                                array[j] = string[i];
                            }
                            if( i < string.length - 1 && string[i+1] == separatorUsed) 
                                j++;
                        }
                }
                return array;
          } else {
              return NULL_VALUE;
          }  
        },
        
        /** 
         * Converts a String to upper case as per String.toUpperCase().
         * A null input String returns null.
         * An empty input returns empty.
         * 
         * By now, it uses String.toUpperCase() from Javascript.
         * 
         * @name stringUtils.StringUtils#upperCase
         * @methodOf stringUtils.StringUtils 
         * @param {String} string a string object to validate.
         * @param {String} [msg="Expected a string argument."] message to show if a validation error.
         */
        upperCase: function(string) {
            if(string != NULL_VALUE) {
                return string.toUpperCase();
            } else {
                return NULL_VALUE;
            }
        },
        
        /** 
         * Converts a String to upper case as per String.toLowerCase().
         * A null input String returns null.
         * An empty input returns empty.
         * 
         * By now, it uses String.toLowerCase() from Javascript.
         * 
         * @name stringUtils.StringUtils#lowerCase
         * @methodOf stringUtils.StringUtils 
         * @param {String} string a string object to validate.
         * @param {String} [msg="Expected a string argument."] message to show if a validation error.
         */
        lowerCase: function(string) {
            if(string != NULL_VALUE) {
                return string.toLowerCase();
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