Feature: ZIP / UnZIP Files

  Scenario: Create a zip file
    Given I am zipping-folders
    And I delete file ../../target/example.zip
    And I zip target ./ to ./example.zip
    Then target file ./example.zip exists

  Scenario: Inspect a zip file
    Given I am a unzip-test
    And target file example.zip exists
    And I read target zip example.zip
    Then variable zip.entries exists
    And any $..entryName in zip.entries should match index.html
    And any $..name in zip.entries should match index.html
