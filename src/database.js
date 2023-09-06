import { connect } from "mongoose";
connect("mongodb://localhost/simplejwt", {
  useNewUrlParser: true,
}).then((db) => console.log("Database is connected"));
