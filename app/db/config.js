const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('-- DB ONLINE --');
  } catch (error) {
    console.log(error);
    throw new Error(
      'Error at moment to connect with the database'
    );
  }
};

module.exports = {
  dbConnection,
};
