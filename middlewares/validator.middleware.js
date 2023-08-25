const validateUserFields = (req, res, next) => {
    const {  email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    next();
};

module.exports = { validateUserFields };
