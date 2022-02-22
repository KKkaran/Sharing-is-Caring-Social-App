const router = require("express").Router()
const { route } = require(".")
const {getAllThoughts,getOneThought,createThought,createReaction,deleteReaction} = require("../../controllers/thoughtController")

router.route("/")
      .get(getAllThoughts)
      .post(createThought)

router.route("/:thoughtId")
      .get(getOneThought)

router.route("/:thoughtId/reactions")
      .post(createReaction)

router.route("/:thoughtId/:reactionId")
      .delete(deleteReaction)



module.exports = router