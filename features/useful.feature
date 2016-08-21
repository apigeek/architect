Feature: Verify that 'simple' features are working


  Scenario: Always successful
	Given I am testing 'pass'
	Then I pass

   Scenario: Wait for 1 second
	Given I am testing 'wait'
	And I wait 1 second
	Then I pass

