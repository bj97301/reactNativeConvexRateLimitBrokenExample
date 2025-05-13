import { MINUTE, RateLimiter } from "@convex-dev/rate-limiter";
import { components } from "./_generated/api";
import { mutation, query } from "./_generated/server";

// Initialize rate limiter with 5 requests per 30 seconds
const rateLimiter = new RateLimiter(components.rateLimiter, {
  increment: {
    kind: "token bucket",
    rate: 5,
    period: MINUTE,
    capacity: 5,
  },
});

// Query to get the current counter value
export const get = query({
  args: {},
  handler: async (ctx) => {
    const counter = await ctx.db.query("counter").first();
    return counter?.value ?? 0;
  },
});

// Mutation to increment the counter with rate limiting
export const increment = mutation({
  args: {},
  handler: async (ctx) => {
    // Check rate limit
    const status = await rateLimiter.limit(ctx, "increment", {
      // throws: true,
    });
    console.log("status: 1111111111111111111111111111111111: " + status.ok);
    if (!status.ok) {
      throw new Error(
        `Rate limit exceeded. Try again in ${Math.ceil(status.retryAfter / 1000)} seconds`
      );
    }

    const counter = await ctx.db.query("counter").first();
    if (counter === null) {
      const id = await ctx.db.insert("counter", { value: 1 });
      return 1;
    }
    await ctx.db.patch(counter._id, { value: counter.value + 1 });
    return counter.value + 1;
  },
});
