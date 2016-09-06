Feature: Test Cases for Hello World API v1.0


  @target=default
    Scenario: Test: Returns a greeting to the user!
      Given I am testing GET /hello/user
      And I enable redirects
      And I set param user to world
      When I GET /hello/user
      Then response code should be 404


