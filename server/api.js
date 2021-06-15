import { Router } from "express";
import passport from "passport";
import admins from "./admins";
import db from "./db";
import {requiresLogin} from "./middleware";

const router = new Router();

router.get("/", (_, res) => {
	res.json({ message: "Hello, world!" });
});

router.post("/login", passport.authenticate("local"), admins.login);

router.get("/logout", admins.logout);

router.get("/ping", requiresLogin, admins.ping);

// test route to check db queries - to delete in the future
router.get("/test", (_, res) => {
	db.query("select * from admins;")
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e))
	
})

export default router;
