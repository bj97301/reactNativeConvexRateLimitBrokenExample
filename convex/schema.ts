import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  counter: defineTable({
    value: v.number(),
    lastIncrementTime: v.optional(v.number()),
  }),
});
