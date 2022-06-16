-- Deploy memory:init to pg

BEGIN;

-- user
CREATE TABLE "user" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE CHECK ( "email" ~ '\w+@\w+\.\w+' ),
  "password" TEXT NOT NULL
);

-- boards
CREATE TABLE "board" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "date_start" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "date_end" TIMESTAMPTZ
);

-- cards
CREATE TABLE "cards" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "board_id" INTEGER NOT NULL REFERENCES "board"("id") ON DELETE CASCADE,
  "value" TEXT NOT NULL,
  "pos_x" INTEGER NOT NULL,
  "pos_y" INTEGER NOT NULL,
  UNIQUE ("board_id", "pos_x", "pos_y")
);

-- try
CREATE TABLE "try" (
  "board_id" INTEGER NOT NULL REFERENCES "board"("id") ON DELETE CASCADE,
  "card_id" INTEGER NOT NULL REFERENCES "card"("id") ON DELETE CASCADE,
  "date_try" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMIT;
