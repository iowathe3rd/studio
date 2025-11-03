insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', false)
on conflict (id) do nothing;

create policy "Authenticated users can upload to uploads bucket"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'uploads'
  and auth.uid() = owner
);

create policy "Authenticated users can read their uploads"
on storage.objects for select
to authenticated
using (
  bucket_id = 'uploads'
  and auth.uid() = owner
);

create policy "Authenticated users can delete their uploads"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'uploads'
  and auth.uid() = owner
);
