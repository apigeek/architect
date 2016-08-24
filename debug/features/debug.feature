@target=google
Feature: Robot Web Browser

@dialect=webapi
  Scenario: Request Google homepage - with redirects

    Given I enable redirects
    When I GET http://google.com
    Then response code should be 200

#@skip
#@dialect=webapp
  Scenario: Google on Firefox

    Given I use firefox browser
    When I visit /
    When I type apigeek-architect into q
    When I click btnG
    When I wait until page is apigeek-architect - Google Search
    Then I stop using browser
    Then dump
