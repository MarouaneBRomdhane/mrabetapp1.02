const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://slasheu1992:qpQzBri2YqMDh79k@cluster0.vnaqye9.mongodb.net/mrabet_app?retryWrites=true&w=majority"
    );
    console.log("Database is connected");
  } catch (error) {
    if (error) throw error;
  }
};

module.exports = ConnectDB;
