const { getUserByStripeId } = require('../services/user');
const { sendProMemberConfirmationMail } = require('../controllers/email');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

exports.initPayment = async (req, res) => {
    try {
        if (req.user.isPro || req.user.isAdmin) {
            return res.status(400).json({ message: 'you\'re already a pro member' });
        }
        const session = await stripe.checkout.sessions.create({
            customer: req.user.stripeId,
            payment_method_types: ['card'],
            line_items: [{
                name: 'pro membership',
                description: 'with this membership, can access to source code of all my showcased projects!',
                // images: ['https://example.com/t-shirt.png'],
                amount: 50 * 100,   //  rs. 50
                currency: 'inr',
                quantity: 1,
            }],
            success_url: `${process.env.HOST}/api/payment/success`,
            cancel_url: `${process.env.HOST}/api/payment/cancel`,
        });
        res.json({
            url: session.url
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

exports.handlePayment = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event = req.body;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        // Handle the event
        switch (event.type) {
            case 'charge.succeeded':
                const { customer } = event.data.object
                console.log('💰 payment succeeded');
                //  now make user a pro member
                const user = await getUserByStripeId(customer);
                user.isPro = true;
                await user.save();
                //  send congratulations email to user
                sendProMemberConfirmationMail(user.email);
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
                return res.status(400).send(`Unhandled event type ${event.type}`);
        }
    
        // Return a response to acknowledge receipt of the event
        res.json({received: true});
    }
    catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
}
