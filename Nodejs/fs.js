import { writeFile, readFile, appendFile, unlink } from 'fs';

writeFile('employees.json', '{"name": "Employee 1 Name", "salary": 2000}', 'utf8', (err) => {
    if (err) console.log(err);
});
setTimeout(() => {
    readFile('employees.json', 'utf8', (err, data) => {
        if (err) console.log(err);
        console.log(data);
    }), 3000  
});
setTimeout(() =>{
    appendFile('employees.json', '{"name": "Employee 2 Name", "salary": 3000}', 'utf8', (err) => {
        if (err) console.log(err);
    }), 4000
});
setTimeout(()=>{
    unlink('employees.json', (err) => {
        if (err) console.log(err);
    }),5000
})