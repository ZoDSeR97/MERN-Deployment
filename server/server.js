require('dotenv').config();
require("./config/mongoose.config");
const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json(), express.urlencoded({ extended: true }));
require("./routes/store.routes")(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));