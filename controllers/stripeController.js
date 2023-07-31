/* const config = require('../utils/config');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



const checkout = async (req,res) => {
    try {
        const { amount } = req.body;

    // Create a PaymentIntent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    // Send the client secret back to the frontend
    res.json({ clientSecret: paymentIntent.client_secret });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error)
       
        
    }
}

module.exports = {checkout}; */