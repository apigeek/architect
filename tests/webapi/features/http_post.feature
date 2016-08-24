Feature: Test HTTP POST
Scenario: Send JSON payload

Given I am uploading JSON
And I send test.json as body
When I POST http://jsonplaceholder.typicode.com/posts
Then response code should be 201
And header Content-Type should exist
And header Content-Type should contain application/json

