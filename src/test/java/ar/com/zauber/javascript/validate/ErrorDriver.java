package ar.com.zauber.javascript.validate;
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