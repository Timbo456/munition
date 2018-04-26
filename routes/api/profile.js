//Bring in express to use router
const express = require("express");
const router = express.Router();

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public

router.get("/test", (req, res) => res.json({ msg: "Profile Works!" }));

//Have to export the router for the server.js file to pick it up:
module.exports = router;
