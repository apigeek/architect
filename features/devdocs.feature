Feature: Dev Documentation
  Build as-built developer documentation

  Scenario: Build Feature Docs
    Given I am Example Features
    And I find .feature in folder ../ as files
    And I delete docs folder examples
    And I build test-plan as ../docs/examples
    Then docs file examples/index.html should exist
