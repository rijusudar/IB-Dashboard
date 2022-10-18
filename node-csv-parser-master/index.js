const express = require("express");
const app = express();
const port = process.env.PORT || 3005;
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require('fs');
const csv = require('csv-parser')

app.use(cors());
app.use(bodyParser.json());

app.post('/', (req, res) => {
    if (req.body.file && fs.existsSync('inputfiles/' + req.body.file)) {
        const results = [];
        fs.createReadStream('inputfiles/' + req.body.file)
            .pipe(csv())
            .on('data', (data) => {
                results.push(data)
            }).on('end', () => {
                const totalRows = results.length;
                const page = req.body.page || 1;
                const limit = req.body.limit || 50;
                const startIndex = totalRows > (page - 1) * limit ? (page - 1) * limit : totalRows;
                let endIndex = totalRows === startIndex ? startIndex : (startIndex + limit);
                const filterdOutputData = results.slice(startIndex, endIndex);
                endIndex = startIndex + filterdOutputData.length;

                const output = {
                    "total": totalRows,
                    "itemsCount": filterdOutputData.length,
                    "startIndex": startIndex,
                    "endIndex": endIndex - 1,
                    "currentPage": page,
                    "totalPages": Math.ceil(totalRows / limit),
                    "data": filterdOutputData,
                    "lastPage": endIndex >= totalRows
                }
                res.send(output);
            });
    } else {
        res.status(400).send({ message: "No filename" });
    }
})

app.post('/fulldata', (req, res) => {
    if (req.body.file && fs.existsSync('inputfiles/' + req.body.file)) {
        let results = [];
        fs.createReadStream('inputfiles/' + req.body.file)
            .pipe(csv())
            .on('data', (data) => {
                results.push(data)
            }).on('end', () => {
                let filteredOutput = [];
                results.map((item) => {
                    const lceGroupFound = filteredOutput.filter((singleLceGroup) => singleLceGroup["lce-group"] === item["LCE Group"]);
                    if (lceGroupFound.length === 0) {
                        filteredOutput.push({
                            "lce-group": item["LCE Group"],
                            items: [{
                                'functional-area': item['FunctionalArea.Name'],
                                [item['TW Age Group'].replace(/\s/g, '')]: 1
                            }]
                        })
                    } else {
                        filteredOutput = filteredOutput.map((singleLceGroup) => {
                            if (singleLceGroup["lce-group"] === item["LCE Group"]) {
                                const lceGroupFound = singleLceGroup["items"].filter((functionalItem) => functionalItem["functional-area"] === item['FunctionalArea.Name']);
                                if (lceGroupFound.length > 0) {
                                    singleLceGroup["items"].map((functionalItem) => {
                                        if (functionalItem["functional-area"] === item['FunctionalArea.Name']) {
                                            if (functionalItem[item['TW Age Group'].replace(/\s/g, '')]) {
                                                functionalItem[item['TW Age Group'].replace(/\s/g, '')] = functionalItem[item['TW Age Group'].replace(/\s/g, '')] + 1;
                                            } else {
                                                functionalItem[item['TW Age Group'].replace(/\s/g, '')] = 1;
                                            }
                                        }
                                        return functionalItem;
                                    });
                                } else {
                                    singleLceGroup.items.push(
                                        {
                                            'functional-area': item['FunctionalArea.Name'],
                                            [item['TW Age Group'].replace(/\s/g, '')]: 1
                                        }
                                    );
                                }
                            }
                            return singleLceGroup;
                        })
                    }
                });
                res.send(filteredOutput);
            });
    } else {
        res.status(400).send({ message: "No filename" });
    }
})


app.listen(port, () =>
    console.log(`PM-WANI API Server Running On Port -> ${port}!`)
);