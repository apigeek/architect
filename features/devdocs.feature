Feature: Dev Documentation
  Build as-built developer documentation

  Scenario: Build Feature Docs
    Given I am Self-Test Features
    And I find .feature in folder ../ as files
    And I dump
    And I delete folder ../../docs/examples
    And I build test-plan as ../docs/examples
