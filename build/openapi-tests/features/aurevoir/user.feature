Feature: Test Cases for Hello World API v1.0


  @target=default
    Scenario: Test: Returns a au revoir to the user!
      Given I am testing GET /aurevoir/user
      And I enable redirects
      And I set param user to world
      When I GET /aurevoir/user
      Then response code should be 404


