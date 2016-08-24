Feature: Verify that Selenium is working

@async
@target=google
Scenario: Test Google using Firefox

  Given I use firefox browser
  When I visit /
  When I type apigeek into q
  When I click btnG
  When I wait until page is apigeek - Google Search
  Then I stop using browser
  Then dump
