import { Router } from "express";

const router = Router();

router.post('/', (req, res) => {
  const { user, pass } = req.body;
  if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS) {
    res.json({ auth: true, token: 'un-token-falso-o-jwt' });
  } else {
    res.status(401).json({ auth: false });
  }
});


export default router;