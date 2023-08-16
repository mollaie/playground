const fs = require('fs');

function generateTestData() {
    const testData = [];
    const baseUrl = "https://picsum.photos/80/80?random=";

    for (let i = 0; i < 2000; i++) {
        const randomNum = Math.floor(Math.random() * 50) + 1;
        const category = {
            title: `Title ${i + 1}`,
            description: `Description for title ${i + 1}`,
            imageUrl: `${baseUrl}${randomNum}`
        };
        testData.push(category);
    }

    return testData;
}

const data = generateTestData();
fs.writeFileSync('testData.json', JSON.stringify(data, null, 2));
console.log('Test data generated and saved to testData.json');