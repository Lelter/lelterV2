const isPro = Object.is(process.env.NODE_ENV, 'production')

console.log(isPro);

module.exports = {
  baseUrl: isPro ? 'https://graph.bwequation.com/api/v1' : 'api/'
}
