const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String, // Rather than using 'data.STRING', we can use regular
      // JavaScript data types like String, Booleans, numbers and so on...
      required: true, // pizzaName is required
      // We can als specify a specific message like so: required: 'You need to provide a pizza name!',
      trim: true, // Acts like regular JS, removes white spaces
    },
    createdBy: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: String,
      required: true,
      // enum ensures that the below options must be chosen for this data to be valid otherwise, reject it
      enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
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
// Using the reduce method, we tally up the total of every comment with its replies
PizzaSchema.virtual('commentCount').get(function () {
  return this.comments.reduce(
    (total, comment) => total + comment.replies.length + 1,
    0
  );
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;
