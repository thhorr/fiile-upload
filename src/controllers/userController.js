const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());
const router = express.Router();
const User = require("../models/userModel");
const upload = require("../middlewares/fileupload");

router.post("/", upload.single("profile_pic"), async (req, res) => {
  const user = await User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    profile_pic: req.file.path,
  });

  res.send(user);
});

router.patch("/:id", upload.single("profile_pic"), async (req, res) => {
  const userToBeUpdated = await User.findById(req.params.id);

  let file_Path = userToBeUpdated.profile_pic;
  let profile_Path;

  if (req.file !== undefined) {
    fs.unlinkSync(file_Path);
    profile_Path = req.file.path;
  } else {
    profile_Path = file_Path;
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      profile_pic: profile_Path,
    },
    { new: true }
  );

  res.send(user);
});

router.delete("/:id", async (req, res) => {
  const userToBeDeleted = await User.findById(req.params.id);

  let file_Path = userToBeDeleted.profile_pic;
  fs.unlinkSync(file_Path);

  const user = await User.findByIdAndDelete(req.params.id);
  res.send(user);
});

module.exports = router;
