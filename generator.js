const fs = require('fs');
const Chance = require('chance');

const chance = new Chance();

function generateTestData() {
    const testData = [];
    const baseUrl = "https://picsum.photos/400/200?random=";

    for (let i = 20002; i < 30000; i++) {
        const randomNum = Math.floor(Math.random() * 50) + 1;
        const category = {
            title: chance.name(),
            description: chance.sentence(),
            imageUrl: `${baseUrl}${randomNum}`
        };
        testData.push(category);
    }

    return testData;
}

const data = generateTestData();
fs.writeFileSync('testData.json', JSON.stringify(data, null, 2));
console.log('Test data generated and saved to testData.json');