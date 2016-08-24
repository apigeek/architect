@cookies
@dialects=webapi
Feature: Google is accessible

  Background: Googling

    Given I am googling

  Scenario: Request Google homepage - with redirects

    Given I enable redirects
    When I GET http://google.com
    Then response code should be 200
