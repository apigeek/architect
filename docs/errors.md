Common Errors
=============

Most errors in your Gerkin code should be easy to understand.

Scenario cannot be interpreted
==============================

The most common (I find) is a simply typo that prevents the parser from recognising your statement.

For example:

	Given I enable redirects <-- Undefined Step

The "Undefined Step" means the phrase was not matched by an installed Dialect.

Possible Causes:

1) The appropriate vocabulary is not loaded.
2) You mis-typed the phrase (refer to apigeek --knows) .
3) Somehow, the BDD dialect is broken - it happens. Let us know and we'll fix it :-)



