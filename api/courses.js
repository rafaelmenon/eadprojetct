module.exports = (app) => {
    const { existsOrError } = app.api.validation;
  
    const save = async (req, res) => {
      const course = { ...req.body };
  
      if (req.params.id) course.id = req.params.id;
  
      try {
        existsOrError(course.name, "Informe o nome do curso");
        existsOrError(course.teacher, "Informe o professor do curso");
      } catch (msg) {
        res.status(400).send(msg);
      }
  
      if (course.id) {
        app
          .db("courses")
          .update(course)
          .where({ id: course.id })
          .then((_) => res.status(200).send("Curso atualizado com sucesso"))
          .catch((err) => res.status(500).send(err));
      } else {
        app
          .db("courses")
          .insert(course)
          .then((_) => res.status(200).send("Curso criado com sucesso"))
          .catch((err) => res.status(500).send(err));
      }
    };
  
    const remove = async (req, res) => {
      try {
        const rowsDeleted = await app
          .db("courses")
          .where({ id: req.params.id })
          .del();
  
        try {
          existsOrError(rowsDeleted, "Curso não encontrado");
        } catch (msg) {
          return res.status(400).send(msg);
        }
  
        res.status(200).send("Deletado com sucesso");
      } catch (msg) {
        res.status(500).send(msg);
      }
    };
  
    const get = (req, res) => {
      if (req.params.id) {
        app
          .db("courses")
          .select("*")
          .where({ id: req.params.id })
          .then((courses) => res.json(courses))
          .catch((err) => res.status(500).send(err));
      } else {
        app
          .db("courses")
          .select("*")
          .then((courses) => res.json(courses))
          .catch((err) => res.status(500).send(err));
      }
    };
  
    return { save, remove, get };
  };