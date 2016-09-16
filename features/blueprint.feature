Feature: Build an example website
  As a geek I want to be automated so I can be l33t

  Scenario: Example Blueprint

    Given I am a blueprint
    And I set greeting to hello
    And I set audience to world
    When I build example
    Then folder ../../target/example should exist
    And file ../../target/example/index.html should contain hello blueprint
    And file ../../target/example/hello.html should contain hello world
    And file ../../target/example/features/blueprint.feature should exist
