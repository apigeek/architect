Feature: Verify that 'variables' feature is working

  Scenario: Test Variable Assignment

    Given I set test to hello
    Then variable test should match hello

  Scenario: Test CSV sample

    Given some CSV as test:
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

    Given I set test to JSON:
  --------
  { "hello": "world", "earth": { "moon": "cheese" } }
  --------
    And I set body to test
    Then hello in test should match world
    And earth.moon in test should match cheese
    And I assert this.request.json.hello=="world"
    And I assert this.request.json.earth.moon=="cheese"



  Scenario: Test set body to JSON sample - direct

    Given I set body to JSON:
  --------
  { "hello": "world", "earth": { "moon": "cheese" } }
  --------
    And I assert this.request.json.hello=="world"
    And I assert this.request.json.earth.moon=="cheese"



  Scenario: Test set/send JSON sample

    Given I send JSON:
  --------
  { "hello": "world", "earth": { "moon": "cheese" } }
  --------
    And I assert this.request.json.hello=="world"
    And I assert this.request.json.earth.moon=="cheese"

