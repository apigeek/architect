Feature: ZIP handling

  Scenario: Create a zip file
    Given I am a zip-test
    And I delete file ../../target/example.zip
    And I zip target ./example to ./example.zip
    Then target file ./example.zip exists
    And file ../../target/example.zip exists

