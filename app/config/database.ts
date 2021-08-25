module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    url: process.env.DATABASE_URL
  },
  test: {
    use_env_variable: 'DATABASE_URL',
    url: process.env.DATABASE_URL
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    url: process.env.DATABASE_URL
  }
}
