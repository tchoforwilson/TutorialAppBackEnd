const express = require("express");
const tutorialController = require("./../controllers/tutorialController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.use(authController.protect);
router
  .route("/")
  .get(tutorialController.getAllTutorials)
  .post(
    authController.restrictTo("admin", "publisher"),
    tutorialController.createTutorial
  );

router
  .route("/:id")
  .get(tutorialController.getTutorial)
  .patch(
    authController.restrictTo("admin", "publisher"),
    tutorialController.updateTutorial
  )
  .delete(
    authController.restrictTo("admin", "publisher"),
    tutorialController.deleteTutorial
  );

router.route("/published").get(tutorialController.getTutorialPublished);

module.exports = router;
