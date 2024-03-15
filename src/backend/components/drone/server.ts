import express from "express";
import router from "./api";
const app = express();
const port = 3005;

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
