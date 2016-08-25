@target=google
@bug
Feature: Robot Web Browser

@dialect=webapp
Scenario: Google on Firefox

  Given I use firefox browser
  When I visit /
  When I type apigeek-architect into q
  When I click btnG
  When I wait until page is apigeek-architect - Google Search
  Then I stop using browser
  Then dump
