//jshint esversion:6

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const PORT = process.env.PORT || 3000;

const app = express();
mongoose.connect("mongodb+srv://hk22:harshaD1506@cluster0.otgg2e5.mongodb.net/todoDB", { useNewUrlParser: true });

const todoSchema = new mongoose.Schema({
  name: String
});

const Todo = mongoose.model("Todo", todoSchema);



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

const listSchema = {
  name: String,
  items : [todoSchema]
}

const List = mongoose.model("List", listSchema);

app.get("/", async function (req, res) {

  const day = date.getDate();
  const items = await Todo.find({});

  res.render("list", { listTitle: "Today", newListItems: items });

});

app.post("/", async function (req, res) {

  // const listName = req.body.list;
  // const val = await List.findOne({name: listName});

  const item = new Todo({
    name: req.body.newItem
  });



  // if(listName === "Today"){
    item.save();
    res.redirect("/");
  // }else{
    
  //     val.items.push(item);
  //     val.save();
  //     res.redirect("/" + listName );
  // }

});

//Express Route Parameters
// app.get("/:customListParameters", async function(req,res){
//   // console.log(req.params.customListParameters);
//   const customList = req.params.customListParameters;
//   const morePages = await List.findOne({name: customList});
//   const morePages2 = await List.find({});
//   // console.log(morePages.name);
//   if(morePages === null ){
//     const list = new List({
//       name : customList,
//       items : []
//     });
//     list.save();

//     res.redirect("/" + customList);
//   }
//   else{
//     res.render("list", { listTitle: morePages2.name, newListItems: morePages2 });
//   }

//   // List.findOne({name: customList} , function(err,foundlist){
//   //   if(!err){
//   //     if(!foundlist){
//   //       const list = new List({
//   //         name : customList,
//   //         items : []
//   //       });
//   //       list.save();
//   //     }
//   //     else{
//   //       res.render("list", { listTitle: foundlist.name, newListItems: foundlist.items });
//   //     }
//   //   }
//   // })
// })

app.post("/deleteItem", async function (req, res) {
  await Todo.deleteOne({ _id: req.body.checkbox });

  res.redirect("/");
})

app.listen(PORT, function () {
  console.log("Server started on port 3000");
});
