-- 物件テーブルを作成する
-- 物件名・家賃・エリア名・間取りと、登録したユーザーのIDを保持する
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null,
  rent integer not null check (rent >= 0),
  area text not null,
  layout text not null,
  created_at timestamptz not null default now()
);

-- RLS（行レベルセキュリティ）を有効化する
alter table public.properties enable row level security;

-- 自分が登録した物件のみ閲覧できる
create policy "properties_select_own" on public.properties
  for select
  to authenticated
  using ( (select auth.uid()) = user_id );

-- 自分のユーザーIDでのみ物件を登録できる
create policy "properties_insert_own" on public.properties
  for insert
  to authenticated
  with check ( (select auth.uid()) = user_id );

-- 自分が登録した物件のみ更新できる（user_idの書き換えも禁止する）
create policy "properties_update_own" on public.properties
  for update
  to authenticated
  using ( (select auth.uid()) = user_id )
  with check ( (select auth.uid()) = user_id );

-- 自分が登録した物件のみ削除できる
create policy "properties_delete_own" on public.properties
  for delete
  to authenticated
  using ( (select auth.uid()) = user_id );
