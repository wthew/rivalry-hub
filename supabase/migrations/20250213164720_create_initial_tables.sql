
create table "public"."battles" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "created_by" uuid not null default gen_random_uuid(),
    "user_a" uuid not null default gen_random_uuid(),
    "user_b" uuid not null default gen_random_uuid(),
    "winner" uuid
);


alter table "public"."battles" enable row level security;

create table "public"."clans" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null
);


alter table "public"."clans" enable row level security;

create table "public"."profiles" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "nick" text not null,
    "clan" uuid not null
);


alter table "public"."profiles" enable row level security;

CREATE UNIQUE INDEX battles_pkey ON public.battles USING btree (id);

CREATE UNIQUE INDEX clans_pkey ON public.clans USING btree (id);

CREATE UNIQUE INDEX user_info_pkey ON public.profiles USING btree (id);

alter table "public"."battles" add constraint "battles_pkey" PRIMARY KEY using index "battles_pkey";

alter table "public"."clans" add constraint "clans_pkey" PRIMARY KEY using index "clans_pkey";

alter table "public"."profiles" add constraint "user_info_pkey" PRIMARY KEY using index "user_info_pkey";

alter table "public"."battles" add constraint "battles_created_by_fkey" FOREIGN KEY (created_by) REFERENCES profiles(id) not valid;

alter table "public"."battles" validate constraint "battles_created_by_fkey";

alter table "public"."battles" add constraint "battles_user_a_fkey" FOREIGN KEY (user_a) REFERENCES profiles(id) not valid;

alter table "public"."battles" validate constraint "battles_user_a_fkey";

alter table "public"."battles" add constraint "battles_user_b_fkey" FOREIGN KEY (user_b) REFERENCES profiles(id) not valid;

alter table "public"."battles" validate constraint "battles_user_b_fkey";

alter table "public"."battles" add constraint "battles_winner_fkey" FOREIGN KEY (winner) REFERENCES profiles(id) not valid;

alter table "public"."battles" validate constraint "battles_winner_fkey";

alter table "public"."profiles" add constraint "profiles_clan_fkey" FOREIGN KEY (clan) REFERENCES clans(id) not valid;

alter table "public"."profiles" validate constraint "profiles_clan_fkey";

alter table "public"."profiles" add constraint "user_info_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."profiles" validate constraint "user_info_id_fkey";

grant delete on table "public"."battles" to "anon";

grant insert on table "public"."battles" to "anon";

grant references on table "public"."battles" to "anon";

grant select on table "public"."battles" to "anon";

grant trigger on table "public"."battles" to "anon";

grant truncate on table "public"."battles" to "anon";

grant update on table "public"."battles" to "anon";

grant delete on table "public"."battles" to "authenticated";

grant insert on table "public"."battles" to "authenticated";

grant references on table "public"."battles" to "authenticated";

grant select on table "public"."battles" to "authenticated";

grant trigger on table "public"."battles" to "authenticated";

grant truncate on table "public"."battles" to "authenticated";

grant update on table "public"."battles" to "authenticated";

grant delete on table "public"."battles" to "service_role";

grant insert on table "public"."battles" to "service_role";

grant references on table "public"."battles" to "service_role";

grant select on table "public"."battles" to "service_role";

grant trigger on table "public"."battles" to "service_role";

grant truncate on table "public"."battles" to "service_role";

grant update on table "public"."battles" to "service_role";

grant delete on table "public"."clans" to "anon";

grant insert on table "public"."clans" to "anon";

grant references on table "public"."clans" to "anon";

grant select on table "public"."clans" to "anon";

grant trigger on table "public"."clans" to "anon";

grant truncate on table "public"."clans" to "anon";

grant update on table "public"."clans" to "anon";

grant delete on table "public"."clans" to "authenticated";

grant insert on table "public"."clans" to "authenticated";

grant references on table "public"."clans" to "authenticated";

grant select on table "public"."clans" to "authenticated";

grant trigger on table "public"."clans" to "authenticated";

grant truncate on table "public"."clans" to "authenticated";

grant update on table "public"."clans" to "authenticated";

grant delete on table "public"."clans" to "service_role";

grant insert on table "public"."clans" to "service_role";

grant references on table "public"."clans" to "service_role";

grant select on table "public"."clans" to "service_role";

grant trigger on table "public"."clans" to "service_role";

grant truncate on table "public"."clans" to "service_role";

grant update on table "public"."clans" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

create policy "Enable users to view their own data only"
on "public"."battles"
as permissive
for select
to authenticated
using (((( SELECT auth.uid() AS uid) = created_by) OR (( SELECT auth.uid() AS uid) = user_a) OR (( SELECT auth.uid() AS uid) = user_b)));


create policy "Enable read access for all users"
on "public"."profiles"
as permissive
for select
to public
using (true);
