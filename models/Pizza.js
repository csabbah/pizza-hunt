const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String, // Rather than using 'data.STRING', we can use regular
      // JavaScript data types like String, Booleans, numbers and so on...
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    size: {
      type: String,
      default: 'Large',
    },
    toppings: [],
    comments: [
      {
        // We tell mongoose to expect an ObjectId
        type: Schema.Types.ObjectId,
        // And tell it where the data is coming from
        ref: 'Comment',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function () {
  return this.comments.length;
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;
