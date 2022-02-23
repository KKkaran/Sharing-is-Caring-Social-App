const router = require("express").Router()
const {getAllUsers,getOneUser,createUser,updateUser,deleteUser,testRoute} = require("../../controllers/userController")


router.route("/")
      .get(getAllUsers)
      .post(createUser)

router.route('/test/:userId')
      .get(testRoute)

router.route("/:userId")
      .get(getOneUser)
      .put(updateUser)
      .delete(deleteUser)


module.exports = router