const faunadb = require("faunadb");
const Joi = require("joi");
const q = faunadb.query;

const db = new faunadb.Client({
  secret: process.env.FAUNA_DB,
  keepAlive: true
});

const contactDataSchema = Joi.object({
  lead_name: Joi.string()
    .min(2)
    .max(40)
    .required(),
  lead_phone: Joi.string()
    .min(8)
    .max(13)
    .required()
});

const saveContactOnDB = data =>
  db.query(
    q.Create(q.Collection("contacts"), {
      data: data
    })
  );

export default (req, res) => {
  if (!(req.method === "POST")) {
    return res.status(405).send(`method ${req.method} not allowed!`);
  }

  const contactData = req.body;

  const { error } = contactDataSchema.validate(contactData);

  if (error) {
    return res.status(400).send(error.details);
  }

  saveContactOnDB(JSON.parse(contactData))
    .then(({ ref }) => res.json({ id: ref.id }))
    .catch(err => {
      console.log("error on save db contact", err);
      res.status(400).json({ err: true });
    });
};
