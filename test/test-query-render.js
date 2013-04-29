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
var render = require( "../impl/query/query-render.js" );


describe(
    'query-render.js',

    function() {
        describe(
            '#render()',
            function() {
                it(
                    'no params to render, context is empty.',

                    function() {
                        var queryQL = ".test > .hello";
                        var rendered = render( queryQL, {});

                        assert.equal( queryQL, rendered );
                });

                it( 'render with one parameter in context.', function() {
                    var queryQL = ".test > .{{params.value1}}";
                    var rendered = render( queryQL, {
                            params : {
                                value1 : "TESTVALUE"
                            }
                        }
                    );

                    assert.equal( ".test > .TESTVALUE", rendered );
                });
            });
    });