const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//get all customers with pagination, sorting, and searching
app.get("/customers", async (req, res) => {
  try {
    const { page = 1, sortBy = "sno", searchTerm = "" } = req.query;
    const limit = 20;
    const offset = (page - 1) * limit;
    console.log(sortBy);
    // Construct SQL query based on sortBy and search Term
    let queryText = `SELECT * FROM customers WHERE customer_name ILIKE $1 OR location ILIKE $1`;
    let queryParams = [`%${searchTerm}%`];
    console.log(Object.is(sortBy, null));
    if (Object.is(sortBy, null)) {
      switch (sortBy) {
        case "date":
          queryText += ` ORDER BY created_at OFFSET $2 LIMIT $3`;
          queryParams.push(offset, limit);
          console.log(queryParams);
          break;
        case "time":
          queryText += ` ORDER BY created_at::time OFFSET $2 LIMIT $3`;
          queryParams.push(offset, limit);
          break;
        default:
          queryText += ` ORDER BY sno OFFSET $2 LIMIT $3`;
          queryParams.push(offset, limit);
      }
    }
    const allCustomers = await pool.query(queryText, queryParams);
    res.json(allCustomers.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
