Feature: Generate Example Web site
  As a project architect I want to employ enterprise best practices
  to instantiate a executable API runtime and governance framework.

  Scenario: Example Blueprint

    Given I am {{name}}
    And I set greeting to {{greeting}}
    And I set audience to {{audience}}
    And I dump
    And file ./index.html should contain {{greeting}} {{audience}}
    And file ./{{greeting}}.html should contain {{greeting}} {{audience}}
    And file ./{{name}}/features/{{greeting}}.feature should exist
