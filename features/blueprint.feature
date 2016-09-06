Feature: Generate Test Cases for example.com
  As a project architect I want to employ enterprise best practices
  to instantiate a executable API runtime and governance framework.

  Scenario: BDD Test Cases for OpenAPI

    Given I load context from JSON project.json
    And I load openapi from YAML swagger.yaml
    When I build openapi-tests
    Then folder ../../tmp/build/openapi-tests should exist
    And file ../../tmp/build/openapi-tests/index.html should contain Hello World API
    And folder ../../tmp/build/openapi-tests/features/ should exist
    And file ../../tmp/build/openapi-tests/apigeek.json should contain example.com
