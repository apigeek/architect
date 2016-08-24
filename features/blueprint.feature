Feature: Generate API governance assets for ACME
  As a project architect I want to employ enterprise best practices
  to instantiate a executable API runtime and governance framework.

  Scenario: OpenAPI Tests

    Given I load context from JSON project.json
    And I load openapi from YAML openapi.yaml
    When I build openapi-tests
    And I mkdir openapi-tests
    Then folder openapi-tests should exist
