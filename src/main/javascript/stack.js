/*
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
 * DefensiveJS
 * @file stack.js
 * @version 0.0-SNAPSHOT
 *
 * @fileOverview This file uses Mozilla Stack Component and Mozilla Error object to improve error messages.
 *
 * @author Marcos J. Medrano <marcos [at] zauber [dot] com [dot] ar>
 * @see <a href="https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Error">Mozilla Error Object</a>.
 * @see <a href="https://developer.mozilla.org/en/Components.stack">Mozilla Components.stack</a>
 */
 
// "import" validate class
var Validate = validate.Validate;

// anonymous function to provide a 'private' namespace
(function(){

// checks that validate.js was included
if (!Validate) throw new Error("validate.Validate object is not defined.");
// checks taht Components and Components.stack exsits
if (!existsComponentsStack()) throw new Error("Components.stack not defined.");
// checks that the Error objects has the required properties
if (!existsErrorProperties()) throw new Error("Error object must implement required properties.")

// redefine showErrorMessage to show stack information.
validate.IllegalArgumentError = function(errorMessage){
    // get the caller that called the validate function.
	var caller = Components.stack.caller.caller;
	if (caller.name == "dispatch")
		caller = caller.caller;
		
	// create a new error
	var error = new Error(errorMessage);
	
	// modify error properties
	error.name = "IllegalArgumentError";
	error.fileName = caller.filename;
	error.lineNumber = caller.lineNumber;
	
	// throw IllegalArgumentError
	return error;
}

/** checks that Components.stack exists */
function existsComponentsStack(){
	if (Components && Components.stack)
		return true;
	else 
		return false;
}

/** checks that Error object has required properties */
function existsErrorProperties(){
	var error = new Error();
	if (error.fileName && error.lineNumber)
		return true;
	else
		return false;
}

})();
