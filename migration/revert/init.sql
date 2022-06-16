-- Revert memory:init from pg

BEGIN;

DROP TABLE "try", "card", "board", "user";

COMMIT;
