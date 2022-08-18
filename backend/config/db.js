import { Sequelize } from "sequelize";

const db = new Sequelize("mern-search-pagination", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
