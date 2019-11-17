function formatINR(stripeAmount) {
    return `INR ${(stripeAmount / 100).toFixed(2)}`;
}

function formatStripeAmount(INRString) {
    return parseFloat(INRString) * 100;
}

module.exports = {
    formatINR,
    formatStripeAmount
};
