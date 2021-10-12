const app = require("./index");

const connect = require("./configs/db")

app.listen(2020, async () => {

    await connect();
    console.log("Hello");
})