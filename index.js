import express from "express";
import bodyParser from "body-parser";
import sequelize from "./config/database.js";
import router from "./routes/routes.js";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synced successfully.");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

const port = 8080;
app.listen(port, () => {
  console.log(`Server is Up & Running on port ${port}`);
});
