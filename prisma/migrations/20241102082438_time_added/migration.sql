-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "created_At" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_At" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;
