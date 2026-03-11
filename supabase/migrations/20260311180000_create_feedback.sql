-- Feedback table for collecting user messages from the feedback bubble
create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  email text,
  message text not null,
  page text,
  user_id uuid references auth.users(id),
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.feedback enable row level security;

-- Allow anonymous inserts (landing page visitors)
create policy "Allow anonymous insert" on public.feedback
  for insert
  to anon
  with check (true);

-- Allow authenticated inserts (logged-in users)
create policy "Allow authenticated insert" on public.feedback
  for insert
  to authenticated
  with check (true);
