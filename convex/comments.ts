import {mutation , query} from "./_generated/server";
import { v } from "convex/values";

export const addComment = mutation({
    args : {
        interviewId : v.id("interviews"),
        content : v.string(),
        rating : v.number(),
    },

    handler : async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) throw new Error("No identity found");

        return await ctx.db.insert("comments", {
            interviewId : args.interviewId,
            content : args.content,
            rating : args.rating,
            interviewerId : identity.subject,
        });
    },
});

//get all comments for an interview

export const getComments = query({
    args : {
        interviewId : v.id("interviews"),
    },

    handler : async (ctx, args) => {
        return await ctx.db.query("comments")
        .filter(q => q.eq(q.field("interviewId"), args.interviewId))
        .collect();
    },
});