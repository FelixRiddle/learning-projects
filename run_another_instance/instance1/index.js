const instance2 = require("../instance2/index");
const get_random_name = instance2.get_random_name;

const name = get_random_name();
console.log(`Name result: ${name}`);
