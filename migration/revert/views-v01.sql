-- Revert memory:views-v01 from pg

BEGIN;

DROP VIEW "try_view", "card_view", "board_view";

COMMIT;
