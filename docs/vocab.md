Apigeek Dialect
==================

Effective BDD is largely facilitated through the use of a simple domain-specific language (DSL) using English-like sentences.

Each statement describes a simple, atomic, action - optionally it may specify one or more parameters. Parameter names are prefixed with a $.

The DSL is natural, but it must follow a precise format that matches the templates shown below.

New vocabulary can be added quite easily to the Affirm core.

The examples require the Web API Dialect, using the @dialects annotation.

	@dialects=webapi

GIVEN
=====

    GIVEN I use a $CERT client certificate
        I use an $CERT client certificate

    GIVEN I set $header header to $value
        I set header $header = $value

    GIVEN I set parameter $key to $value
        I set $key parameter to $value

    GIVEN I use basic authentication
        I login
        I authenticate
    GIVEN I use basic authentication as $agent
    GIVEN I use OAuth2

    GIVEN I set cookie $cookie to $value
        I set cookie $cookie = $value
    GIVEN I set timeout to $time

    GIVEN I enable keep alive
    GIVEN I disable keep alive
    GIVEN I enable gzip
    GIVEN I disable gzip
    GIVEN I set encoding to $encoding
    GIVEN I enable redirects
    GIVEN I disable redirects
    GIVEN I enable strict SSL
    GIVEN I disable strict SSL
    GIVEN I enable client certificates
    GIVEN I disable client certificates

    GIVEN I am debugging

A multi-line syntax is supported for injecting more complex objects such as CSV, JSON or XML:

    GIVEN some CSV as $var_name:
  --------
  what, who
  hello, world
  greetings, earthling
  --------

or:

    GIVEN I set $var_name to JSON:
  --------
  { "hello": "world", "earth": { "moon": "cheese" } }
  --------


WHEN
====

    WHEN I GET $resource|$url
    WHEN I POST $resource|$url
    WHEN I PUT $resource|$url
    WHEN I DELETE $resource|$url
    WHEN I PATCH $resource|$url
    WHEN I request OPTIONS for $resource|$url

    WHEN I wait for $seconds seconds
        I sleep for $seconds seconds
        I wait for $seconds second
        I sleep for $seconds second
    WHEN I return $javascript as $variable

THEN
====

    THEN response code should be $code"
    THEN response code should not be $code"

    THEN elapsed time should be less than $elapsed
        THEN duration should be less than $elapsed

    THEN header $header should be $value
    THEN header $header should not be $value
    THEN header $header should exist
    THEN header $header should not exist
	    THEN response body should be valid (xml|json)

    THEN response body should not be valid (xml|json)
    THEN I store body path (.*) as access token
    THEN response body should contain $expression
    THEN response body should not contain $expression
    THEN response body path (.*) should exist
    THEN response body path (.*) should not exist
    THEN response body path (.*) should be ((?!of type).+)
        response body path (.*) should contain ((?!of type).+)$/]
    THEN response body path (.*) should not be ((?!of type).+)
        response body path (.*) should not contain ((?!of type).+)

    THEN cookie $cookie should exist

	THEN $path in $name should match $regex

	THEN (.*) in $var should match $something
    THEN I assert $javascript
	THEN variable $name should exist
	THEN variable $name should not exist
	THEN variable $name should match $regex
	THEN variable $name should contain $value
	THEN variable $name should be $value
		$name should be $value
	
Object Path Matching
====================

Affirm supports both JSON-path and XML-path when plucking values from complex data objects.

  Scenario: Test CSV sample

    Given some CSV as test:
    <pre>
  --------
  what, who
  hello, world
  greetings, earthling
  --------
    </pre>
    Then $.[0].what in test should match hello
    And $.[0].who in test should match world
    And $.[1].what in test should match greetings
    And $.[1].who in test should match earthling

The following example creates a JSON data structure from the supplied CSV. 

	[
		{ "what": "hello", "who": "world" },
		{ "what": "greetings", "who": "earthling" }
	]

See http://goessner.net/articles/JsonPath/ for more information on JSON path.
There are many XPATH tutorials, for example: http://archive.oreilly.com/pub/a/perl/excerpts/system-admin-with-perl/ten-minute-xpath-utorial.html

A similar approach is used to test XPATH expressions.

In-line Javascript
==================

Several statements support arbitrary Javascript, for example: "I return" and "I assert".

The javscript is executed in the current context - which means that the function has direct access to in-flight meta-data such as request, response, cookies, etc.

  Scenario: Request Google homepage - with redirects

    Given I enable redirects
    When I GET http://google.com/
    And I return this.response.statusCode==200 as NoRedirect
    THEN variable NoRedirect should be true
    THEN I assert this.response.statusCode!=500


Complex data structures
=======================

  Scenario: Set & Test JSON sample

    Given I set some-variable to JSON:
    <pre>
  --------
  { "hello": "world", "earth": { "moon": "cheese" } }
  --------
    </pre>
    And earth.moon in some-variable should match cheese
    And I assert this.features.var['some-variable'].hello=="world"
    And I assert this.request.headers['Content-Type']=="application/json"

