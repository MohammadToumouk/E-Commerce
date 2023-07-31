const express = require('express');
const stripeRouter = express.Router();
const bodyParser = require('body-parser');
require("dotenv").config();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
stripeRouter.use(express.static('public'));
stripeRouter.use(bodyParser.json());

stripeRouter.post('/checkout/create-checkout-session', async (req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: 'price_1NZE07KydIDbyPlEZw7VsCco',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${'http://localhost:5173/successpayment'}?success=true`,
            cancel_url: `${'http://localhost:5173/failed'}?canceled=true`,
        });

        res.redirect(303, session.url);
    } catch (error) {
        // Pass the error to the error handling middleware
        next(error);
    }
});

// Error handling middleware for general errors
stripeRouter.use((error, req, res, next) => {
    res.status(500).json({ error: 'Something went wrong.' });
});

// Error handling middleware for Stripe-related errors
stripeRouter.use((error, req, res, next) => {
    if (error.type === 'StripeCardError') {
        // Handle Stripe card errors
        res.status(400).json({ error: error.message });
    } else if (error.type === 'StripeInvalidRequestError') {
        // Handle invalid request errors
        res.status(400).json({ error: error.message });
    } else if (error.type === 'StripeAPIError') {
        // Handle API errors
        res.status(500).json({ error: 'Stripe API error.' });
    } else {
        // Handle other types of errors
        res.status(500).json({ error: 'Something went wrong with the payment.' });
    }
});

module.exports = stripeRouter;
