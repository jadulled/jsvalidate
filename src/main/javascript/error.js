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
 * error.js
 * @fileOverview Javascript error library to perform common error throwing.
 * 
 * More info:
 * <a href="http://commons.apache.org/lang/api-release/index.html">org.apache.commons.lang</a>
 *  
 * 
 * @author cecilia
 */


/**
 * Define the 'error' namespace 
 * @name error
 * @namespace Holds all error classes. 
 */
var error = {};

// anonymous function to provide a 'private' namespace
(function(){

/** 
 * ErrorValidate object constructor 
 * @name error.ErrorVlidate
 * @class Holds error manage static methods.
 * @memberOf error 
 */
var ErrorValidate = function(){};

ErrorValidate.prototype = {
   
        /** 
         * IllegalArgumentError object constructor 
         * @name error.IllegalArgumentError
         * @memberOf error 
         * @param {String} errorMessage the error message to show.
         */
        IllegalArgumentError: function(errorMessage){
            return new error.CommonError(errorMessage, "IllegalArgumentError");     
        },
        
        /** 
         * NotImplementedError object constructor 
         * @name error.NotImplementedError
         * @memberOf error 
         * @param {String} errorMessage the error message to show.
         */
        NotImplementedError: function(errorMessage){
            return new error.CommonError(errorMessage, "NotImplementedError");              
        },
        
        /** 
         * NullArgumentError object constructor 
         * @name error.NullArgumentError
         * @memberOf error 
         * @param {String} errorMessage the error message to show.
         */
        NullArgumentError: function(errorMessage){
            return new error.CommonError(errorMessage, "NullArgumentError");              
        },
       
        /** 
         * UnhandledError object constructor 
         * @name error.UnhandledError
         * @memberOf error 
         * @param {String} errorMessage the error message to show.
         */
        UnhandledError: function(errorMessage){
            return new error.CommonError(errorMessage, "UnhandledError");              
        }
};

var CommonError = function(errorMessage, errorName) {
    var error = new Error(errorMessage);
    error.name = errorName;
    return error;
};

// "Export" Error class
error.ErrorValidate = new ErrorValidate();
error.CommonError = CommonError;

})();
