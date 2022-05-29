const mongoose = require("mongoose");
const connect = () => {
  return mongoose.connect(
    "mongodb+srv://user-123:user-123@cluster0.04bia.mongodb.net/test"
  );
};
module.exports = connect;
