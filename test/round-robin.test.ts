import * as jest from "@jest/globals";
import { createClient } from "@supabase/supabase-js";

const getEnv = (key: string) => process.env[key];

const url = getEnv("EXPO_PUBLIC_SUPABASE_URL");
const key = getEnv("EXPO_PUBLIC_SUPABASE_ANON_KEY");

console.log('\n\n\n\ntest env:', {url, key})
// const client = createClient(url!, key!);

// jest.describe("Round Robin Generation", () => {
//   jest.beforeAll(() => {
//     jest.expect(url).toBeDefined();
//     jest.expect(key).toBeDefined();

//     jest.expect(client).toBeDefined();
//   });

//   jest.test("if no users sent, must return 400 status code error", async () => {
//     const res = await client.functions.invoke("round-robin", {
//       body: { users: [] },
//     });

//     jest.expect(res.error.context.status).toEqual(400);
//   });

//   jest.test(
//     "if only one users sent, must return 400 status code error",
//     async () => {
//       const res = await client.functions.invoke("round-robin", {
//         body: { users: ["mocked_user_id"] },
//       });

//       jest.expect(res.error.context.status).toEqual(400);
//     }
//   );

//   jest.test(
//     "if more than one users, must return a valid round-robin match list",
//     async () => {
//       const users = Array.from({ length: 8 }).map((_, idx) => `${idx}`);

//       const { data } = await client.functions.invoke("round-robin", {
//         body: { users },
//       });

//       for (const group of data as [string, string][][]) {
//         const counts = group.flat().reduce(function (acc, curr) {
//           return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
//         }, {} as Record<string, number>);

//         for (const user of users) {
//           jest.expect(counts[user]).toEqual(1);
//         }
//       }
//     }
//   );
// });
