function filterByName(name) {
    return {
        "filters" : {
            "and": [
                {
                    "attribute": "company_name",
                    "relation": "equals",
                    "value": name
                }
            ]
        }
    }
}

export {filterByName};