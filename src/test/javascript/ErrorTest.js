/**
 * Error - Unit Tests
 * 
 * @fileOverview This file has unit tests for Error library.
 * @author Cecilia Hagge
 * @see The <a href="http://commons.apache.org/lang/api-release/index.html">org.apache.commons.lang</a>.
 */
 

/** Test error.js */
function ErrorTest(name)
{
    TestCase.call( this, name );
}

ErrorTest.prototype = new TestCase();

//"import" error class
ErrorValidate = error.ErrorValidate;


/** 
 * this function tests error.IllegalArgumentError 
 */
ErrorTest.prototype.testIllegalArgumentError = function(){
    var string = "";
    try{
        if(string == "") {
            throw ErrorValidate.IllegalArgumentError("String is empty");
        }
    } catch (e if e == "IllegalArgumentError: String is empty") {
    } catch (e) {
        throw new Error("IllegalArgumentError is not valid");
    }
}

/** 
 * this function tests error.NotImplementedError
 */
ErrorTest.prototype.testNotImplementedError = function(){
    try{
        throw ErrorValidate.NotImplementedError("No hay aun implementacion");
    } catch (e if e == "NotImplementedError: No hay aun implementacion") {
    } catch (e) {
        throw new Error("NotImplementedError is not valid");
    }
}

/** 
 * this function tests error.NullArgumentError
 */
ErrorTest.prototype.testNullArgumentError = function(){
    var string = null;
    try{
        if(string == null) {
            throw ErrorValidate.NullArgumentError("String is null");
        }
    } catch (e if e == "NullArgumentError: String is null") {
    } catch (e) {
        throw new Error("NullArgumentError is not valid");
    }
}


/** 
 * this function tests error.UnhandledError
 */
ErrorTest.prototype.testUnhandledError = function(){
    
    try{
       throw ErrorValidate.UnhandledError("Don't know what to do");
    } catch (e if e == "UnhandledError: Don't know what to do") {
    } catch (e) {
        throw new Error("UnhandledError is not valid");
    }
}