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

var L = require( "fabrique-log").logger;
var selectJSON = require( "./query-json-select.js" );

function QueryDefinition() {
     this.name = null;
     this.query = null;
};

/**
 * empty impl.
 *
 * @returns {Array}
 */
QueryDefinition.prototype.select = function() {
    return [];
};


/**
 * factory-method to create a query-object.
 *
 * @param name never NULL.
 * @param query never NULL.
 *
 * @returns {QueryDefinition}
 */
module.exports = function create( name, query ) {
     var def = new QueryDefinition();

     def.name = name;
     def.query = query;

    /**
     * @public
     * method to select elements from json, based on declared query.
     *
     * @param model
     * @returns {*}
     */
     def.select = function( onModel ) {
          var queryStr = this.query;

          if( onModel == undefined
              || typeof( onModel ) != "object" ) {
              L.warn( "couldn't exec {query = " + queryStr
                  + " }passed model is empty." );

              return [];
          }

          // render query - parameter aus dem übergeordneten Kontext berücksichtigen.
          return selectJSON( queryStr, onModel );
     }

     return def;
};