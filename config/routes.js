module.exports = (app) => {
  app.post("/sessions", app.api.auth.signin);
  app.post("/validateToken", app.api.auth.validateToken);
  app.post("/register", app.api.users.save);

  app
    .route("/users")
    .all(app.config.passport.authenticate())
    .get(app.api.users.get);

  app
    .route("/users/:id")
    .all(app.config.passport.authenticate())
    .put(app.api.users.updateUser)
    .delete(app.api.users.remove)
    .get(app.api.users.getById);
};