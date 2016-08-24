Feature: Verify that TCP port tests are working


  Scenario: Test Ports are open/closed

    Then port 22 at localhost is open
    Then port 23 at localhost is closed

    Then port 22 is open
    Then port 23 is closed
