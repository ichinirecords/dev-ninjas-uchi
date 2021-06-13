import { Router } from "express";

const router = new Router();

router.get("/", (_, res) => {
	res.json({ message: "Hello, world!" });
});

//TODO Admin login validation
router.get('/admin', (req, res) => {
	const email = req.query.email;
	const password = req.query.password;
	if (email && password) {
		//* Do validation
	} 
})

export default router;
