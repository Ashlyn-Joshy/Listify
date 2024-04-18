const yup = require("yup");

module.exports.projectValidation = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  createdDate: yup.date().default(() => new Date()),
});

module.exports.todoValidation = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  createdDate: yup.date().default(() => new Date()),
  status: yup.boolean().default(() => false),
});
