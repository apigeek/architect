Feature: Javascript is working

  Scenario: Inline Javascript

    Given I am testing javascript
    When I execute return this.targets.google.hostname=="google.com";


  Scenario: Multi-line Javascript

    Given I am testing more javascript
    When I execute
  --------
  return this.targets.google.protocol=="https";
  --------
