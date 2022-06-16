-- Deploy memory:views-v01 to pg

BEGIN;

CREATE VIEW "board_view" AS 
  SELECT 
    "id",
    "user_id" AS "userId",
    "size",
    "date_start" AS "dateStart",
    "date_end" AS "dateEnd"
  FROM "board";

CREATE VIEW "card_view" AS 
  SELECT 
    "id",
    "board_id" AS "boardId",
    "value",
    "pos_x" AS "posX",
    "pos_y" AS "posY"
  FROM "card";

CREATE VIEW "try_view" AS
  SELECT
    "board_id" AS "boardId",
    "card_id" AS "cardId", 
    "date_try" AS "date"
  FROM "try";

COMMIT;
