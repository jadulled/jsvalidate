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
           fail("notNull shouldn't raise an exception with value:" + valids[i] + " (type: " + typeof(valids[i]) + ").");	
       }
   }

   try{
       Validate.notNull(invalid); // testing a null value, should fail.
       fail("notNull should raise an exception with a null value.");
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
           fail("notUndefined shouldn't raise an exception with value:" + valids[i] + " (type: " + typeof(valids[i]) + ").");
       }
   }
   try{
       Validate.notUndefined(invalid); // testing a null value, should fail.
       fail("notUndefined should raise an exception with an undefined value.");
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
           fail("isDefined shouldn't raise an exception with value:" + valids[i] + " (type: " + typeof(valids[i]) + ").");	
       }
   }
   try{ 
       Validate.isDefined(obj.z); // testing a null value, should fail.
       fail("isDefined should raise an exception with a null value.");
   }catch(e){
       // isDefined is working correctly with a null value.
   }
   try{ 
       Validate.isDefined(obj.w); // testing an undefined value, should fail.
       fail("isDefined should raise an exception with an undefined value.");
   }catch(e){
       // isDefined is working correctly with an undefined value.
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
		fail("isFunction shouldn't raise an exception with function arguments.");
	}
	
	var o = new h();
	var p = new Object();
	var a = new Array();
	try{
		Validate.isFunction(o); fail("isFunction should raise an exception with a new object argument.");
	}catch(e){}
	try{
		Validate.isFunction(p); fail("isFunction should raise an exception with an object argument. ")
	}catch(e){}
	try{
		Validate.isFunction(a); fail("isFunction should raise an exception with an array argument. ")
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
       fail("hasProperty shouldn't raise an exception with defined properties");
   }

   // hasProperty should raise an exception if an invalid object property
   x.z = null;
   try{ 
       Validate.hasProperty(x,'z'); 
       fail("hasProperty should raise an exception with a null value."); 
   }catch(e){
       // hasProperty is working correctly with a null value.	
   }
   try{ 
       Validate.hasProperty(x,'y'); 
       fail("hasProperty should raise an exception with an undefined value."); 
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
       fail("notEmpty shouldn't raise an exception with a non empty array.");
   }

   arr = new Array();
   try{ 
       Validate.notEmpty(arr); 
       fail("notEmpty should raise an exception with an empty array.")
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
       fail("definedElements shouldn't raise an exception with an all-defined-elements array.");
   }

   arr = new Array(1, false, 0, null);
   try{ 
       Validate.definedElements(arr); 
       fail("definedElements should raise an exception with a not-all-defined-elements array.");
   }catch(e){ 
       // definedElements working ok with invalid arrays (some null elements).
   }

   arr = new Array(1, undefined, "text");
   try{ 
       Validate.definedElements(arr); 
       fail("definedElements should raise an exception with a not-all-defined-elements array.");
   }catch(e){ 
       // definedElements working ok with invalid arrays (some undefined elements).
   }
}
