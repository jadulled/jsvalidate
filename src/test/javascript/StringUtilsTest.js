/**
 * Error - Unit Tests
 * 
 * @fileOverview This file has unit tests for StringUtils library.
 * @author Cecilia Hagge
 * @see The <a href="http://commons.apache.org/lang/api-release/index.html">org.apache.commons.lang</a>.
 */
 

/** Test stringUtils.js */
function StringUtilsTest(name)
{
    TestCase.call( this, name );
}

StringUtilsTest.prototype = new TestCase();

//"import" stringUtils class
StringUtils = stringUtils.StringUtils;


/**
* this function tests StringUtils.isNotBlank with a different string arguments (null, empty, valid)
*/
StringUtilsTest.prototype.testIsNotBlank = function (){  

    var string = "lalala";   
    try{ 
        StringUtils.isNotBlank(string); 
    }catch(e){
        throw new Error("isNotBlank shouldn't raise an exception with defined not blank string");
    }
    
    string = "";   
    try{ 
        StringUtils.isNotBlank(string);
        throw new Error("isNotBlank should raise an exception with defined empty string");   
    }catch(e){}
    
    string = null;   
    try{ 
        StringUtils.isNotBlank(string);
        throw new Error("isNotBlank should raise an exception with not defined string");   
    }catch(e){}
    
    string = " ";   
    try{ 
        StringUtils.isNotBlank(string);
        throw new Error("isNotBlank should raise an exception with blank string");   
    }catch(e){}
    
    string = "            ";   
    try{ 
        StringUtils.isNotBlank(string);
        throw new Error("isNotBlank should raise an exception with blank string");   
    }catch(e){}
    
    string = "    abc    ";   
    try{ 
        StringUtils.isNotBlank(string);
    }catch(e){
        throw new Error("isNotBlank shouldn't raise an exception with defined not blank string");
    }
}

/**
* this function tests StringUtils.isNonEmpty with different string arguments (null, empty, valid, blank)
*/
StringUtilsTest.prototype.testIsNonEmpty = function (){  

    var string = "lalala";   
    try{ 
        StringUtils.isNonEmpty(string); 
    }catch(e){
        throw new Error("isNonEmpty shouldn't raise an exception with defined not empty string");
    }
    
    string = "";   
    try{ 
        StringUtils.isNonEmpty(string);
        throw new Error("isNonEmpty should raise an exception with defined empty string");   
    }catch(e){}
    
    string = null;   
    try{ 
        StringUtils.isNonEmpty(string);
        throw new Error("isNonEmpty should raise an exception with not defined string");   
    }catch(e){}
    
    string = " ";   
    try{
        StringUtils.isNonEmpty(string);
    }catch(e){
         throw new Error("isNonEmpty shouldn't raise an exception with defined not empty string");       
    }
}


/**
* this function tests StringUtils.strip with different string arguments (null, empty, valid, blank)
*/
StringUtilsTest.prototype.testStrip = function (){  

    var string = "lalala";   
    try{ 
        var stringStripped = StringUtils.strip(string); 
        if(stringStripped != "lalala") {
            throw new Error(stringStripped + ": strip shouldn't raise an exception with defined not empty string");
        }
    }catch(e){
        throw new Error(stringStripped + ": strip shouldn't raise an exception with defined not empty string");
    }
    
    string = "";   
    try{ 
        var stringStripped = StringUtils.strip(string); 
        if(stringStripped != "") {
            throw new Error(stringStripped + ": strip shouldn't raise an exception with defined empty string");
        }
    }catch(e){
        throw new Error(stringStripped + ": strip shouldn't raise an exception with defined empty string");
    }
    
    string = null;   
    try{ 
        var stringStripped = StringUtils.strip(string);
        if(stringStripped != null) {
            throw new Error(stringStripped + ": strip shouldn't raise an exception with not defined string");  
        }
    }catch(e){
        throw new Error(stringStripped + ": strip shouldn't raise an exception with not defined string");        
    }
    
    string = "   a a ";   
    try{
        var stringStripped = StringUtils.strip(string); 
        if(stringStripped != "a a") {
            throw new Error(stringStripped + ": strip shouldn't raise an exception with defined not empty string");
        }
    }catch(e){
         throw new Error(stringStripped + ": strip shouldn't raise an exception with defined not empty string");       
    }

    string = "   a  a   a     ";   
    try{
        var stringStripped = StringUtils.strip(string); 
        if(stringStripped != "a  a   a") {
            throw new Error(stringStripped + ": strip shouldn't raise an exception with defined not empty string");
        }
    }catch(e){
         throw new Error(stringStripped + ": strip shouldn't raise an exception with defined not empty string");       
    }
    
    string = "    ";   
    try{
        var stringStripped = StringUtils.strip(string); 
        if(stringStripped != "") {
            throw new Error(stringStripped + ": strip shouldn't raise an exception with defined not empty string");
        }
    }catch(e){
         throw new Error(stringStripped + ": strip shouldn't raise an exception with defined not empty string");       
    }
}

/**
* this function tests StringUtils.join with different string arguments (null, empty, valid, blank)
*/
StringUtilsTest.prototype.testJoin = function (){  
    
    var array = null;   
    try{ 
        var string = StringUtils.join(array, '*'); 
        if(string != null) {
            throw new Error(string + ": join shouldn't raise an exception with null array");
        }
    }catch(e){
        throw new Error(string + ": join shouldn't raise an exception with null array");
    }
    
    array = new Array();   
    try{ 
        var string = StringUtils.join(array, '*'); 
        if(string != "") {
            throw new Error(string + ": join shouldn't raise an exception with empty array");
        }
    }catch(e){
        throw new Error(string + ": join shouldn't raise an exception with empty array");
    }
    
    array = new Array();
    array.push(null);
    try{ 
        var string = StringUtils.join(array, '*');
        if(string != "") {
            throw new Error(string + ": join shouldn't raise an exception with null array elements");  
        }
    }catch(e){
        throw new Error(string + ": join shouldn't raise an exception with null array elements");        
    }
       
    array = new Array();
    array.push('a');
    array.push('b');
    array.push('c');
    try{
        var string = StringUtils.join(array, ';'); 
        if(string != "a;b;c") {
            throw new Error(string + ": join shouldn't raise an exception with defined array elements");
        }
    }catch(e){
         throw new Error(string + ": join shouldn't raise an exception with defined array elements");       
    }
    
    try{
        var string = StringUtils.join(array, null); 
        if(string != "abc") {
            throw new Error(string + ": join shouldn't raise an exception with defined array elements");
        }
    }catch(e){
         throw new Error(string + ": join shouldn't raise an exception with defined array elements");       
    }
    
    try{
        var string = StringUtils.join(array, ''); 
        if(string != "abc") {
            throw new Error(string + ": join shouldn't raise an exception with defined array elements");
        }
    }catch(e){
         throw new Error(string + ": join shouldn't raise an exception with defined array elements");       
    }
    
    try{
        var string = StringUtils.join(array, '--'); 
        if(string != "a--b--c") {
            throw new Error(string + ": join shouldn't raise an exception with defined array elements");
        }
    }catch(e){
         throw new Error(string + ": join shouldn't raise an exception with defined array elements");       
    }
    
    array = new Array();
    array.push(null);
    array.push('');
    array.push('c');
    try{
        var string = StringUtils.join(array, ';'); 
        if(string != ";;c") {
            throw new Error(string + ": join shouldn't raise an exception with defined array elements");
        }
    }catch(e){
         throw new Error(string + ": join shouldn't raise an exception with defined array elements");       
    }

}

/**
* this function tests StringUtils.split with different string arguments (null, empty, valid, blank)
*/
StringUtilsTest.prototype.testSplit = function (){  

    
    var string = null;   
    try{ 
        var array = StringUtils.split(string, '*'); 
        if(array != null) {
            throw new Error(array + ": split shouldn't raise an exception with null string");
        }
    }catch(e){
        throw new Error(array + ": split shouldn't raise an exception with null string");
    }
    
    string = "";   
    try{ 
        var array = StringUtils.split(string, '*'); 
        if(array.length != 0) {
            throw new Error(array + ": split shouldn't raise an exception with empty string");
        }
    }catch(e){
        throw new Error(array + ": split shouldn't raise an exception with empty string");
    }
    
    string = "a.b.c";   
    try{ 
        var array = StringUtils.split(string, '.'); 
        if(!(array[0] == 'a' && array[1] == 'b' && array[2] == 'c')) {
            throw new Error(array + ": split shouldn't raise an exception with valid string");
        }
    }catch(e){
        throw new Error(array + ": split shouldn't raise an exception with valid string");
    }
    
    string = "a...b.c";   
    try{ 
        var array = StringUtils.split(string, '.'); 
        if(!(array[0] == 'a' && array[1] == 'b' && array[2] == 'c' && array.length == 3)) {
            throw new Error(array + ": split shouldn't raise an exception with valid string");
        }
    }catch(e){
        throw new Error(array + ": split shouldn't raise an exception with valid string");
    }
    
    string = "a:b:c";   
    try{ 
        var array = StringUtils.split(string, '.'); 
        if(!(array[0] == 'a:b:c' && array.length == 1)) {
            throw new Error(array + ": split shouldn't raise an exception with valid string");
        }
    }catch(e){
        throw new Error(array + ": split shouldn't raise an exception with valid string");
    }
    
    string = "a b c";   
    try{ 
        var array = StringUtils.split(string, ' '); 
        if(!(array[0] == 'a' && array[1] == 'b' && array[2] == 'c' && array.length == 3)) {
            throw new Error(array + ": split shouldn't raise an exception with valid string");
        }
    }catch(e){
        throw new Error(array + ": split shouldn't raise an exception with valid string");
    }
    
    string = "a b c";   
    try{ 
        var array = StringUtils.split(string, ''); 
        if(!(array[0] == 'a b c' && array.length == 1)) {
            throw new Error(array + ": split shouldn't raise an exception with valid string");
        }
    }catch(e){
        throw new Error(array + ": split shouldn't raise an exception with valid string");
    }
    
    string = "a b c";   
    try{ 
        var array = StringUtils.split(string, null); 
        if(!(array[0] == 'a' && array[1] == 'b' && array[2] == 'c' && array.length == 3)) {
            throw new Error(array + ": split shouldn't raise an exception with valid string");
        }
    }catch(e){
        throw new Error(array + ": split shouldn't raise an exception with valid string");
    }
    
    string = "...a.b.c..";   
    try{ 
        var array = StringUtils.split(string, '.'); 
        if(!(array[0] == 'a' && array[1] == 'b' && array[2] == 'c' && array.length == 3)) {
            throw new Error(array + ": split shouldn't raise an exception with valid string");
        }
    }catch(e){
        throw new Error(array + ": split shouldn't raise an exception with valid string");
    }
    
}
