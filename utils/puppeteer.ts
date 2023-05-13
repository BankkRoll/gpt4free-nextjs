// utils/puppeteer.ts
import puppeteer, { Browser, Page, PuppeteerLaunchOptions } from "puppeteer";
import fs from 'fs';
import path from "path";

const runPath = path.join(__dirname, 'run');

export class FreeBrowser {
    private browser: Browser | undefined = undefined;
    private readonly options: PuppeteerLaunchOptions | undefined;
    private urls: Set<string> = new Set<string>();
    private pages: Record<string, Page> = {};
    private readonly id: string;
    private readonly runPath: string;

    constructor(id: string, runPath: string, options?: PuppeteerLaunchOptions) {
        this.options = {
            userDataDir: path.join(runPath, id),
            ...options
        };
        this.id = id;
        this.runPath = runPath;
    }

    public async init() {
        this.browser = await puppeteer.launch(this.options)
    }


    public async getPage(url: string): Promise<Page> {
        if (!this.browser) {
            throw new Error('Browser must init first')
        }
        if (this.pages[url]) {
            return this.pages[url];
        }
        const page = await this.browser.newPage();
        await page.goto(url)

        this.pages[url] = page;
        return page;
    }
}


class FreeBrowserPool {
    private size: number = 0;
    private readonly pool: FreeBrowser[];
    private readonly runPath: string;

    constructor(runPath: string) {
        this.pool = [];
        this.runPath = runPath;
    }

    public async init(size: number, debug: boolean) {
        console.log(`browser pool init size:${size}`)
        if (!fs.existsSync(this.runPath)) {
            fs.mkdirSync(this.runPath);
        }
        this.size = size;
        const options: PuppeteerLaunchOptions = {
            headless: !debug,
        };
        for (let i = 0; i < size; i++) {
            const browser = new FreeBrowser(`${i}`, this.runPath, options);
            await browser.init();
            this.pool.push(browser);
        }
    }

    public getRandom(): FreeBrowser {
        return this.pool[Math.floor(Math.random() * this.pool.length)]
    }
}

export const freeBrowserPool = new FreeBrowserPool(runPath);