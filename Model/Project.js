const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  createdDate: {
    type: Date,
  },
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

//if the project is deleting all the todo in the project will be deleted
projectSchema.post("findOneAndDelete", async function (project) {
  const todo = require("./Todo");
  if (project.todos.length) {
    await todo.deleteMany({ _id: { $in: project.todos } });
  }
});

module.exports = mongoose.model("Project", projectSchema);
