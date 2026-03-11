-- Remove micro_3 regime (OUG 89/2025 eliminated 3% rate — all micros pay 1% from 2026)
-- First migrate any existing micro_3 users to micro_1
UPDATE fiscal_profiles SET regime = 'micro_1' WHERE regime = 'micro_3';

-- Update the CHECK constraint to remove micro_3
ALTER TABLE fiscal_profiles DROP CONSTRAINT IF EXISTS fiscal_profiles_regime_check;
ALTER TABLE fiscal_profiles ADD CONSTRAINT fiscal_profiles_regime_check
  CHECK (regime IN ('norma_venit', 'sistem_real', 'micro_1'));
