import express from "express";
import bodyParser from 'body-parser';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';

const PORT = 3000;
const app = express();
const csrfProtection = csrf({ cookie: true })
const parseForm = bodyParser.urlencoded({ extended: false });
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(cookieParser())
app.get('/form', csrfProtection, function (req, res) {
  // pass the csrfToken to the view
  res.render('index', { csrfToken: req.csrfToken() })
})
app.post('/process', parseForm, csrfProtection, function (req, res) {
  if(req.body._csrf) {

    console.log(req.body._csrf);
    res.send("Success")
  } else {
    res.send("Fail")
  }
})
app.listen(PORT, () => {
  console.log("App running with port: " + PORT);
});
