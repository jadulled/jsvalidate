package ar.com.zauber.javascript.validate;
import ar.com.zauber.commons.test.javascript.JsTestCase;

/**
 * Test de error.js desde eclipse
 * 
 * @author Cecilia Hagge
 */
public class ErrorDriver extends JsTestCase {
   
    /** @see JsTestCase#getIncludes() */
    @Override
    protected final String[] getIncludes() {
        return new String[] {
            "src/main/javascript/error.js",
            "src/test/javascript/ErrorTest.js"
        };
    }
    
    /** @see JsTestCase#showDetails() */
    @Override
    protected final boolean showDetails() {
        return true;
    }
    
}