"use strict"

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

module.exports = {
    create: async (ctx) => {
        const {
            address,
            city,
            state,
            amount,
            dishes,
            stripe_token,
            payment,
        } = JSON.parse(ctx.request.body)

        // transform to cents
        const stripeAmount = Math.floor(amount * 100)

        // charge on stripe
        const charge = await stripe.charges.create({
            amount: stripeAmount,
            currency: "usd",
            description: `Order ${new Date()} by ${ctx.state.user.id}`,
            source: stripe_token,
        })

        // register the order in database
        return await strapi.services.order.create({
            user_id: ctx.state.user.id,
            stripe_token,
            payment,
            amount: stripeAmount/100,
            address,
            dishes,
            city,
            state,
        })
    },
}
