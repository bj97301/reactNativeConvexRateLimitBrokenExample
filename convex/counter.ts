import { mutation, query } from "./_generated/server";

// Query to get the current counter value
export const get = query({
  args: {},
  handler: async (ctx) => {
    const counter = await ctx.db.query("counter").first();

    return counter?.value ?? 0;
  },
});

// Mutation to increment the counter
export const increment = mutation({
  args: {},
  handler: async (ctx) => {
    const counter = await ctx.db.query("counter").first();

    if (counter) {
      await ctx.db.patch(counter._id, { value: counter.value + 1 });
      return counter.value + 1;
    } else {
      const id = await ctx.db.insert("counter", { value: 1 });
      return 1;
    }
  },
});
