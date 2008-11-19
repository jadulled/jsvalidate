
// "import" validate class
Validate = validate.Validate;

function testNotNull(){
	// test the function with valid values and an invalid value
	var valid = new Array(0, 1, true, false, 'text', new Object(), new Array(1,2,3));
	var invalid = null;
	return _testNotValue(Validate.notNull, valid, invalid);
}

function testNotUndefined(){
	// test the function with valid values and an invalid value
	var valid = new Array(0, 1, true, false, 'text', new Object(), new Array(), null);
	var invalid = undefined;
	return _testNotValue(Validate.notUndefined, valid, invalid);
}

function testIsDefined(){
	// tests the notNull and notUndefined function
	return (testNotNull() && testNotUndefined());
}

function testIsFunction(){
	return false;
}

function testHasProperty(){
	// define an object and many properites
	var x = {}
	x.a = 3;
	x.b = 'hola';
	x.c = new Object();

	// hasProperty shouldn't raise an 
	// exception with defined properties
	try{
		Validate.hasProperty(x,'a');
		Validate.hasProperty(x,'b');
		Validate.hasProperty(x,'c');
		Validate.hasProperty(new Array(), 'length');
	}catch (e){
		return false;
	}
	// hasProperty should raise an exception
	// if an invalid object property
	x.z = null;
	x.y = undefined;
	try{ Validate.hasProperty(x,'z'); return false; }catch(e){}
	try{ Validate.hasProperty(x,'y'); return false; }catch(e){}
	try{ Validate.hasProperty(x,'x'); return false; }catch(e){}

	return true;
}

function testNotEmpty(){
	var arr;
	arr = new Array(null, undefined, true, false, 1, "text");
	try{ Validate.notEmpty(arr); }catch(e){ alert(e); return false; }
	
	arr = new Array();
	try{ Validate.notEmpty(arr); }catch(e){ return true; }

	return false;
}

function testNoNullElements(){
	var resultOK = false;
	var arr;
	arr = new Array(1, false, 0, "text", new Object(), function(){}, new Array());
	try{ Validate.noNullElements(arr); }catch(e){ return false; }
	
	arr = new Array(1, false, 0, null);
	try{ Validate.noNullElements(arr); }catch(e){ return true;}//resultOK = true; }
	
	//arr = new Array(1, false, undefined);
	//try{ Validate.noNullElements(arr); }catch(e){ return resultOK; }

	return false;
}


/** generic function */
function _testNotValue(validateFunction, validValuesArray, invalidValue){
	try{
		for (i in validValuesArray)
			validateFunction(validValuesArray[i]);
	}
	catch(e){ return false; }
	
	try{ validateFunction(invalidValue); }
	catch(e){ return true; }
	
	return false;
}


