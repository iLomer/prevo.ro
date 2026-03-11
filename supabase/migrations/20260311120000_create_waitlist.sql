-- Create waitlist table for collecting pre-launch emails
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.waitlist enable row level security;

-- Allow anonymous inserts (waitlist signup from landing page)
create policy "Allow anonymous insert" on public.waitlist
  for insert
  to anon
  with check (true);

-- Deny all other operations for anon role
-- (no SELECT, UPDATE, or DELETE policies for anon)
