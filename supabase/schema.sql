-- OM SAI SOLAR schema
-- Run this in the Supabase SQL editor for your project.

create extension if not exists "pgcrypto";

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  location text not null,
  employment_type text not null default 'Full-time',
  description text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  address text not null,
  property_type text not null check (property_type in ('residential', 'commercial')),
  monthly_bill numeric,
  message text,
  created_at timestamptz not null default now()
);

create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.jobs (id) on delete set null,
  name text not null,
  email text not null,
  phone text not null,
  role text not null,
  years_experience numeric not null default 0,
  message text,
  resume_url text,
  created_at timestamptz not null default now()
);

alter table public.jobs enable row level security;
alter table public.quote_requests enable row level security;
alter table public.job_applications enable row level security;

create policy "Public can read active jobs"
  on public.jobs
  for select
  to anon, authenticated
  using (is_active = true);

create policy "Public can insert quote requests"
  on public.quote_requests
  for insert
  to anon, authenticated
  with check (true);

create policy "Public can insert job applications"
  on public.job_applications
  for insert
  to anon, authenticated
  with check (true);

insert into public.jobs (title, location, employment_type, description, is_active)
values
  (
    'Solar Panel Installer',
    'Local Service Area',
    'Full-time',
    'Install residential and commercial solar panel systems. Experience with roof work and electrical basics preferred. Training provided for the right candidate.',
    true
  ),
  (
    'Licensed Electrician',
    'Local Service Area',
    'Full-time',
    'Perform electrical work for solar installations including inverters, wiring, and grid interconnection. Valid electrician license required.',
    true
  ),
  (
    'Sales Consultant',
    'Local Service Area / Hybrid',
    'Full-time',
    'Help homeowners and businesses understand solar benefits, prepare quotes, and guide customers through the buying process.',
    true
  ),
  (
    'Project Manager',
    'Local Service Area',
    'Full-time',
    'Coordinate installations from site survey through activation. Manage schedules, permits, crews, and customer communication.',
    true
  );

-- Storage: create a private bucket named "resumes" in the Supabase dashboard,
-- then run the policies below.

insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', false)
on conflict (id) do nothing;

create policy "Public can upload resumes"
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'resumes');

create policy "Public can read own resume path metadata"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'resumes');
