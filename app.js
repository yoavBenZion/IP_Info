const request = require('request'),
    checkIp = require('check-ip'),
    express = require('express'),
    app = express();

//seting ejs as default
app.set("view engine", "ejs");
let IpTest = true;


app.get("/", (req, res) => {
    res.render("search", { data: IpTest });
});

app.get("/results", (req, res) => {
    let IP = req.query.ip;

    const response = checkIp(IP);
    if (response.isValid && response.isPublicIp) {
        let url = "http://ipinfo.io/" + IP + "/json"
        request(url, (error, response, body) => {
            if (!error && res.statusCode == 200) {
                let data = JSON.parse(body);
                IpTest = true;
                let location = data.loc.split(",");
                res.render("results", { data: data, location, IpTest });
            }
        });
    } else {
        IpTest = false;
        res.render("search", { data: IpTest });
    }
});

app.get("*", (req, res) => {
    res.send("where are you going ? ?");
})

app.listen(3000, () => {
    console.log("IP Info App is Runing");
});