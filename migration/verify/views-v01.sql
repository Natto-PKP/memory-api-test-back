-- Verify memory:views-v01 on pg

BEGIN;

SELECT * FROM "board_view" WHERE false;
SELECT * FROM "cards_view" WHERE false;
SELECT * FROM "try_view" WHERE false;

ROLLBACK;
