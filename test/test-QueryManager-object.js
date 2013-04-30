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

var assert = require( "assert");
var createQueryDef = require( "../impl/query/QueryDefinition.js" );
var QueryManager = require( "../impl/query/QueryManager.js");


describe(
    'query/QueryManager.js',
    function() {

        describe(
            '#next()',
            function() {
                it(
                    'QueryManager has one element',

                    function() {
                        var queries = [];

                        var def = createQueryDef( "query1" , ".test > .hello" );
                        assert.equal( true, (def != undefined) );

                        queries.push( def );


                        var manager = new QueryManager( queries );
                        assert.equal( true, (manager != undefined));

                        var first = manager.next();
                        assert.equal( true, (first != undefined));
                        assert.equal( "query1", first.name );
                        assert.equal( ".test > .hello", first.ql );

                        var noMore = manager.next();
                        assert.equal( false, noMore );


                    });

                it(
                    'QueryManager has two elements',

                    function() {
                        var queries = [];

                        queries.push( createQueryDef( "query1" , ".test > .hello" ) );
                        queries.push( createQueryDef( "query2" , ".test > .hello2" ) );

                        var manager = new QueryManager( queries );
                        assert.equal( true, (manager != undefined));

                        var first = manager.next();
                        assert.equal( true, (first != undefined));
                        assert.equal( "query1", first.name );
                        assert.equal( ".test > .hello", first.ql );
                        assert.equal( 1, manager.cursor );

                        var second = manager.next();
                        assert.equal( true, (second != undefined));
                        assert.equal( "query2", second.name );
                        assert.equal( ".test > .hello2", second.ql );
                        assert.equal( 2, manager.cursor );

                        var noMore = manager.next();
                        assert.equal( false, noMore );
                        assert.equal( 2, manager.cursor );


                    });
            });
    });
