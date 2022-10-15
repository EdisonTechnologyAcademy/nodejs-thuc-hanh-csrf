"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const csurf_1 = __importDefault(require("csurf"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const PORT = 3000;
const app = (0, express_1.default)();
const csrfProtection = (0, csurf_1.default)({ cookie: true });
const parseForm = body_parser_1.default.urlencoded({ extended: false });
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use((0, cookie_parser_1.default)());
app.get('/form', csrfProtection, function (req, res) {
    res.render('index', { csrfToken: req.csrfToken() });
});
app.post('/process', parseForm, csrfProtection, function (req, res) {
    if (req.body._csrf) {
        console.log(req.body._csrf);
        res.send("Success");
    }
    else {
        res.send("Fail");
    }
});
app.listen(PORT, () => {
    console.log("App running with port: " + PORT);
});
//# sourceMappingURL=index.js.map