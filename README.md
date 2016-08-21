
Executable English for Software Architects
==========================================

Architect is a Business Driven Development (BDD) tool for architecting, deploying and governing software systems.

You write executable Features (Epics and Stories) that can be easily re-used across different projects.

Your features are written in "natural language" so every stakeholder (including the CIO :-) can make sense of them.

[Download a PDF overview](docs/Automating API Governance.pdf). 


I want to automate myself
=========================

ApiGeek-Architect is an automation tool for software architects. 

You write your process and governance and Architect takes care of the rest.

A scenario describes the expected behavior and outcomes in a way that is both human and machine friendly.

A feature (or epic) collects together related stories / scenarios .

I want to use natural language
==============================

The BDD notation for a scenario is:

	Scenario: an example
		GIVEN   some pre-condition
		WHEN    an action is performed
		THEN    an outcome is expected

The text following the keyword (GIVEN | WHEN | THEN) needs to match a phrase/pattern from a vocabulary.

This BDD notation is called "Gherkin". 
Gherkin is human and machine readable - business analysts, featureers, developers and robots can collaborate.

New features can be created using any simple text editor.

They are invoked elegantly from an API, the command line, Mocha, your IDE or your DevOps workflow.

The results are nicely formatted to help debug, showcase and socialise.

You can download pre-packaged vocabularies and/or roll your own with simple Javascript.

I want to see an example
========================

Architect features are collections of scenarios.

To improve readability, the keyword AND can be used instead in place of the verbs above.

You can influence what Architect understands using @dialect annotations.

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

I want to test-drive Architect
==============================

ApiGeek Architect is built using NodeJS. If you're new to node, pre-read [Getting Started](https://www.npmjs.com/package/ApiGeek-dialect/tutorial).

You install ApiGeek Architect as a system-wide CLI command:

	$ npm install apigeek-architect -g

To run it simply type:

	$ apigeek

By default, ApiGeek Architect looks in the "./features" sub-directory. It will create the folder, if it's not found.

However, It won't do much else until we provide some feature scenarios.

Now, create a file called ./features/example.feature with a simple text editor. 

Paste the Feature Example from above, then run 'apigeek' again:

	$ apigeek

Next, let's enable ApiGeek Architect's built-in [Dialect](https://github.com/apigeek/architect) debugger

	export DEBUG=dialect*

Turn it off again:

	export DEBUG=dialect*

I want to organise features into folders
========================================

If your features are in a different location then use the "--features" or "--epics" option to locate them. 

These folders are not automatically created, they return an error if not found.

I want to learn more about Architect
====================================

For runtime options, type:

	$ apigeek  -h

For more information:

[Example Features](features/). 

[Basic Dialect](docs/vocab.md). 

[Advanced Dialect](docs/advanced.md). 

[Something Went Wrong](docs/errors.md). 

[Web API Vocabulary](/apigeek/dialect-webapi/). 

[Web Apps Vocabulary](/apigeek/dialect-webapp/). 

[Network Vocabulary](/apigeek/dialect-net/). 

[Software Blueprints](/apigeek/dialect-blueprint/). 

I want to capture my Stories
============================

A scenario describes a Story - essentially it's a list of instructions and expectations.

The framework interprets each step in the scenario using the [Gherkin Vocabulary](docs/vocab.md). 

Let's expand our initial example, into a hypothetical scenario. 

	Scenario: Trivial Test

        Given I am testing a story
        When debug feature story works
        And log feature story works
        And error feature story works
        Then I assert this.name == "story"

Architect reads the GIVEN | WHEN | THEN sentences to build up a feature suite that initializes, executes features and make assertions.

I want to combine Stories into Epics
=====================================

A group of related scenarios is called a "feature" Epic. An Epic is identified by the ".feature" file extension.

For example: the "hello world.feature" file might look like this:

	Feature: Verify that variables are working
	
	  Scenario: Test Variable Assignment
	
	    Given I set hello to world
	    Then variable hello should match world

I want to re-use feature across multiple projects
=================================================

ApiGeek-Architect was designed to support a declarative style so that features are portable between dev, feature and production environments. 

To achieve portability, environment-specific properties can be declared in a "config" file.

By default, dialect will try to load a configuration file called "ApiGeek.json" from your current directory. 

If no file is found, then sensible default values are defined.

You can change the name of the file using the "--config <file" option.

In this way, your BDD features are neatly abstracted from your runtime configuration.

To specify a custom configuration, use:

	$ apigeek --config config.json

If you omit the --config option, then the "ApiGeek.json" file in the current folder will be used.

Supplying a different "config" file for each environment allows Feature features to be re-used across multiple environments.

I want to perform operations before every scenario
==================================================

A feature feature may contain a background that are prepended to each scenario.
Backgrounds are similar to scenarios, except they do not support annotations.

	Background: Authenticate
	
		GIVEN I login
		AND I use a valid client certificate

I want to add comments
======================

Simple, place a # before any line and it will be ignored by Architect.

It's useful to add detailed instructions about your intentions or to prevent a statement from running, for example during development.

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