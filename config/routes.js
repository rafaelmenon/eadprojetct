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
    .post(app.api.enrollment.save)
    .get(app.api.enrollment.get);

  app
    .route("/registrations/:id")
    .all(app.config.passport.authenticate())
    .put(app.api.enrollment.save)
    .delete(app.api.enrollment.remove)
    .get(app.api.enrollment.get);

  app
    .route("/registrations/:myCourses/myCourses")
    .all(app.config.passport.authenticate())
    .get(app.api.enrollment.getMyCourses);
};