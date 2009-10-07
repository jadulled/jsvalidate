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

    StringUtilsTest.prototype.MSG_ABBREVIATE = ": abbreviate should not raise an exception";
    StringUtilsTest.prototype.MSG_LOWERCASE = ": lowerCase should not raise an exception";
    StringUtilsTest.prototype.MSG_UPPERCASE = ": upperCase should not raise an exception";
    StringUtilsTest.prototype.MSG_ISNOTBLANK_C = ": isNotBlank should not raise an exception";
    StringUtilsTest.prototype.MSG_ISNOTBLANK_I = ": isNotBlank should raise an exception";
    StringUtilsTest.prototype.MSG_STRIP = ": strip should not raise an exception";
    StringUtilsTest.prototype.MSG_JOIN = ": join should not raise an exception";
    StringUtilsTest.prototype.MSG_ISNONEMPTY_C= ": isNonEmpty should raise an exception";
    StringUtilsTest.prototype.MSG_ISNONEMPTY_I= ": isNonEmpty should not raise an exception";
    StringUtilsTest.prototype.MSG_SPLIT= ": split should not raise an exception";
    StringUtilsTest.prototype.MSG_SPLIT_VALID= ": split should not raise an exception with valid string";
    
    /**
    * this function tests StringUtils.isNotBlank with a different string arguments (null, empty, valid)
    */
    StringUtilsTest.prototype.testIsNotBlank = function (){  

        this.isNotBlankCorrect("lalala", this.MSG_ISNOTBLANK_C + " with defined not blank string");
        
        this.isNotBlankIncorrect("", this.MSG_ISNOTBLANK_I + " with defined empty string");
        
        this.isNotBlankIncorrect(null, this.MSG_ISNOTBLANK_I + " with not defined string");
        
        this.isNotBlankIncorrect(" ", this.MSG_ISNOTBLANK_I + " with blank string"); 
        
        this.isNotBlankIncorrect("            ", this.MSG_ISNOTBLANK_I + " with blank string");
        
        this.isNotBlankCorrect("    abc    ", this.MSG_ISNOTBLANK_C + " with defined not blank string");
    }
    
    StringUtilsTest.prototype.isNotBlankCorrect = function (string, msg){ 
        try{ 
            StringUtils.isNotBlank(string);
        }catch(e){
            throw new Error(msg ? msg : this.MSG_ISNOTBLANK_C);
        }
    }
    
    StringUtilsTest.prototype.isNotBlankIncorrect = function (string, msg){ 
        try{ 
            StringUtils.isNotBlank(string);
            throw new Error(msg ? msg : this.MSG_ISNOTBLANK_I);   
        }catch(e){}
    }
    
    /**
    * this function tests StringUtils.isNonEmpty with different string arguments (null, empty, valid, blank)
    */
    StringUtilsTest.prototype.testIsNonEmpty = function (){  
    
        var string = "lalala";   
        try{ 
            StringUtils.isNonEmpty(string); 
        }catch(e){
            throw new Error(this.MSG_ISNONEMPTY_I + " with defined not empty string");
        }
        
        string = "";   
        try{ 
            StringUtils.isNonEmpty(string);
            throw new Error(this.MSG_ISNONEMPTY_C + " with defined empty string");   
        }catch(e){}
        
        string = null;   
        try{ 
            StringUtils.isNonEmpty(string);
            throw new Error(this.MSG_ISNONEMPTY_C + " with not defined string");   
        }catch(e){}
        
        string = " ";   
        try{
            StringUtils.isNonEmpty(string);
        }catch(e){
             throw new Error(this.MSG_ISNONEMPTY_I + " with defined not empty string");       
        }
    }
    
    
    /**
    * this function tests StringUtils.strip with different string arguments (null, empty, valid, blank)
    */
    StringUtilsTest.prototype.testStrip = function (){  
    
        this.strip("lalala", "lalala");
        
        this.strip("", "");
        
        this.strip(null, null);
        
        this.strip("   a a ", "a a");
    
        this.strip("   a  a   a     ", "a  a   a");       
        
        this.strip("    ", "");
        
    }
    
    StringUtilsTest.prototype.strip = function (string, expected){ 
        try{ 
            var stringStripped = StringUtils.strip(string); 
            if(stringStripped != expected) {
                throw new Error(string + this.MSG_STRIP);
            }
        }catch(e){
            throw new Error(string + this.MSG_STRIP);
        }
    }
    /**
    * this function tests StringUtils.join with different string arguments (null, empty, valid, blank)
    */
    StringUtilsTest.prototype.testJoin = function (){  
        
        this.join(null, '*', null);
        
        this.join(new Array(), '*', "");
                
        var array = new Array();
        array.push(null);
        this.join(array, '*', "");
           
        array = new Array();
        array.push('a');
        array.push('b');
        array.push('c');
        this.join(array, ';', "a;b;c");
        
        this.join(array, null, "abc");
        
        this.join(array, '', "abc");
        
        this.join(array, '--', "a--b--c");
                
        array = new Array();
        array.push(null);
        array.push('');
        array.push('c');
        
        this.join(array, ';', ";;c");
        
    }
    
    StringUtilsTest.prototype.join = function (array, separator, expected){  
        try{ 
            var string = StringUtils.join(array, separator); 
            if(string != expected) {
                throw new Error(array + this.MSG_JOIN);
            }
        }catch(e){
            throw new Error(array + this.MSG_JOIN);
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
                throw new Error(array + this.MSG_SPLIT + " with null string");
            }
        }catch(e){
            throw new Error(string + this.MSG_SPLIT + " with null string");
        }
        
        string = "";   
        try{ 
            var array = StringUtils.split(string, '*'); 
            if(array.length != 0) {
                throw new Error(array + + this.MSG_SPLIT + " with empty string");
            }
        }catch(e){
            throw new Error(string + + this.MSG_SPLIT + " with empty string");
        }
        
        string = "a.b.c";   
        try{ 
            var array = StringUtils.split(string, '.'); 
            if(!(array[0] == 'a' && array[1] == 'b' && array[2] == 'c')) {
                throw new Error(array + this.MSG_SPLIT_VALID);
            }
        }catch(e){
            throw new Error(string + this.MSG_SPLIT_VALID);
        }
        
        string = "a...b.c";   
        try{ 
            var array = StringUtils.split(string, '.'); 
            if(!(array[0] == 'a' && array[1] == 'b' && array[2] == 'c' && array.length == 3)) {
                throw new Error(array + this.MSG_SPLIT_VALID);
            }
        }catch(e){
            throw new Error(string + this.MSG_SPLIT_VALID);
        }
        
        string = "a:b:c";   
        try{ 
            var array = StringUtils.split(string, '.'); 
            if(!(array[0] == 'a:b:c' && array.length == 1)) {
                throw new Error(array + this.MSG_SPLIT_VALID);
            }
        }catch(e){
            throw new Error(string + this.MSG_SPLIT_VALID);
        }
        
        string = "a b c";   
        try{ 
            var array = StringUtils.split(string, ' '); 
            if(!(array[0] == 'a' && array[1] == 'b' && array[2] == 'c' && array.length == 3)) {
                throw new Error(array + this.MSG_SPLIT_VALID);
            }
        }catch(e){
            throw new Error(string + this.MSG_SPLIT_VALID);
        }
        
        string = "a b c";   
        try{ 
            var array = StringUtils.split(string, ''); 
            if(!(array[0] == 'a b c' && array.length == 1)) {
                throw new Error(array + this.MSG_SPLIT_VALID);
            }
        }catch(e){
            throw new Error(string + this.MSG_SPLIT_VALID);
        }
        
        string = "a b c";   
        try{ 
            var array = StringUtils.split(string, null); 
            if(!(array[0] == 'a' && array[1] == 'b' && array[2] == 'c' && array.length == 3)) {
                throw new Error(array + this.MSG_SPLIT_VALID);
            }
        }catch(e){
            throw new Error(string + this.MSG_SPLIT_VALID);
        }
        
        string = "...a.b.c..";   
        try{ 
            var array = StringUtils.split(string, '.'); 
            if(!(array[0] == 'a' && array[1] == 'b' && array[2] == 'c' && array.length == 3)) {
                throw new Error(array + this.MSG_SPLIT_VALID);
            }
        }catch(e){
            throw new Error(string + this.MSG_SPLIT_VALID);
        }
        
    }
    
    
    /**
    * this function tests StringUtils.UpperCase with different string arguments (null, empty, valid, blank)
    */
    StringUtilsTest.prototype.testUpperCase = function (){  
        
        this.upperCase("aBc", "ABC");
        
        this.upperCase(null, null);
        
        this.upperCase("", "");
       
    }
    

    StringUtilsTest.prototype.upperCase = function (string, expected){
        try{ 
            var ret = StringUtils.upperCase(string); 
            if(ret != expected) {
                throw new Error(string + this.MSG_UPPERCASE);
            }
        }catch(e){
            throw new Error(string + this.MSG_UPPERCASE);
        }        
    }

    /**
    * this function tests StringUtils.LowerCase with different string arguments (null, empty, valid, blank)
    */
    StringUtilsTest.prototype.testLowerCase = function (){  
        this.lowerCase("ABc", "abc");
        
        this.lowerCase(null, null);
        
        this.lowerCase("", "");
    }
    

    StringUtilsTest.prototype.lowerCase = function (string, expected){
        try{ 
            var ret = StringUtils.lowerCase(string); 
            if(ret != expected) {
                throw new Error(string + this.MSG_LOWERCASE);
            }
        }catch(e){
            throw new Error(string + this.MSG_LOWERCASE);
        }        
    }
    
    /**
    * this function tests StringUtils.Abbreviate with different string arguments (null, empty, valid, blank)
    */
    StringUtilsTest.prototype.testAbbreviate = function (){
       
        this.abbreviate("abcdefg", 4, "a...");   
        
        this.abbreviate("abcdefg", 7, "abcdefg");   
                
        this.abbreviate("abcdefg", 8, "abcdefg");   
        
        this.abbreviate("abcdefg", 6, "abc...");   
        
        this.abbreviate(null, 1, null);   
        
        string = "abc";   
        try { 
            var string = StringUtils.abbreviate(string, 2); 
            throw new Error(string + this.MSG_ABBREVIATE + " with invalid maxWidth");
        } catch(e) {}
        
        this.abbreviate("", 1, "");   
        
        this.abbreviate("      ", 1, "");   
    }

    StringUtilsTest.prototype.abbreviate = function (string, maxWidth, expected){
        try{ 
            var ret = StringUtils.abbreviate(string, maxWidth); 
            if(ret != expected) {
                throw new Error(string + this.MSG_ABBREVIATE);
            }
        }catch(e){
            throw new Error(string + this.MSG_ABBREVIATE);
        }
    }