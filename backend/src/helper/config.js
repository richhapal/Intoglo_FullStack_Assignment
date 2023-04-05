module.exports = {
     env: process.env.NODE_ENV,
     port: process.env.PORT,
     // Set mongoose configuration
     mongoose: {
          url: process.env.MONGODB_URL,
          options: {
               useCreateIndex: true,
               useNewUrlParser: true,
               useUnifiedTopology: true,
          },
     },
     jwt: {
          secret: process.env.JWT_SECRET,
          accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
     },
};
