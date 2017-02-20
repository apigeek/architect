@target=google
@bug=fix me quick
Feature: Robot Web Browser

Scenario: Google on Firefox

  Given I use firefox browser
  When I visit /
  When I type wikipedia into q
  When I click btnG
  When I wait until page is linkedin - Google Search
  Then I stop using browser
  Then I page body should contain wikipedia
  Then I page body should not contain the-wrong-page

