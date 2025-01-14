import { InferSchemaType, Schema, model } from "mongoose";

const discussionPostSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    channel: {
      type: String,
    },
  },
  { timestamps: true },
);

type DiscussionPost = InferSchemaType<typeof discussionPostSchema>;

export default model<DiscussionPost>("DiscussionPost", discussionPostSchema);
