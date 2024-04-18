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

module.exports.userValidation = yup.object({
  name: yup.string().required(),
  email: yup
    .string()
    .email()
    .matches(
      /@[a-z]+\.(com|in|org)$/,
      "Email must have a valid domain suffix .com , .in , .org"
    )
    .required(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(15, "Password must not exceed 15 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/\\]/,
      "Password must contain at least one special character"
    )
    .required(),
});
