const express = require("express");
const app = express();
const fs = require("fs");
const router = express.Router();
const Gallery = require("../models/galleryModel");
const upload = require("../middlewares/fileupload");

router.post("/", upload.array("pictures", 5), async (req, res) => {
  const file_Paths = req.files.map((file) => file.path);
  const user = await Gallery.create({
    user_id: req.body.user_id,
    pictures: file_Paths,
  });
  res.send(user);
});

router.delete("/:id", async (req, res) => {
  const galleryToBeDeleted = await Gallery.find({ user_id: req.params.id });
  let files_Path = galleryToBeDeleted[0].pictures;

  files_Path.map((file) => {
    fs.unlinkSync(file);
  });

  const gallery = await Gallery.findOneAndUpdate(
    { user_id: req.params.id },
    { $set: { pictures: [] } },
    { new: true }
  );

  res.send(gallery);
});

module.exports = router;
