Feature: ZIP handling

  Scenario: Create a zip file
    Given I am a zip-test
    And I delete file ../../target/example.zip
    And I zip ../../target/example to ../../target/example.zip
    Then file ../../target/example.zip exists

