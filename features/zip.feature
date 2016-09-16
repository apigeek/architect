Feature: ZIP handling

  Scenario: Create a zip file
    Given I am a zip-test
    And I zip zipped to test.zip
    Then file test.zip exists
    And I delete file test.zip
    And file test.zip does not exist

