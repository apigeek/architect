Feature: Test Cases for Hello World API v1.0


  @target=default
    Scenario: Test: Returns a farewall to the user!
      Given I am testing GET /goodbye/user
      And I enable redirects
      And I set param user to world
      When I GET /goodbye/user
      Then response code should be 404


