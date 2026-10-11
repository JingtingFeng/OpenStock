import { Schema, model, models, type Document, type Model } from 'mongoose';

export const DEFAULT_WATCHLIST_GROUP = 'Undefined';

export interface WatchlistGroupItem extends Document {
    userId: string;
    name: string;
    order: number;
    isDefault: boolean;
}

const WatchlistGroupSchema = new Schema<WatchlistGroupItem>(
    {
        userId: { type: String, required: true, index: true },
        name: { type: String, required: true, trim: true },
        order: { type: Number, required: true, min: 0, default: 0 },
        isDefault: { type: Boolean, required: true, default: false },
    },
    { timestamps: true }
);

// Prevent duplicate group names per user
WatchlistGroupSchema.index({ userId: 1, name: 1 }, { unique: true });
// Prevent duplicate default group per user
WatchlistGroupSchema.index(
    { userId: 1, isDefault: 1 },
    { unique: true, partialFilterExpression: {  isDefault: true } }
);

export const WatchlistGroup: Model<WatchlistGroupItem> =
    (models?.WatchlistGroup as Model<WatchlistGroupItem>) ||
    model<WatchlistGroupItem>('WatchlistGroup', WatchlistGroupSchema);
