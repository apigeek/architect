@cookies
@dialects=webapi
@skip
Feature: 404: Page Not Found

Scenario: 404

  Given I enable redirects
  When I GET http://localhost/404/not/found
  Then response code should be 404
