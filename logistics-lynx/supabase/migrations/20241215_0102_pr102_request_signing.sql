-- PR-102: Timestamped request signing (v2) — nonce store + TTL

create table if not exists public.api_signing_nonces (
  key_id     text not null,
  nonce      text not null,
  ts         timestamptz not null default now(),
  ip         text null,
  user_agent text null,
  primary key (key_id, nonce)
);

create index if not exists idx_api_signing_nonces_ts on public.api_signing_nonces(ts);

-- optional: keep 24h of nonces (more than enough for a 5–10 min drift window)
create extension if not exists pg_cron;
select cron.schedule('api_signing_nonces_ttl_daily', '15 3 * * *',
$$
  delete from public.api_signing_nonces
  where ts < now() - interval '1 day';
$$);
