const express = require("express");
const bodyParser = require("body-parser");
const logger = require("./utilities/logger");
const productRouter = require("./router/router");
const app = express();
const port = process.env.PORT || 3002;


require("./config/mongoose")(app);

app.use(bodyParser.json());
app.use("/catalog", productRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    logger.info(`Listening on port ${port}`);
});
 