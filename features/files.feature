Feature: file handling

  Scenario: hello_world file is readable
    Given I am testing existing files
    And I load test from JSON hello_world.json
    Then file hello_world.json exists
    And variable test should exist
    And $.hello in test should match world

  Scenario: bye_bye_world file does not exist
    Given I am testing missing files
    Then file bye_bye_world.json does not exist

  Scenario: create bye_bye_world file
    Given I am testing creating files
    And I load test from JSON hello_world.json
    And variable test should exist
    And I set test.hello to earth
    And $.hello in test should match earth
    When I write test to JSON bye_bye_world.json
    Then file bye_bye_world.json exists

  Scenario: remove bye_bye_world file
    Given I am testing deleting files
    And file bye_bye_world.json exists
    And I load test from JSON bye_bye_world.json
    And variable test should exist
    And $.hello in test should match earth
    When I delete file bye_bye_world.json
    Then file bye_bye_world.json does not exist

