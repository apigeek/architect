Feature: Test Cases for {{ctx.openapi.info.title}} v{{ctx.openapi.info.version}}

  {{#each value}}

  @target=default
    Scenario: Test: {{description}}
      Given I am testing {{upper @key}} {{../key}}
      And I enable redirects
      {{#each parameters}}
      And I set param {{name}} to {{example}}
      {{/each}}
      When I {{upper @key}} {{../key}}
      Then response code should be 404

  {{/each}}

