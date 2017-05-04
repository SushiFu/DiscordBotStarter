import mongoose from "../server/mongo";

export const ExampleSchema = new mongoose.Schema({
    example: {
        type: String,
        required: true,
        unique: true,
    }
}, {
        timestamps: {}
    });

/**
 * Virtuals fields
 */

/**
 * Pre-save hooks
 */

/**
 * Methods
 */

/**
 * Statics
 */
ExampleSchema.statics = {
    /**
     * Save Example 
     * @param {String} example - example
     * @returns {Promise}
     */
    create(example) {
        const obj = new this();
        obj.example = example;
        return obj.save();
    },
    /**
     * Get Example
     * @param {String} example - example
     */
    get(example) {
        return this.findOne({ example: example });
    },
    /**
     * Delete Example 
     * @param {String} example - example
     */
    delete(example) {
        return this.deleteOne({ example: example }).then(() => example);
    },
    /**
     * Get all Examples 
     * @returns {Promise}
     */
    all() {
        return this.find({});
    }
};

/**
 * @typedef Example
 */
export default mongoose.model("Example", ExampleSchema);
