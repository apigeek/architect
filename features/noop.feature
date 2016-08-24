Feature: No operations

  Scenario: Always successful
	Given I am testing 'pass'
	Then I pass

   Scenario: Wait for 1 second
	Given I am testing 'wait'
	And I wait 1 second
	Then I pass

@skip
  Scenario: I break thing
    Given I am silently ignored
    Then I fail

@bug=JIRA_SAMPLE_ID
  Scenario: I have a bug
    Given I am misbehaving
    Then I fail

@todo=STORY_SAMPLE_ID
  Scenario: I do nothing
    Given I am a work-in-progress
    Then I fail
