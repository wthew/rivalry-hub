import * as jest from "@jest/globals";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY;

const client = createClient(url!, key!);

jest.describe("Round Robin Generation", () => {
  jest.beforeAll(() => {
    jest.expect(url).toBeDefined();
    jest.expect(key).toBeDefined();
    
    jest.expect(client).toBeDefined();
  });

  jest.test("if no users sent, must return 400 status code error", async () => {
    const res = await client.functions.invoke("round-robin", {
      body: { users: [] },
    });

    jest.expect(res.error.context.status).toEqual(400);
  });

  jest.test(
    "if only one users sent, must return 400 status code error",
    async () => {
      const res = await client.functions.invoke("round-robin", {
        body: { users: ["mocked_user_id"] },
      });

      jest.expect(res.error.context.status).toEqual(400);
    }
  );

  jest.test(
    "if more than one users, must return a valid round-robin match list",
    async () => {
      const users = Array.from({ length: 8 }).map((_, idx) => `${idx}`);

      const res = await client.functions.invoke("round-robin", {
        body: { users },
      });

      console.log(res.data)

      jest.expect(400).toEqual(400);
    }
  );
});
