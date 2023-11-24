const { Schema, SchemaTypes } = require("mongoose");

const ReviewSchema = new Schema(
    {
        popup_store: {
            type: SchemaTypes.ObjectId,
            ref: "PopupStore",
        },
        user: {
            type: SchemaTypes.ObjectId,
            ref: "User",
        },
        name: {
            type: String,
        },
        text: {
            type: String,
            // required: true,
        },
        image: {
            type: SchemaTypes.ObjectId,
            ref: "Image",
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
        updated_at: {
            type: Date,
            default: null,
        },
        deleted_at: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = ReviewSchema;
