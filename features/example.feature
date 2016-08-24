@example
#@uses=./features/example.js
#@dialect=./features/example.js
Feature: An Example

@example
  Scenario: Trivial Example

  Given I am an example
  When debug example works
  And log example works
  And error example works
  Then I succeed

  Scenario: Trivial Test

    Given I am testing
    When debug test works
    And log test works
    And error test works
    Then I assert this.name == "story"

@skip
  Scenario: Skip Broken Story

    Given I am broken
    Then I fail

