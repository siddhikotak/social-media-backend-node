exports.createPostValidator = (req, res, next) => {
    req.check("title", "Write the title").notEmpty();
    req.check("title", "Title should be between 4 to 150 characters").isLength({
        min: 4,
        max: 150
    });

    req.check("body", "Write the title").notEmpty();
    req.check("body", "Body should be between 4 to 2000 characters").isLength({
        min: 4,
        max: 2000
    });

    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg);
        return res.status(400).json({ error: firstError });
    }

    next();
};



exports.createSignupValidator = (req, res, next) => {
    req.check("name", "Name is required").notEmpty();
    req.check("name", "Name must be between 4 to 20 characters").isLength({
        min: 4,
        max: 20
    });

    req.check("email", "Email is required").notEmpty();
    req.check("email", "Email must be between 10 to 30 characters")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 10,
            max: 30
        });

    req.check("password", "Password is required").notEmpty();
    req.check("password")
        .isLength({ min: 8 })
        .withMessage("Password must contain atleast 8 characters")
        .matches(/\d/)
        .withMessage("password must contain a number");


    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
}