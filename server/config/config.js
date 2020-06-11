module.exports = {
  development: {
    dialect: "mysql",
    //storage: "./db.development.sqlite"
  },
  test: {
    dialect: "mysql",
    //storage: ":memory:"
  },
  production: {
    username: "b3e0e3b0752e09",
    password: "9924dd67",
    database: "heroku_abc0aac4411dfff",
    host: "us-cdbr-east-05.cleardb.net",
    dialect: "mysql",
    use_env_variable: false,
  },

  // production: {
  //   username: "root",
  //   password: "123456",
  //   database: "thegymcr",
  //   host: "localhost",
  //   dialect: "mysql",
  //   use_env_variable: false,
  // },

  // mysql://b3e0e3b0752e09:9924dd67@us-cdbr-east-05.cleardb.net/heroku_abc0aac4411dfff?reconnect=true
};
