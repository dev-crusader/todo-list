require("dotenv").config();
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const server = jsonServer.create();
const router = jsonServer.router("src/services/list.json");
const middlewares = jsonServer.defaults();

const JWT_SECRET = process.env.JWT_SECRET || "my-secret-key-54325o235f4wf34";
const PORT = process.env.PORT || 8000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

const publicRoutes = ["/signup", "/login", "/reset-password", "/public"];

const isPublicRoute = (path) => {
  return publicRoutes.some((route) => path.startsWith(route));
};

const isResourceRoute = (path) => {
  return (
    path.startsWith("/") &&
    !path.startsWith("/signup") &&
    !path.startsWith("/login") &&
    !path.startsWith("/reset-password") &&
    !path.startsWith("/public")
  );
};

server.use((req, res, next) => {
  if (isPublicRoute(req.path) || req.method === "OPTIONS") {
    return next();
  }
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Access token required. Use format: Bearer <token>" });
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = {
      id: decoded.userId,
      username: decoded.username,
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    return res.status(401).json({ error: "Invalid token" });
  }
});

server.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const db = router.db;
    const users = db.get("users");

    const existingUser = users.find({ username }).value();
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = {
      id: Date.now().toString(),
      username,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(newUser).write();

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: newUser.id,
        username: newUser.username,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({
      user: userWithoutPassword,
      access_token: token,
      expiresIn: "24h",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

server.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const db = router.db;
    const user = db.get("users").find({ username }).value();

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    const { password: _, ...userWithoutPassword } = user;
    res.json({
      user: userWithoutPassword,
      access_token: token,
      expiresIn: "24h",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

server.get("/profile", (req, res) => {
  const db = router.db;
  const user = db.get("users").find({ id: req.user.id }).value();

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server running on port ${PORT}`);
  console.log("Public endpoints:");
  console.log("  POST /signup - Register new user");
  console.log("  POST /login    - Login user");
  console.log("Protected endpoints (require Authorization: Bearer <token>):");
  console.log("  GET  /profile  - Get current user profile");
  console.log("  * All other JSON Server endpoints (/todos, /users, etc.)");
});
