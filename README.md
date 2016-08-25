![ApiGeek](docs/favicon.png) - 

![Continuous Assurance - Thanks to Travis-CI](https://travis-ci.org/apigeek/architect.svg?branch=master)

Executable English for Software Teams
=====================================

ApiGeek-Architect is an automation and orchestration tool for software teams. 

Architect embeds an english language scripting language that eases various burdens during software development. 

Our mantra is: 

- Simplify
- Standardise
- Socialise

We take a Business Driven Development (BDD) approach to designing, deploying and governing software systems.

We actively support a number of use cases:

	As an over-worked Developer, I want to build skeleton code using my favourite framework
	As a QA Specialist, I want to generate executable BDD tests for APIs and web apps
	As a Product Owner, I want to up-to-date document for various stakeholders
	As an Enterprise Architect, I want to build, document and instrument my solutions

Task definitions are declarative - which makes them easy to read, write and re-use.

They are written in english so that every stakeholder (including the CIO :-) can make sense of them.

[View the PDF introduction](docs/Intro.pdf). 

I want to automate myself
=========================

We're all busy. We write scripts, or at we should. But our scripts are unreadable by our stakeholders - often even ourselves.

With Architect, you write your requirements in a simplified dialect of english - called Gherkin. 

These "Features" contain executable english instructions - actions and assertions - that are easy to read, write and socialise.

Features are lists of related scenarios. It's the scenario's that do all the heavy lifting.

A scenario describes your pre-conditions, actions and outcomes in a way that is both human and machine friendly.

Architect can be invoked elegantly from an API, the command line, Mocha, your IDE or your DevOps workflow.

I want to understand Executable English
=======================================

The BDD notation for a feature / scenario is:

	Feature: Basic Examples

	Scenario: An example
		GIVEN   some context
		WHEN    an action is performed
		THEN    an outcome is expected

The text following the keyword (GIVEN | WHEN | THEN) needs to match a phrase/pattern from a vocabulary.

This BDD notation is called "Gherkin". Gherkin is human and machine readable - business analysts, featureers, developers and robots can collaborate.

New features can be created using any simple text editor - where you'd use ApiGeek-Architect's extensible vocabulary to write them.

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

However, It won't do much else until we provide some feature scenarios.

By default, ApiGeek-Architect looks for ".feature" files recursively, starting in the current directory.

I want to create my first feature
=================================

1) To quickly create a few examples in the ./features folder, type:

		$ apigeek --example

This will create the ./features folder and copy some simple examples.

It will also write your default configuration to ./apigeek.json

It won't damage if you run it again, except re-save your ./apigeek.json config.

Or, you can just create the ./features folder and a default "apigeek.json" without the examples:

	$ apigeek --init

2) To execute your example ".feature" files, type:

		$ apigeek

3) If something goes wrong, enable the built-in debugger.

		$ export DEBUG=apigeek*
		$ apigeek

Now, the output is verbose and colour-coded to make your life easier.

To turn off debugging, type:

		$ export DEBUG=
		$ apigeek

I want to learn some vocabulary
===============================

ApiGeek-Architect ships with few default vocabularies - variables, files, web apis, web apps, etc. 

To discover what phrases exist in the vocabularies, type:

	$ apigeek --knows

Let's create a trivial example of a hypothetical test case.

	Scenario: Trivial Test

        Given I am testing debug
        When debug works
		And I succeed

The steps are executed in sequence.

The GIVEN steps setup pre-conditions. The "Given I am $acting" phrase doesn't do much - except communicate intentions.

The "WHEN ... " steps do useful work that result in desirable outcomes. For example: writing a file, requesting a web page, etc.

In this example, we simply write a debug message to the console, so let's turn on debug output.

	$ export DEBUG=apigeek*

You can adjust the logging scope - to see only Web API messages, use: 

	$ export DEBUG=apigeek:files

The "THEN ..." steps make assertions, that is they test that conditions are met. For example, you can use arbitrary Javascript if necessary:

        Then I assert $some_javascript

The "I succeed", "I pass" always meet their conditions. The inverse "I fail" forces the scenario to abort and report it's failure.

I want to learn more about ApiGeek-Architect
============================================

For runtime options, type:

	$ apigeek  -h

For more information:

[Example Features](features/). 

[Basic Dialect](docs/vocab.md). 

[Advanced Dialect](docs/advanced.md). 

[Something Went Wrong](docs/errors.md). 

[Web API Dialect](https://github.com/apigeek/dialect-webapi/blob/master/vocab.md). 

[Web API Advanced](https://github.com/apigeek/dialect-webapi/blob/master/advanced.md). 

[Web Apps Dialect](https://github.com/apigeek/dialect-webapp/blob/master/vocab.md). 

[Web Apps Advanced](https://github.com/apigeek/dialect-webapp/blob/master/advanced.md). 

[Software Blueprint Dialect](https://github.com/apigeek/dialect-blueprint/blob/master/vocab.md). 

[Software Blueprint Advanced](https://github.com/apigeek/dialect-blueprint/blob/master/advanced.md). 
 
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

I want to know how it works
===========================

First, ApiGeek-Architect parses the command line and initializes the Dialect, Features and Engine components.

Next it loads the default dialects. These can be specified on using the APIGEEK_DIALECT environment variable. Dialects can also be
specified using --dialect option and within Feature: definitions using the @dialect annotation.

Each Dialect instructs the parser (Yadda) to match a set of Gherkin phrases to their related function.

The Feature manager converts features and scenarios into executable units. 

User defined variables are scoped at the feature-level meaning they are shared between scenarios within the same feature. 

The --config file is used as the basis for internal context variables. They are scoped to each scenario.

These variables - such as web requests/responses - can be accessed using the "this." qualifier - with due caution.

Next, the Engine runs each feature using the built-in Mocha runner. Results are correlated and output according to your CLI options.

I want to add comments
======================

It's useful to document your intentions or to prevent a statement from running, for example during development.

Simple, place a # before any line and it will be ignored by Architect.

	# This is ignored by the parser
	Scenario: Comments Example

		Given I am using comments
		# Then I fail
		Then I succeed

Instead, you should use @skip or @todo before a Feature: or Scenario: definition.
 
An @bug scenario will pass normally (skipped) but fail when --debug is used.

	@bug=something is broken

	Scenario: A Bug
		Given I am a bug
		Then I fail

I want to automate everything
=============================

That is our goal too. We'll continue to address the needs of Enterprise Architects.

Competent software engineers can easily create "blueprints" that capture the patterns, templates and files used to build SDLC artefacts.

Then ApiGeek-Architect can re-use those blueprints to build customised websites, portals, Apps, APIs, mock servers, micro services and more.

Please share any custom Blueprints and Dialects so that ApiGeek-Architect becomes more useful for all of us.

If you need support to build or debug your community Blueprints or Dialects, please ask@apigeek.me


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


-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
             _                 _
            (_)               | |
  __ _ _ __  _  __ _  ___  ___| | __
 / _` | '_ \| |/ _` |/ _ \/ _ \ |/ /
| (_| | |_) | | (_| |  __/  __/   <
 \__,_| .__/|_|\__, |\___|\___|_|\_\
      | |       __/ |
      |_|      |___/

	License: Apache-2.0
	Author: lee.curtis

-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
