Advanced Dialect
================

I want to use ApiGeek-Architect as a RESTful micro-service
==========================================================

ApiGeek-Architect contains a lightweight web server, to share it with other "apigeeks", type:

	$ apigeeks & 

Now you can issue feature requests to the API and receive JSON formatted results.

	$ curl -v -X POST http://localhost:10101/feature -D @features/example.feature


I want to work complex data
===========================

ApiGeek-Architect supports JSON and CSV files for defining complex data objects.

It can interpret XML and JSON payloads and perform complex find/set operations on the data.

I want to work with complex CSV data
====================================

  Scenario: Test CSV sample

    Given some CSV as test:
    <pre>
  --------
  what, who
  hello, world
  greetings, earthling
  --------
    </pre>

The following example creates a JSON data structure from the supplied CSV. 

	[
		{ "what": "hello", "who": "world" },
		{ "what": "greetings", "who": "earthling" }
	]


I want to work with complex JSON data
=====================================

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


I want to work with nested JSON and XML
=======================================

ApiGeek's Dialect supports both JSON and XML path expression.

    Then $.[0].what in test should match hello
    And $.[0].who in test should match world
    And $.[1].what in test should match greetings
    And $.[1].who in test should match earthling

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

I want to use Javascript in my features
=======================================

Several statements support arbitrary Javascript, for example: "I return" and "I assert".

The javscript is executed in the current context - which means that the function has direct access to in-flight meta-data such as request, response, cookies, etc.

	  Scenario: Request Google homepage - with redirects
	
	    Given I enable redirects
	    When I GET http://google.com/
	    And I return this.response.statusCode==200 as NoRedirect
	    And variable NoRedirect should be true
	    Then I assert this.response.statusCode!=500

I want to be notified when features succeed or fail
===================================================

Dialect can send you a web hook notifications via Slack.

To confirm it simply add a section to your JSON config file:

	{ 
		"webhooks": {
			"slack": {
				"username": "dialect-bot",
				"channel": "#featureing",
				"url": "https://hooks.slack.com/services/XXXXXXXXX/YYYYYYYY/ZZZZZZZZ"
			}
		}
	}

Once you have an active [Slack](https://slack.com/create) account then obtain a [new Slack webhook URL](https://api.slack.com/incoming-webhooks)

You will receive events when features start, end or fail.

