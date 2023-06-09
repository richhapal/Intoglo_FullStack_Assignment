require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const config = require("./src/helper/config");

mongoose
     .connect(config.mongoose.url)
     .then(() => {
          console.log("Mongoose has been connected", config.mongoose.url);
     })
     .catch((error) => {
          console.log(error);
     });

app.listen(config.port, () => {
     console.log("Server is running on port", config.port);
});
