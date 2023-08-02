const express = require("express");
const stripeRouter = express.Router();
const bodyParser = require("body-parser");
require("dotenv").config();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const { addItemToCart, getCustomerCart } = require("../controllers/cartController"); // Modify the path to your shopping cart code

stripeRouter.use(express.static("public"));
stripeRouter.use(bodyParser.json());




async function createStripePrice(productID, price, currency) {
  try {
    const priceObj = await stripe.prices.create({
      unit_amount: price*100, // Provide the price amount in the smallest currency unit (e.g., cents for USD)
      currency: currency, // The currency code (e.g., 'usd')
      product: productID, // Use the Product ID obtained from the createStripeProduct function
      // You can add more options to the Price object if needed
    });
    return priceObj.id; // Return the ID of the created Price object
  } catch (error) {
    console.error('Error creating Price object:', error);
    throw error;
  }
}

async function createStripeProduct(name, description) {
  try {
    const product = await stripe.products.create({
      name: name,
      description:description,
      // You can add more options to the Product object if needed
    });
    return product.id; // Return the ID of the created Product object
  } catch (error) {
    console.error('Error creating Product object:', error);
    throw error;
  }
}

stripeRouter.post(
    "/checkout/create-checkout-session",
    async (req, res, next) => {
      try {
        // Get the customer's cart items and their quantities
    const cartItems = req.body.shoppingCart?.cart?.items;

    // Create an array of line items for Stripe Checkout
    const lineItems = [];
    for (const item of cartItems) {
      const productID = await createStripeProduct(item.name);
      const priceID = await createStripePrice(productID, item.price, 'usd');
      lineItems.push({
        price: priceID,
        quantity: item.quantity,
      });
    }

    if (lineItems.length === 0) {
      // Handle empty cart here (send an error response or redirect to cart page)
      return res.status(400).json({ error: "The shopping cart is empty." });
      
    }
    
  
        // Create the Stripe Checkout session with the cart items
        const session = await stripe.checkout.sessions.create({
          billing_address_collection: "auto",
          shipping_address_collection: {
            allowed_countries: ["DE", "US"],
          },
          line_items : lineItems,
          
          
          mode: "payment",
          success_url: `${"http://localhost:5174/successpayment"}?success=true`,
          cancel_url: `${"http://localhost:5174/failed"}?canceled=true`,
        });
       res.json({url: session.url}) 
       // res.redirect( session.url);
        console.log(session.url)
      } catch (error) {
        console.log(error)
        // Pass the error to the error handling middleware
        next(error);
        
      //  console.log(req.body.shoppingList.cart._id);
      //  console.log(req.body.shoppingCart.cart)
   //   console.log(req.body.shoppingCart.cart?.items[0].quantity)
        
      
      }
    }
  );

  stripeRouter.get("/checkout/create-checkout-session", 
  async (req, res, next) => {
    try {
      const paymentIntents = await stripe.paymentIntents.list({
        limit: 100, // You can adjust the limit to the number of payments you want to retrieve
      });

      // Send the payment intents as a response
      res.json({ paymentIntents });
    } catch (error) {
      // Pass the error to the error handling middleware
      next(error);
    }
  });

  

// Error handling middleware for general errors
stripeRouter.use((error, req, res, next) => {
  res.status(500).json({ error: "Something went wrong." });
  
});

// Error handling middleware for Stripe-related errors
stripeRouter.use((error, req, res, next) => {
  if (error.type === "StripeCardError") {
    // Handle Stripe card errors
    res.status(400).json({ error: error.message });
  } else if (error.type === "StripeInvalidRequestError") {
    // Handle invalid request errors
    res.status(400).json({ error: error.message });
  } else if (error.type === "StripeAPIError") {
    // Handle API errors
    res.status(500).json({ error: "Stripe API error." });
  } else {
    // Handle other types of errors
    res.status(500).json({ error: "Something went wrong with the payment." });
  }
});



module.exports = stripeRouter;
