Feature: Variables

  Scenario: Global Var
	Given I am configured
	Then bonjour should exist
    And I dump
	And bonjour equals monde

  Scenario: Config Test

    Given I am configured
    And I set x = ok
    Then I assert this.targets.default

  Scenario: Scoped Variable

    Given I am scoped
    Then I assert this.vars.x=="ok"

  Scenario: Clear Variables

    Given I am forgetful
    And I clear variables
    Then I assert this.vars.x!="ok"

  Scenario: Test Variable Assignment

    Given I am testing dialect
    And I set test to hello
    Then variable test should match hello

  Scenario: Test CSV sample

    Given I am testing CSV parsing
    And some CSV as test:
  --------
  what, who
  hello, world
  greetings, earthling
  --------
    Then $.[0].what in test should match hello
    And $.[0].who in test should match world
    And $.[1].what in test should match greetings
    And $.[1].who in test should match earthling


  Scenario: Test set body JSON sample - indirect via variable

    Given I am testing JSON
    And  I set test to JSON:
  --------
  { "hello": "world", "earth": { "moon": "cheese" } }
  --------
    Then hello in test should match world
    And earth.moon in test should match cheese
    Then I assert this.vars.test.hello=="world"
    And I assert this.vars.test.earth.moon=="cheese"



