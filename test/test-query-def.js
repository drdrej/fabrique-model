/*

 Copyright (c) 2012-2013 Andreas Siebert, ask@touchableheroes.com

 Permission is hereby granted, free of charge, to any person obtaining
 a copy of this software and associated documentation files (the "Software"),
 to deal in the Software without restriction, including without limitation
 the rights to use, copy, modify, merge, publish, distribute, sublicense,
 and/or sell copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included
 in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 IN THE SOFTWARE.

 */


var assert = require("assert");
var createQuery = require( "../impl/query/query-def.js" );


describe(
    'query-def.js',

    function() {
        describe(
            '#select()',
            function() {
                it(
                    'create elements and select by query.',

                    function() {
                        var queryQL = ".test > .hello";
                        var query = createQuery( "test", queryQL );

                        var model = {
                            "test" : {
                                "hello": 1
                            }
                        };

                        var selected = query.select( model );

                        assert.equal( true, (selected != undefined));
                        assert.equal( 1, selected.length );
                        assert.equal( 1, selected[0] );
                    });
            });
    });