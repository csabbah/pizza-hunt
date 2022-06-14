const { Schema, model } = require('mongoose');

const PizzaSchema = new Schema({
  pizzaName: {
    type: String, // Rather than using 'data.STRING', we can use regular
    // JavaScript data types like String, Booleans, numbers and so on...
  },
  createdBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // If no value is provided in the createdAt field, specify a default value
  },
  size: {
    type: String,
    default: 'Large',
  },
  toppings: [],
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;
