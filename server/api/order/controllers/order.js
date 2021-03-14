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
            token,
        } = JSON.parse(ctx.request.body)

        // transform to cents
        const stripeAmount = Math.floor(amount * 100)

        // charge on stripe
        const charge = await stripe.charges.create({
            amount: stripeAmount,
            currency: "usd",
            description: `Order ${new Date()} by ${ctx.state.user.id}`,
            source: token,
        })

        // register the order in database
        return await strapi.services.order.create({
            user: ctx.state.user.id,
            charge_id: charge.id,
            amount: stripeAmount,
            address,
            dishes,
            city,
            state,
        })
    },
}
