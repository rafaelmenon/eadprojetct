module.exports = (app) => {
    const { existsOrError } = app.api.validation;
  
    const save = async (req, res) => {
      const registrations = { ...req.body };
      if (req.params.id) registrations.id = req.params.id;
  
      try {
        existsOrError(registrations.student, "Nessário informar o aluno");
        existsOrError(registrations.course, "Nessário infomar o curso");
      } catch (msg) {
        return res.status(400).send(msg);
      }
  
      if (registrations.id) {
        app
          .db("registrations")
          .update(registrations)
          .where({ id: registrations.id })
          .then((_) => res.status(204).send("Matricula atualizado com sucesso"))
          .catch((err) => res.status(500).send(err));
      } else {
        app
          .db("registrations")
          .insert(registrations)
          .then((_) => res.status(204).send("Matricula adicionada com sucesso"))
          .catch((err) => res.status(500).send(err));
      }
    };
  
    const remove = async (req, res) => {
      try {
        const rowsDeleted = await app
          .db("registrations")
          .where({ id: req.params.id })
          .del();
  
        try {
          existsOrError(rowsDeleted, "Matricula não foi encontrada");
        } catch (msg) {
          return res.status(400).send(msg);
        }
        res.status(204).send();
      } catch (msg) {
        res.status(500).send(msg);
      }
    };
  
    const get = (req, res) => {
      const registrations = { ...req.body };
      if (req.params.id) registrations.id = req.params.id;
  
      if (registrations.id) {
        app
          .db("registrations")
          .select("id", "student", "course")
          .where({ id: registrations.id })
          .then((registrations) => res.json(registrations))
          .catch((err) => res.status(500).send(err));
      } else {
        app
          .db("registrations")
          .select("id", "student", "course")
          .then((registrations) => res.json(registrations))
          .catch((err) => res.status(500).send(err));
      }
    };
  
    const getMyCourses = (req, res) => {
      const registrations = { ...req.body };
      if (req.params.myCourses) registrations.myCourses = req.params.myCourses;
  
      app
        .db("registrations")
        .select("id", "student", "course")
        .where({ student: registrations.myCourses })
        .then((registrations) => res.json(registrations))
        .catch((err) => res.status(500).send(err));
    };
  
    return { save, remove, get, getMyCourses };
  };