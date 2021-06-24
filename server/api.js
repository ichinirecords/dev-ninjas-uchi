import { Router } from "express";
import passport from "passport";
import { login, logout, ping, requestReset, verifyToken, resetPassword, createNewAdmin } from "./admins";
import { artUpload } from "./upload";
import { mediaUpload } from "./media";
import { getArtwork, updateArtwork, deleteArtwork } from "./artwork";
import db from "./db";
import { requiresLogin } from "./middleware";
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = new Router();

router.get("/", (_, res) => {
	res.json({ message: "Hello, world!" });
});

router.post("/upload", artUpload);

router.post("/media", upload.single("image"), mediaUpload);

router.post("/login", passport.authenticate("local"), login);

router.get("/logout", logout);

router.get("/ping", requiresLogin, ping);

router.post("/request-reset", requestReset);

router.get("/reset", verifyToken);

router.post("/admin", createNewAdmin);

router.put("/admin/:id", resetPassword);

router.get("/artwork", getArtwork);

router.put("/artwork/:id", requiresLogin, updateArtwork);

router.delete("/artwork/:id", requiresLogin, deleteArtwork);

// test route to check db queries - to delete in the future
router.get("/test", (_, res) => {
	db.query("select * from admins;")
		.then((result) => res.json(result.rows))
		.catch((e) => console.error(e));

});

export default router;
