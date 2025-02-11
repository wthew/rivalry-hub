// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient, SupabaseClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const { users } = await req.json();

  const size = users?.length || 0;

  if (size <= 1)
    return new Response(null, {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });

  const matches = [];
  for (const id_a of users) {
    for (const id_b of users) {
      if (id_a === id_b) continue;

      const exists = matches.find(
        (ids) => ids.includes(id_a) && ids.includes(id_b)
      );

      if (exists) continue;

      matches.push([id_a, id_b]);
    }
  }

  return new Response(JSON.stringify(matches), {
    headers: { "Content-Type": "application/json" },
  });
});
