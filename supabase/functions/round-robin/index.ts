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

  const pairs = [];
  for (const id_a of users) {
    for (const id_b of users) {
      if (id_a === id_b) continue;

      const exists = pairs.find(
        (ids) => ids.includes(id_a) && ids.includes(id_b)
      );

      if (exists) continue;

      pairs.push([id_a, id_b]);
    }
  }

  const grouped = generateGroups(pairs, users);

  return new Response(JSON.stringify(grouped), {
    headers: { "Content-Type": "application/json" },
  });
});

function generateGroups(pairs, userIds) {
  const rounds = userIds.length - 1;
  const grouped = [];

  let currentPairs = [...pairs];
  for (let round = 0; round < rounds; round++) {
    const used = new Set();
    let group = [];
    let nextPairs = [];

    for (let [a, b] of currentPairs) {
      if (!used.has(a) && !used.has(b)) {
        group.push([a, b]);
        used.add(a);
        used.add(b);
      } else {
        nextPairs.push([a, b]);
      }
    }

    grouped.push(group);
    currentPairs = nextPairs;
  }

  return grouped;
}
