const p = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Hello async"), 1000);
});

async function firstAsyncFunction() {
    const result = await p;
    return `${result} 123`;
}

console.log("Hello sync!")

// p.then(res => console.log(res));
firstAsyncFunction().then(r => console.log(r));
