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

var L = require("fabrique-log").logger;

/**
 *
 * @param queries array of query-definitions.
 * @param models map of models map<key, model>.
 *
 * @constructor
 * @public
 */
function Query( queries, models ) {
    if ( !this.isQueriesValid(queries) ) {
        L.warn( "INIT:query/Query.js couldn't initialize Query-object." );
        L.value( "file", __filename );

        return;
    }

    /**
     * @private
     * @type {QueryDefManager}
     */
    this.queries = queries;

    if( !models ) {
        L.warn( "-- INIT:Query: " + __filename + ". Missing parameter:models.");
        throw new Error( "Parameter:models empty." );
    }

    this.models = models;
};

/**
 * this method is used to find results for a Query.
 * a Query-Object should implements some callback-bunfctions
 *
 * @public
 * @param success must be a function.
 *
 * @return undefined
 */
Query.prototype.find = function (success) {
    var query = this.queries.next();

    var hasNoMoreQueries = (!query);
    if (hasNoMoreQueries) {
        this.complete(success);
        return;
    }

    var result = this.execute(query);
    if (result === false)
        return;

    for (i in result) {
        var selected = result[i];

        this.handleSelectionStep(selected);
    }

    this.cleanup();
};

// ##################################################
// ##            private elements                  ##
// ##################################################

Query.prototype.isQueriesValid = function( queries ) {
    L.value( "queries", queries );

    if( queries == undefined
          || queries == null
          || queries == false ) {
        L.error( "Parameter:queries is MULL.");
        return false;
    };

    if( typeof(queries) != "object" ) {
        L.error( "Parameter:queries is NOT OBJECT.");
        return false;
    }

    var typeOfNext = typeof(queries.next);
    if( typeOfNext != "function" ) {
        L.error( "Parameter:queries has no function next().");
        return false;
    }

    return true;
}

/**
 * this method will be called before a query-handling-step is ready.
 */
Query.prototype.cleanup = function () {
    ;
};

/**
 * use selected-result to store it in the exec-stack
 * and resolve the next query, if it's possible.
 *
 * @param selected
 */
Query.prototype.handleSelectionStep = function (selected) {

};

/**
 * @param query Query-Definition, never NULL.
 */
Query.prototype.execute = function (query) {

};


module.exports = Query;