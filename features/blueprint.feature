Feature: Build an example website
  As a geek I want to be automated so I can be l33t

  Scenario: Example Blueprint

    Given I am a blueprint
    And I set greeting to hello
    And I set audience to world
    When I build example as .
    Then target folder . should exist
    And target file index.html should contain hello blueprint
    And target file hello.html should contain hello world
    And target file features/blueprint.feature should exist
