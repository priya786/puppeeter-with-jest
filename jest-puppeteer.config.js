module.exports = {
    launch: {
        headless: false,
    
    defaultViewport: null,
    args: [
        '--start-maximized',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-first-run',
        '--no-sandbox',
        '--no-zygote',
        '--deterministic-fetch',
        '--disable-features=IsolateOrigins,site-per-process',
        '--disable-site-isolation-trials',
        '--enable-features=NetworkService',
        '--shm-size=3gb', // this solves the issue
    ]
},
    browserContext: "default"
}
