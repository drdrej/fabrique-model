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
var createCtx = require("../impl/query/query-ctx.js");


describe(
    'query/query-ctx.js',
    function () {

        describe(
            '#create( ctx, queries, callback )',
            function () {
                it(
                    'prepare context, call combine for passed elements.',
                    function () {
                        var ctx = {};
                        var successful = false;
                        var result = {

                        };

                        var queries = [
                            {
                                name: "param1",
                                query: ".app > .name",
                                value: "default-value"
                            }
                        ];

                        var queryCtx = createCtx(ctx, queries, function (params) {
                            successful = true;
                            result.params = params;
                        });

                        var params = ctx.use();

                        assert.equal(params.param1, undefined);

                        var element1 = { id: 1 };
                        ctx.combine([element1]);

                        assert.equal(1, result.params.param1.id);
                    });


                it(
                    'prepare context, call consume() for passed elements.',
                    function () {
                        var ctx = {};
                        var successful = false;
                        var result = {};

                        var queries = [
                            {
                                name: "param1",
                                query: ".app > .name",
                                value: "default-value",

                                select: function () {
                                    var values = [];
                                    values.push({ id: 1 });

                                    return values;
                                }
                            }
                        ];

                        var queryCtx = createCtx(ctx, queries, function (params) {
                            successful = true;
                            result.params = params;
                        });

                        var params = ctx.use();

                        assert.equal(params.param1, undefined);

                        ctx.consume();

                        assert.equal(1, result.params.param1.id);
                    });



                it(
                    'prepare context, call consume() for 2 queries  with 1 result for every query.',
                    function () {
                        var ctx = {};
                        var successful = false;
                        var result = {};

                        var queries = [
                            {
                                name: "param1",
                                query: ".app > .name",
                                value: "default-value",

                                select: function () {
                                    var values = [];
                                    values.push({ id: 1 });

                                    return values;
                                }
                            },

                            {
                                name: "param2",
                                query: ".app > .name2",
                                value: "default-value",

                                select: function () {
                                    var values = [];
                                    values.push({ id: 2 });

                                    return values;
                                }
                            }
                        ];

                        var queryCtx = createCtx(ctx, queries, function (params) {
                            successful = true;
                            result.params = params;
                        });

                        var params = ctx.use();

                        assert.equal(params.param1, undefined);

                        ctx.consume();

                        assert.equal(1, result.params.param1.id);
                        assert.equal(2, result.params.param2.id);
                    });
            });

    });