const express = require("express");
const app = express();
const User = require("./db/User");
const Product = require("./db/Product");
const jwt = require("jsonwebtoken");
const jwtSecret = "e-comm";
const cors = require("cors");
const crypto = require("crypto");
const validator = require("validator");
require("./db/config");

app.use(express.json());
app.use(cors());

// << Middleware >>

function hashNSalt(password) {
  const salt = crypto.randomBytes(16).toString("base64");
  const iterations = 10000;
  const hash = crypto
    .pbkdf2Sync(password, salt, iterations, 128, "sha256")
    .toString("base64");
  return {
    salt: salt,
    hash: hash,
    iterations: iterations,
  };
}

function verifyPassword(savedHash, savedSalt, savedIterations, password) {
  return (
    savedHash ==
    crypto
      .pbkdf2Sync(password, savedSalt, savedIterations, 128, "sha256")
      .toString("base64")
  );
}

function verifyToken(req, resp, next) {
  let token = req.headers.authorization;
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, jwtSecret, (err, valid) => {
      if (err) {
        resp.status(401).json({
          message: "Invalid token",
        });
      } else {
        next();
      }
    });
  } else {
    resp.status(401).json({
      message: "No token provided",
    });
  }
}

function verifyNameEmailPassValidity(name, email, pass) {
  if (name.length>2 && validator.isEmail(email) && validator.isStrongPassword(pass)) {
    return true;
  }
  return false;
}

// << Routes >>

app.post("/signup", async (req, resp) => {
  let user = new User(req.body);
  if (verifyNameEmailPassValidity(user.name, user.email, user.password) == false) {
    return resp.status(400).json({ message: "Invalid name, email or password" });
  }
  const hashedPassword = hashNSalt(user.password);
  user.password = hashedPassword;
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  jwt.sign({ result }, jwtSecret, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      return resp.status(401).json({ message: "Error in generating token" });
    }
    return resp.send({ result, auth: token });
  });
});

app.post("/login", async (req, resp) => {
  console.log(req.body);
  if (req.body.email && req.body.password) {
    let user = await User.findOne({ email: req.body.email });
    if(!user){
      return resp.send({message: "Username or password incorrect!"});
    }
    let dotheymatch = verifyPassword(
      user.password.hash,
      user.password.salt,
      user.password.iterations,
      req.body.password
    );
    if (user && dotheymatch) {
      jwt.sign({ user }, jwtSecret, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          return resp.send({ message: "Error in generating token" });

        }
        return resp.send({ user, auth: token });
      });
    } else {
      return resp.send({ message: "Incorrect email or password" });
    }
  } else {
    return resp.send({message: "Please enter email and password" });
  }
});

app.post("/addproduct", verifyToken, async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get("/products/:id", verifyToken, async (req, resp) => {
  let products = await Product.find({ userID: req.params.id });
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({message: "No products found"});
  }
});

app.delete("/product/:id", verifyToken, async (req, resp) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get("/product/:id", verifyToken, async (req, resp) => {
  let product = await Product.findOne({ _id: req.params.id });
  if (product) {
    resp.send(product);
  } else {
    resp.send({message: "No product found"});
  }
});

app.put("/product/:id", verifyToken, async (req, resp) => {
  let product = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(product);
});

app.get("/search/:key", verifyToken, async (req, resp) => {
  let products = await Product.find({
    $or: [
      { name: { $regex: req.params.key, $options: "i" } },
      { category: { $regex: req.params.key, $options: "i" } },
      { company: { $regex: req.params.key, $options: "i" } },
    ],
  });
  resp.send(products);
});

app.get("/profile/updateemail/:id", verifyToken, async (req, resp) => {
  let user = await User.findOne({ _id: req.params.id }).select("email");
  if (user) {
    resp.send(user);
  } else {
    resp.send({message: "No user found"});
  }
});

app.put("/profile/updateemail/:id", verifyToken, async (req, resp) => {
  let user = await User.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(user);
});

app.put("/profile/updatepassword/:id", verifyToken, async (req, resp) => {
  let safePassword = hashNSalt(req.body.password);
  let user = await User.updateOne(
    { _id: req.params.id },
    { $set: { password: safePassword }}
  );
  resp.send(user);
});


app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
