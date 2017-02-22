Feature: Simple HTTP

Background: Google Scenarios

    Given I am googling

  Scenario: Google - with redirects

    Given I enable redirects
    When I GET http://google.com
    Then response code should be 200

  Scenario: Google - no redirect

    Given I disable redirects
    When I GET https://google.com
    Then response code should be 3xx


@skip
@target=example
  Scenario: Example.com

    Given I am browsing example.com
    When I GET http://example.com
    Then response body should contain Example Domain
