/**
 * error.js
 * @fileOverview Javascript error library to perform common error throwing.
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
        },
}

var CommonError = function(errorMessage, errorName) {
    var error = new Error(errorMessage);
    error.name = errorName;
    return error;
};

// "Export" Error class
error.ErrorValidate = new ErrorValidate();
error.CommonError = CommonError;

})();