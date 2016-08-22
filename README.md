
Executable English for Software Architects
==========================================

ApiGeek-Architect is an automation and orchestration tool for software architects. 

ApiGeek-Architect uses a Business Driven Development (BDD) approach to designing, deploying and governing software systems.

You write executable features (Epics and Stories) that can be easily re-used across different projects.

Since features are written in "natural language" every stakeholder (including the CIO :-) can make sense of them.

- Simplify
- Standardise
- Socialise

[View the PDF introduction](docs/Intro.pdf). 

I want to automate myself
=========================

You write your process and governance requirements in simplified english. ApiGeek-Architect takes care of the rest.

A feature (or epic) is used to collect together related stories / scenarios.

The scenarios contain executable english instructions - related instructions are packaged as dialects.

Each scenario describes the expected context, actions and outcomes in a way that is both human and machine friendly.

I want to use natural language
==============================

ApiGeek-Architect understands english language statements to build features that executes your intentions.

The BDD notation for a scenario is:

	Scenario: An example
		GIVEN   some context
		WHEN    an action is performed
		THEN    an outcome is expected

The text following the keyword (GIVEN | WHEN | THEN) needs to match a phrase/pattern from a vocabulary.

This BDD notation is called "Gherkin".

Gherkin is human and machine readable - business analysts, featureers, developers and robots can collaborate.

New features can be created using any simple text editor and re-use ApiGeek-Architect's extensible instruction set.

You can download pre-packaged vocabularies (called Dialects) and/or roll your own with simple Javascript.

I want to see a working example
===============================

ApiGeek-Architect's features are collections of scenarios. 

To improve readability, the keyword AND can be used instead in place of the verbs above.

You can influence what ApiGeek-Architect understands using @dialect annotations.

	@dialects=webapi
	Feature: Verify that Google is accessible
	
	Background: Google Scenarios
	
	    Given I am googling
	
	  Scenario: Request Google homepage - with redirects
	
	    Given I enable redirects
	    When I GET http://google.com
	    Then response code should be 200
	
	  Scenario: Request Google homepage - no redirect
	
	    Given I disable redirects
	    When I GET http://google.com
	    Then response code should be 302

I want to test-drive ApiGeek-Architect
======================================

ApiGeek-Architect is built using NodeJS. If you're new to node, pre-read [Getting Started](https://www.npmjs.com/package/ApiGeek-dialect/tutorial).

You install ApiGeek-Architect as a system-wide CLI command:

	$ npm install apigeek-architect -g

To run it simply type:

	$ apigeek

By default, ApiGeek-Architect looks in the "./features" sub-directory. It will create the folder, if it's not found.

However, It won't do much else until we provide some feature scenarios.

Now, create a file called ./features/my-first.feature with a simple text editor. 

Paste the Feature Example from above, then run 'apigeek' again:

	$ apigeek

Next, let's enable ApiGeek-Architect's built-in debugger.


	$ export DEBUG=apigeek*

Now, the verbose output is colour-coded to make it easier to design, debug, showcase and socialise your features.

	$ apigeek

To turn it off again, type:

	$ export DEBUG=
	$ apigeek

ApiGeek-Architect can be invoked elegantly from an API, the command line, Mocha, your IDE or your DevOps workflow.

I want to test that my stories worked
=====================================

A scenario describes a Story - essentially it's a list of instructions and expectations.

The framework interprets each step in the scenario using one or more [Dialects](docs/vocab.md). 

Let's create a trivial example of a hypothetical test case.

	Scenario: Trivial Test

        Given I am testing a story
        When debug works
        And log works
        And error works
        Then I assert this.name == "story"
		And I succeed

I want to learn more about ApiGeek-Architect
============================================

For runtime options, type:

	$ apigeek  -h

For more information:

[Example Features](features/). 

[Basic Dialect](docs/vocab.md). 

[Advanced Dialect](docs/advanced.md). 

[Something Went Wrong](docs/errors.md). 

[Web API Dialect](/apigeek/dialect-webapi/). 

[Web Apps Dialect](/apigeek/dialect-webapp/). 

[Network Dialect](/apigeek/dialect-net/). 

[Software Blueprint Dialect](/apigeek/dialect-blueprint/). 

I want to organise my work into folders
=======================================

If your features are in a different location then use the "--features" or "--epics" option to locate them. 

	$ apigeek --verbose --archive ./my--archive --features ./my-features

These folders are not automatically created, they return an error if they're not found.

I want to re-use my features in other projects
==============================================

ApiGeek-Architect was designed to support a declarative style so that features are portable. 

Supplying a different "config" file for each environment allows features to be re-used across multiple environments.

For example, features can adapt to dev, QA and live environments - injecting hostnames, credentials, etc as required.

Most Dialects configure themselves automatically. 

If yours doesn't then there is alternative - use {{mustache}} templates to modify statements prior to execution.

	Given I login as {{scope.actor}}

In this way, your BDD features are neatly abstracted from your runtime configuration.

To specify a runtime configuration for your features, type:

	$ apigeek --config ./my-context.json

By default, ApiGeek-Architect will try to load a configuration file called "apigeek.json" from your current directory. 

If no file is found, then sensible default values are defined.

I want to do something before every scenario
=============================================

Backgrounds are similar to scenarios, except they do not support annotations.

Any feature can contain a background, in which case the steps that carried out before each scenario.


	Background: Authenticate
	
		GIVEN I login
		AND I use a valid client certificate

I want to add comments
======================

It's useful to document your intentions or to prevent a statement from running, for example during development.

Simple, place a # before any line and it will be ignored by Architect.

	# This is ignored by the parser

	Scenario: Comments Example

		Given I am using comments
		# Then I fail
		Then I succeed

I want to automate everything
=============================

That is our goal too. We'll continue to address the needs of Enterprise Architects.

Competent software engineers can easily create "blueprints" that capture the patterns, templates and files used to build SDLC artefacts.

Please share any custom Blueprints and Dialects so that ApiGeek-Architect becomes more useful for all of us.

Then ApiGeek-Architect can re-use those blueprints to build customised websites, portals, Apps, APIs, mock servers, micro services and more.

I want to license ApiGeek-Architect
===================================

This software is licensed under the Apache 2 license, quoted below.

Copyright 2014-2016 Lee Curtis <architect@ApiGeek.me>

Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at

    [http://www.apache.org/licenses/LICENSE-2.0]

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.