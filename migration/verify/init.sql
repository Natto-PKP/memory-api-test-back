-- Verify memory:init on pg

BEGIN;

SELECT * FROM "user" WHERE false;
SELECT * FROM "board" WHERE false;
SELECT * FROM "card" WHERE false;
SELECT * FROM "try" WHERE false;

ROLLBACK;
