# Admin Auth Setup

Task 6 protects admin pages with Supabase Auth and `profiles.role = 'ADMIN'`.

## One-Time Admin User Setup

1. Open the Supabase Dashboard.
2. Go to Authentication, then Users.
3. Create the admin user with email and password.
4. Copy the created user's UUID.
5. Run this SQL in Supabase SQL Editor, replacing the placeholders:

```sql
insert into public.profiles (id, full_name, role)
values (
  'PASTE_AUTH_USER_UUID_HERE',
  'Saeed',
  'ADMIN'
)
on conflict (id) do update
set
  full_name = excluded.full_name,
  role = excluded.role,
  updated_at = now();
```

Only users with a matching `profiles` row and `role = 'ADMIN'` can access `/admin/dashboard` and other admin pages.

## Important

- Do not add a Supabase service-role key to browser code.
- Do not use editable user metadata for admin authorization.
- The login form uses email/password Supabase Auth.
- The server guard checks `supabase.auth.getUser()` and then checks the `profiles` table.
