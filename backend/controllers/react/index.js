const serveApp = (req, res) => {
  // res.send({ serveApp: "serve app" });
  res.sendFile(path.resolve("/public/react/index.html"));
};

module.exports = { serveApp };
