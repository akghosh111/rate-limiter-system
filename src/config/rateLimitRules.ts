export const rateLimitRules = {
  default: {
    limit: 100,
    windowMs: 60000
  },

  login: {
    limit: 5,
    windowMs: 60000
  }
};