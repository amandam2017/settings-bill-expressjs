const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const SettingsBill = require('./settingsBill');

//instantiate app
const app = express();

//create instance for settings bill
const settingsBill = SettingsBill();

const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath:  './views',
    layoutsDir : './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

//make public folder visible
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//add a basic/default route and define req and res
app.get('/', function(req,res){
    
    res.render('index', {
        settings: settingsBill.getSettings(),
        totals: settingsBill.totals(),
        class: settingsBill.addClass
    });
});

//settings route
app.post('/settings', function(req, res){
    // console.log(req.body);
    settingsBill.setSettings({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel
    });
   
    console.log(settingsBill.getSettings());

    res.redirect('/');
});

//add action route...which is also post
app.post('/action', function(req, res){
    // capture the call type to add
    settingsBill.recordAction(req.body.actionType)
    res.redirect('/');
});
//add actions route...which is also post and will display all of our routes
app.get('/actions', function(req, res){
    res.render('actions', {actions: settingsBill.actions()});
});

//dynamic route to display calls or sms
app.get('/actions/:actionType', function(req, res){
    const actionType = req.params.actionType;
    res.render('actions', {actions: settingsBill.actionsFor(actionType)});
});

//make port number configurable 
const PORT = process.env.PORT || 3011;

app.listen(PORT, function(){
    console.log("App started at:", PORT)
});
// end