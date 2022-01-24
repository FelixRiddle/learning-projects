const express = require("express");
const app = express();
const cors = require("cors");
const pgp = require("pg-promise");

// Config
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use("/api/users", require("./routes/user"));
app.use("/api/users", require("./routes/database/queries"));

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});
