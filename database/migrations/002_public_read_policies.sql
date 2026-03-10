-- database/migrations/002_public_read_policies.sql
-- Allow public read-only access to assets and categories

CREATE POLICY "Allow public read-only access to assets"
ON "public"."assets"
AS PERMISSIVE FOR SELECT
TO anon
USING (true);

CREATE POLICY "Allow public read-only access to categories"
ON "public"."categories"
AS PERMISSIVE FOR SELECT
TO anon
USING (true);
