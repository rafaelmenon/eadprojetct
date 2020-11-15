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

  app
    .route("/courses")
    .all(app.config.passport.authenticate())
    .get(app.api.courses.get)
    .post(app.api.courses.save);

  app
    .route("/course/:id")
    .all(app.config.passport.authenticate())
    .get(app.api.courses.get)
    .put(app.api.courses.save)
    .delete(app.api.courses.remove);

  app
    .route("/registrations")
    .all(app.config.passport.authenticate())
    .post(app.api.registrations.save)
    .get(app.api.registrations.get);

  app
    .route("/registrations/:id")
    .all(app.config.passport.authenticate())
    .put(app.api.registrations.save)
    .delete(app.api.registrations.remove)
    .get(app.api.registrations.get);

  app
    .route("/registrations/:myCourses/myCourses")
    .all(app.config.passport.authenticate())
    .get(app.api.registrations.getMyCourses);
};