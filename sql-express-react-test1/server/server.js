const express = require("express")
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(express.json());
app.use(cors());



app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`)
})