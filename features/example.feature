Feature: An Example

@example
  Scenario: Trivial Example

  Given I am an example
  When debug example works
  And log example works
  And error example works
  Then I succeed

@skip
  Scenario: Skip Broken Story
    Given I am broken
    Then I fail

@bug=skip unless debugging
  Scenario: Skip Debug Story
    Given I am a bug
    Then I fail

