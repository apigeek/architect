@cookies
@dialects=webapi

Feature: 404: Page Not Found

@skip
Scenario: 404

  Given I enable redirects
  When I GET http://404.apigeek.me
  Then response code should be 404
