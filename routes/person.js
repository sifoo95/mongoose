
const express = require("express")

const router = express.Router()
const person = require('../models/Person')


// test
router.get('/test', (req, res) => {
    res.send("hello")
})


// add new person 
router.get("/add", (req, res) => {
    const person1 = new person({
      name: "seyfeddine",
      age: 19,
      favoriteFoods: ["pizza", "burgers", "spagheti"],
    });
    person1.save((err) => {
      err ? console.log("error while saving", err) : console.log("successfully saved");
    });
  });

  //add many 
  router.get("/createMany", (req, res) => {
    person.create([
      { name: "John", age: 14, favoriteFoods: ["fruits", "lasagna", "poisson"] },
      { name: "Jane", age: 28, favoriteFoods: ["sushi", "thai food"] },
      { name: "Tim", age: 18, favoriteFoods: ["snacks", "chicken wing", "spaghetti"] },
    ]);
  });
//find person with name
const name = "ezzedine";
router.get("/search", (req, res) => {
  person.find({ name: name })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("error occured while searching", err);
    });
});
//find person with favourite foods
router.get("/findOne", (req, res) => {
  person.findOne({ favoriteFoods: { $in: ["chicken wings", "spaghetti"] } })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("error occured while searching", err);
    });
});
//find by_id
const id = "61c99a2cc36d40a2a06d1d48";
router.get("/findById", (req, res) => {
  person.findById(id, function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log("Result : ", doc);
    }
  });
});
//Updates by Running Find, Edit, then Save
const personId = "61c99a2cc36d40a2a06d1d48";
router.get("/update", (req, res) => {
  person.findById(personId, (err, personFound) => {
    if (err) {
      console.log("error while searching", err);
    } else {
      personFound.favoriteFoods.push("hamburger");
      personFound
        .save()
        .then((response) => {
          console.log("person saved successfully", personFound);
        })
        .catch((err) => console.log("error occured while saving", err));
    }
  });
});
//find one and update
const personName = "soufien";
router.get("/findOneAndUpdate", (req, res) => {
  person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, personUpdated) => {
      err
        ? console.log("error while updating", err)
        : console.log("the new updated person :", personUpdated);
    }
  );
});
//delete one document
const personId2 = "61c9a2d5cbb7dbabdb0a97b3";
router.get("/findByIdAndRemove", (req, res) => {
  person.findByIdAndRemove(personId2, (err, deletedPerson) => {
    err
      ? console.log("error occured while deleting")
      : console.log("this object is deleted with succes", deletedPerson);
  });
});
//delete many documents
router.get("/deleteAllMary", (req, res) => {
  person.remove({ name: "Mary" }, (err, result) => {
    err ? console.log("error while deleting") : console.log("deleted successfully", result);
  });
});
//find people like burritos
router.get("/LikeBurrito", (req, res) => {
  person.find({ favoriteFoods: { $in: "burrito" } })
    .sort("name")
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      err
        ? console.log("error while looking for people who like burrito", err)
        : console.log("people who like burrito", data);
    });
  });










module.exports = router;