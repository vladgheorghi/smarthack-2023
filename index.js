import * as getRequest from './getRequests.js';
import * as postRequest from './postRequests.js';
import * as AI from './openAI.js';
import * as filters from './createFilterObjs.js';
import promptSync from 'prompt-sync';
import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = 4000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

var name1 = "";
var name2 = "";

const userFocuses = ['num_locations', 'year_founded', 'main_business_category', 'cms'];

app.get("/", cors(), async (req, res) => {
    res.send("This is working");
})

app.post("/post_name", async (req, res) => {
    let {name} = req.body;
    if (name1 == "") {
        name1 = name;
    } else if (name2 == "") {
        name2 = name;
        await main(name1, name2);

        name1 = "";
        name2 = "";
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

async function newOpinion(name) {

    var response = await postRequest.searchPostRequest(filters.filterByName(name));

    var hitList = {
        companies: []
    };

    for (let key in response.result) {
        console.log("Name: " + response.result[key].company_name + "\n");
        console.log("Location: " + response.result[key].main_country + ", \
        " + response.result[key].main_region + "\n");
        console.log("Short description: " + response.result[key].short_description + "\n");
        console.log("-----------------------------------------\n\n");
        hitList.companies.push({
            "company_name": response.result[key].company_name,
            "location": response.result[key].main_country + ", " + response.result[key].main_region,
        });
    }

    if (hitList.companies == []) {
        console.log("Sorry, we couldn't find that company. Please try again.\n");
        return null;
    }

    var companyLocation = "";

    for (let key in hitList.companies) {
        if (name == hitList.companies[key].company_name) {
            companyLocation = hitList.companies[key].location;
            break;
        }
    }

    var parsed = await postRequest.matchPostRequest(name, companyLocation);

    let newJSON = {};

    newJSON['company_name'] = name;

    for (let key in userFocuses) {
        newJSON[userFocuses[key]] = parsed[userFocuses[key]];
    }

    return newJSON;
}

async function main(name1, name2) {
    console.log(name1);
    console.log(name2);
    var prompt = promptSync({ sigint: true });

    var firstCompanyJSON = await newOpinion(name1);

    var secondCompanyJSON = await newOpinion(name2);

    var addNewCriterias = prompt("Would you like to add any new criterias?: ");
    firstCompanyJSON['other_criterias'] = addNewCriterias;
    secondCompanyJSON['other_criterias'] = addNewCriterias;

    var openai = AI.initAI();
    var response = await AI.sendToAI(JSON.stringify(firstCompanyJSON) + "\n" + JSON.stringify(secondCompanyJSON), openai);

    console.log(response);

}

export { main as main };