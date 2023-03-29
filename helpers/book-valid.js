const {check} = require('express-validator');

exports.bookValidator = [

    check("title")
        .not()
        .isEmpty()
        .isString(),
    check("pages")
        .isNumeric()
        .not()
        .isEmpty(),
    check("author")
        .not()
        .isEmpty()
        .isString(),
    check("publisher")
        .not()
        .isEmpty()
        .isString(),
    check("datePublished")
        .isDate()



]