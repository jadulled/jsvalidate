/**
 * Validate - Unit Tests
 * 
 * @fileOverview This file has unit tests for Validate library.
 * @author Marcos J. Medrano <marcos [at] zauber [dot] com [dot] ar>
 * @see The <a href="http://commons.apache.org/lang/apidocs/org/apache/commons/lang/Validate.html">org.apache.commons.lang.Validate</a>.
 */

/** Test validate.js */
function ValidateTest(name)
{
    TestCase.call( this, name );
}

ValidateTest.prototype = new TestCase();

//"import" validate class
Validate = validate.Validate;
//"import" validate class
IllegalArgumentError = validate.IllegalArgumentError;

/** 
 * this function tests Validate.notNull with many valid values and a null value 
 */
ValidateTest.prototype.testNotNull = function(){
   var valids = new Array(0, 1, true, false, 'text', new Object(), 
		   new Array(1,2), function(){});
   var invalid = null;

   for(i in valids){ // tests all valid values
       try{	
           Validate.notNull(valids[i]); // testing a not null value, shoudn't fail.
       }catch(e){
           throw new Error("notNull shouldn't raise an exception with value:" + valids[i] + " (type: " + typeof(valids[i]) + ").");	
       }
   }

   try{
       Validate.notNull(invalid); // testing a null value, should fail.
       throw new Error("notNull should raise an exception with a null value.");
   }catch(e){
       //notNull is working correctly
   }
}

/** 
 * this function tests Validate.notNull with many valid values and a null value 
 */
ValidateTest.prototype.testNotUndefined = function(){
   // test the function with valid values and an invalid value
   var valids = new Array(0, 1, true, false, 'text', new Object(), new Array(), function(){}, null);
   var invalid = undefined;

   for(i in valids){ // tests all valid values
       try{
           Validate.notUndefined(valids[i]); // testing not undefined value, shoudn't fail.
       }catch(e){
           throw new Error("notUndefined shouldn't raise an exception with value:" + valids[i] + " (type: " + typeof(valids[i]) + ").");
       }
   }
   try{
       Validate.notUndefined(invalid); // testing a null value, should fail.
       throw new Error("notUndefined should raise an exception with an undefined value.");
   }catch(e){
       // notUndefined is working correctly
   }
}

/**
* this function tests Validate.isDefined with many defined and not defined values.
*/
ValidateTest.prototype.testIsDefined = function(){
   // define some values to test
   var obj = {};
   obj.a = false; obj.b = 0; obj.c = "text";
   obj.x = {};
   obj.y = function(){};
   obj.z = null;
   var valids = new Array(obj, obj.a, obj.b, obj.c, obj.x, obj.y);

   for(i in valids){ // tests all valid values
       try{
           Validate.isDefined(valids[i]); // testing defined value, shoudn't fail.
       }catch(e){
           throw new Error("isDefined shouldn't raise an exception with value:" + valids[i] + " (type: " + typeof(valids[i]) + ").");	
       }
   }
   try{ 
       Validate.isDefined(obj.z); // testing a null value, should fail.
       throw new Error("isDefined should raise an exception with a null value.");
   }catch(e){
       // isDefined is working correctly with a null value.
   }
   try{ 
       Validate.isDefined(obj.w); // testing an undefined value, should fail.
       throw new Error("isDefined should raise an exception with an undefined value.");
   }catch(e){
       // isDefined is working correctly with an undefined value.
   }
}

/**
* this function tests Validate.isNumber.
*/
ValidateTest.prototype.testIsNumber = function testIsNumber(){
    var n = 1;
    try{
        Validate.isNumber(n);
    }catch(e){
        throw new Error("isNumber shouldn't raise an exception with function arguments.");
    }
    
    var n = null;
    try{
        Validate.isNumber(n);
        throw new Error("isNumber should raise an exception with function arguments.");
    }catch(e){}
    
    var n = 'abs';
    try{
        Validate.isNumber(n);
        throw new Error("isNumber should raise an exception with function arguments.");
    }catch(e){}
}

/**
* this function tests Validate.isString.
*/
ValidateTest.prototype.testIsString = function testIsString(){
    var n = 1;
    try{
        Validate.isString(n);
        throw new Error("isString should raise an exception with function arguments.");
    }catch(e){}
    
    var n = null;
    try{
        Validate.isString(n);
        throw new Error("isString should raise an exception with function arguments.");
    }catch(e){}
    
    var n = 'abs';
    try{
        Validate.isString(n);
        
    }catch(e){
        throw new Error("isString shouldn't raise an exception with function arguments.");       
    }
}

/**
* this function tests Validate.isFunction.
*/
ValidateTest.prototype.testIsFunction = function testIsFunction(){

	var f = function(){};
	var g = new Function();
	function h(){};
	try{
		Validate.isFunction(f);
		Validate.isFunction(g);
		Validate.isFunction(h);
	}catch(e){
		throw new Error("isFunction shouldn't raise an exception with function arguments.");
	}
	
	var o = new h();
	var p = new Object();
	var a = new Array();
	try{
		Validate.isFunction(o); throw new Error("isFunction should raise an exception with a new object argument.");
	}catch(e){}
	try{
		Validate.isFunction(p); throw new Error("isFunction should raise an exception with an object argument. ")
	}catch(e){}
	try{
		Validate.isFunction(a); throw new Error("isFunction should raise an exception with an array argument. ")
	}catch(e){}
}

/**
* this function tests Validate.hasProperty with many defined and not defined properties.
*/
ValidateTest.prototype.testHasProperty = function(){
   // define an object and many properites
   var x = {}
   x.a = 3;
   x.b = 'hola';
   x.c = new Object();
   x.d = function(){};

   // testing defined properties
   try{
       Validate.hasProperty(x,'a');
       Validate.hasProperty(x,'b');
       Validate.hasProperty(x,'c');
       Validate.hasProperty(x,'d');
       Validate.hasProperty(new Array(), 'length');
   }catch (e){
       throw new Error("hasProperty shouldn't raise an exception with defined properties");
   }

   // hasProperty should raise an exception if an invalid object property
   x.z = null;
   try{ 
       Validate.hasProperty(x,'z'); 
       throw new Error("hasProperty should raise an exception with a null value."); 
   }catch(e){
       // hasProperty is working correctly with a null value.	
   }
   try{ 
       Validate.hasProperty(x,'y'); 
       throw new Error("hasProperty should raise an exception with an undefined value."); 
   }catch(e){
       // hasProperty is working correctly with an undefined value.
   }
}

/**
* this function tests Validate.notEmpty with empty and not empty arrays.
*/
ValidateTest.prototype.testNotEmpty = function testNotEmpty(){
   var arr;
   arr = new Array(null, undefined, true, false, 1, "text");
   try{ 
       Validate.notEmpty(arr); 
   }catch(e){ 
       throw new Error("notEmpty shouldn't raise an exception with a non empty array.");
   }

   arr = new Array();
   try{ 
       Validate.notEmpty(arr); 
       throw new Error("notEmpty should raise an exception with an empty array.")
   }catch(e){ 
       // notEmpty is working correctly with an empty array.
   }
}

/**
* this function tests Validate.definedElements with all-defined-elements array and 
* not-all-defined-elements array.
*/
ValidateTest.prototype.testDefinedElements = function (){
   var arr;
   arr = new Array(1, false, 0, "text", new Object(), function(){}, new Array());
   try{ 
       Validate.definedElements(arr); 
   }catch(e){
       throw new Error("definedElements shouldn't raise an exception with an all-defined-elements array.");
   }

   arr = new Array(1, false, 0, null);
   try{ 
       Validate.definedElements(arr); 
       throw new Error("definedElements should raise an exception with a not-all-defined-elements array.");
   }catch(e){ 
       // definedElements working ok with invalid arrays (some null elements).
   }

   arr = new Array(1, undefined, "text");
   try{ 
       Validate.definedElements(arr); 
       throw new Error("definedElements should raise an exception with a not-all-defined-elements array.");
   }catch(e){ 
       // definedElements working ok with invalid arrays (some undefined elements).
   }
}

/**
* this function tests Validate.isType with type specified to compare
*/
ValidateTest.prototype.testIsType = function (){
    
    var bool = true;
    try{ 
        Validate.isType(bool, 'boolean');
    }catch(e){
        throw new Error("isType shouldn't raise an exception with type specified.");
    }
    
    var bool = 1;
    try{ 
        Validate.isType(bool, 'boolean');
        throw new Error("isType should raise an exception with type specified.");
    }catch(e){}
}

/**
* this function tests Validate.allElementsOfType with all-defined-elements and not defined-elements
* array with different types to compare
*/
ValidateTest.prototype.testAllElementsOfType = function (){    
    
    var arr = new Array(false, false, true, true);
    try{ 
        Validate.allElementsOfType(arr, 'boolean'); 
    }catch(e){
        throw new Error("allElementsOfType shouldn't raise an exception with an all-defined-elements array with type specified.");
    }
    
    arr = new Array(new Object(), new Object(), new Object(), new Object());
    try{ 
        Validate.allElementsOfType(arr, 'object'); 
    }catch(e){
        throw new Error("allElementsOfType shouldn't raise an exception with an all-defined-elements array with type specified.");
    }
    
    arr = new Array(null, new Object(), new Object(), new Object());
    try{ 
        Validate.allElementsOfType(arr, 'object');
        throw new Error("allElementsOfType should raise an exception with a not defined element.");
    }catch(e){}
    
    arr = new Array(1, 1, 1, true);
    try{ 
        Validate.allElementsOfType(arr, 'number');
        throw new Error("allElementsOfType should raise an exception with a boolean element instead of a number type.");
    }catch(e){}
}

/**
* this function tests Validate.isTrue with a certain variety of true, false expressions
*/
ValidateTest.prototype.testIsTrue = function (){  

    var expression = 1 == 1;
    try{ 
        Validate.isTrue(expression); 
    }catch(e){
        throw new Error("isTrue shouldn't raise an exception with true expression");
    }
    
    var expression = 1 == 0;
    try{ 
        Validate.isTrue(!expression); 
    }catch(e){
        throw new Error("isTrue shouldn't raise an exception with false expression");
    }
    
    var expression = new Object();
    try{ 
        Validate.isTrue(expression); 
        throw new Error("isTrue should raise an exception with expression not type of boolean");
    }catch(e){}
    
    var expression = null;
    try{ 
        Validate.isTrue(expression); 
        throw new Error("isTrue should raise an exception with null expression ");
    }catch(e){}
    
}

/**
* this function tests Validate.isNotBlankString with a different string arguments (null, empty, valid)
*/
ValidateTest.prototype.testIsNotBlankString = function (){  

    var string = "lalala";   
    try{ 
        Validate.isNotBlankString(string); 
    }catch(e){
        throw new Error("isNotBlankString shouldn't raise an exception with defined not blank string");
    }
    
    string = "";   
    try{ 
        Validate.isNotBlankString(string);
        throw new Error("isNotBlankString should raise an exception with defined empty string");   
    }catch(e){}
    
    string = null;   
    try{ 
        Validate.isNotBlankString(string);
        throw new Error("isNotBlankString should raise an exception with not defined string");   
    }catch(e){}
    
    string = " ";   
    try{ 
        Validate.isNotBlankString(string);
        throw new Error("isNotBlankString should raise an exception with blank string");   
    }catch(e){}
    
    string = "            ";   
    try{ 
        Validate.isNotBlankString(string);
        throw new Error("isNotBlankString should raise an exception with blank string");   
    }catch(e){}
    
    string = "    abc    ";   
    try{ 
        Validate.isNotBlankString(string);
    }catch(e){
        throw new Error("isNotBlankString shouldn't raise an exception with defined not blank string");
    }
}


/**
* this function tests Validate.IllegalArgumentError  
* */
ValidateTest.prototype.testIllegalArgumentError = function (){  

    try {
        var error = new IllegalArgumentError("bla");
    } catch (err) {
        throw new Error( err + "IllegalArgumentError shouldn't raise an exception");
    }
}


/**
* this function tests Validate.isNonEmptyString with different string arguments (null, empty, valid, blank) 
* */
ValidateTest.prototype.testIsNonEmptyString = function (){  

    var string = "lalala";   
    try{ 
        Validate.isNonEmptyString(string); 
    }catch(e){
        throw new Error("isNonEmptyString shouldn't raise an exception with defined not empty string");
    }
    
    string = "";   
    try{ 
        Validate.isNonEmptyString(string);
        throw new Error("isNonEmptyString should raise an exception with defined empty string");   
    }catch(e){}
    
    string = null;   
    try{ 
        Validate.isNonEmptyString(string);
        throw new Error("isNonEmptyString should raise an exception with not defined string");   
    }catch(e){}
    
    string = " ";   
    try{
        Validate.isNonEmptyString(string);
    }catch(e){
         throw new Error("isNonEmptyString shouldn't raise an exception with defined not empty string");       
    }
    
}