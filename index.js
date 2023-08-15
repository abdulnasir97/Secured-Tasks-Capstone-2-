require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const cookieParser = require("cookie-parser");
const { serialize } = require("cookie");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const frontdomain = process.env.FRONTEND_ORIGIN;

// Our middleare.
app.use(
  cors({
    origin:
      process.env.NODE_ENV == "development"
        ? "http://localhost:3000"
        : process.env.FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Our routes will be created below.

function Auth(req, res, next) {
  try {
    // get the token from the cookie
    const token = req.cookies.token;

    // if we don't have a token then we return false
    if (!token) {
      return res.json({
        error: "The user is not authenticated.",
      });
    }

    // verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "key", {
      expiresIn: "30d",
    });
    const { user_email } = decodedToken;
    // if we have a valid token then we return true
    if (decodedToken && user_email) {
      req.user = user_email;
      next();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while verifying the user.",
      details: err.message,
    });
  }
}

// create a register route
app.post("/register", async (req, res) => {
  try {
    // destructure the req.body (name, email, password)
    const { name, email, password } = req.body;

    // check if user exists (if user exists then throw error)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).json({
        error: "A user with this email already exists.",
      });
    }

    // Bcrypt the user password

    // saltRounds adds 10 layers of hash

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const bcryptPassword = await bcrypt.hash(password, salt);
    // enter the new user inside our database
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    // generate  jwt token
    const token = jwt.sign(
      { user_email: newUser.rows[0].user_email },
      process.env.JWT_SECRET || "key",
      { expiresIn: "30d" }
    );
    // create a cookie uusing serialize
    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "development" ? false : true,
      sameSite: "none",
      maxAge: 3600 * 24 * 30,
      path: "/",

    });

    res.setHeader("Set-Cookie", cookie);

    res.json({
      message: "The user was created successfully.",
      // user: newUser.rows[0],
      user: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while creating the user.",
      details: err.message,
    });
  }
});

// create a login route
app.post("/login", async (req, res) => {
  try {
    // destructure the req.body (email, password)
    const { email, password } = req.body;

    // check if user exists (if user exists then throw error)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({
        error: "A user with this email does not exist.",
      });
    }

    // check if incoming password is the same as the database password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "The password is incorrect.",
      });
    }

    // generate our jwt token
    const token = jwt.sign(
      { user_email: user.rows[0].user_email },
      process.env.JWT_SECRET || "key",
      { expiresIn: "30d" }
    );
    // create a cookie uusing serialize
    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "development" ? false : true,
      sameSite: "none",
      maxAge: 3600 * 24 * 30,
      path: "/",

    });

    res.setHeader("Set-Cookie", cookie);

    res.json({
      message: "The user was logged in successfully.",
      user: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while logging in the user.",
      details: err.message,
    });
  }
});

// verify token route for the frontend
app.get("/verify", async (req, res) => {
  try {
    // get the token from the cookie
    const token = req.cookies.token;

    // if we don't have a token then we return false
    if (!token) {
      return res.status(401).json({
        error: "The user is not authenticated.",
      });
    }

    // verify the token
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET || "key", {
      expiresIn: "30d",
    });
    const { user_email } = decodeToken;
    // if we have a valid token then we return true
    if (
      decodeToken &&
      user_email &&
      typeof user_email === "string" &&
      user_email.length > 0
    ) {
      return res.status(200).json(true);
    } else {
      return res.status(401).json({
        error: "The user is not authenticated.",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while verifying the user.",
      details: err.message,
    });
  }
});

// logout route
app.get("/logout", async (req, res) => {
  try {
    // create a cookie uusing serialize
    const cookie = serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV == "development" ? false : true,
      sameSite: "none",
      maxAge: -1,
      path: "/",
    });

    res.setHeader("Set-Cookie", cookie);

    res.json({
      message: "The user was logged out successfully.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while logging out the user.",
      details: err.message,
    });
  }
});

// To CREATE a new todo.

app.post("/todo", Auth, async (req, res) => {
  try {
    const { description } = req.body;
    const user_email = req.user;

    const newTodo = await pool.query(
      "INSERT INTO todo (description, user_email) VALUES($1, $2) RETURNING *",
      [description, user_email]
    );

    res.json({
      message: "The todo was created successfully.",
      todo: newTodo.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while creating the todo.",
      details: err.message,
    });
  }
});

// To GET all todos.
app.get("/todo", Auth, async (req, res) => {
  try {
    const user_email = req.user;

    const allTodos = await pool.query(
      "SELECT * FROM todo WHERE user_email = $1",
      [user_email]
    );

    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// To GET a specific todo.

app.get("/todo/:id", Auth, async (req, res) => {
  try {
    const user_email = req.user;
    const { id } = req.params;

    const todo = await pool.query(
      "SELECT * FROM todo WHERE todo_id = $1 AND user_email = $2",
      [id, user_email]
    );

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//To UPDATE a todo.

app.put("/todo/:id", Auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const user_email = req.user;

    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2 AND user_email = $3 RETURNING *",
      [description, id, user_email]
    );

    res.json({
      message: "The todo was updated successfully.",
      todo: updateTodo.rows[0],
    });
  } catch (err) {
    console.error(err.message);
  }
});

// To DELETE a todo.

app.delete("/todo/:id", Auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user_email = req.user;

    const deleteTodo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1 AND user_email = $2 RETURNING *",
      [id, user_email]
    );

    res.json({
      message: "The todo was deleted successfully.",
      todo: deleteTodo.rows[0],
    });
  } catch (err) {
    console.error(err.message);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("The server is running on port " + port);
});
