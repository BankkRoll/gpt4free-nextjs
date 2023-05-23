# Educational Purposes Only
This repository and its content are strictly provided for educational purposes. By utilizing the information and code provided, users acknowledge that they use the APIs and models at their own risk and commit to comply with all relevant laws and regulations.

This repository is not linked to or sponsored by the providers of the APIs found within. This project is simply a small personal project designed for educational use. Website owners can reach out to me for security enhancement or to request their site's removal from this repository.

## IN PROGRESS 🔧
- [ ] Fix tls to https/https since nextjs wont support it directly
- [ ] Finish implementation of all models
- [ ] UI/UX Designing

Here's an explanation of the key files and directories related to this project:

| File/Directory | Description |
| -------------- | ----------- |
| Docker Configuration | -------------------------------------------- |
| `docker-compose.yaml`, `Dockerfile` | Used to containerize the application using Docker. They define the environment and the steps to build the Docker image. |
| Model Definitions | -------------------------------------------- |
| `model` | Contains the data models for various services. |
| `model/aidream` | Data model for the `aidream` service. |
| `model/forefront` | Data model for the `forefront` service. |
| `model/phind` | Data model for the `phind` service. |
| `model/you` | Data model for the `you` service. |
| Next.js Pages | -------------------------------------------- |
| `src/pages` | Contains the pages of the Next.js application. The `index.tsx` file is the entry point, `_app.tsx` is for initializing pages, and `_document.tsx` is for augmenting the HTML and body tags. |
| `src/pages/api/ask.ts` | Handles API calls related to asking a question or making a request to the services. |
| `src/pages/api/stream.ts` | Handles streaming or real-time data requests. |
| Styling | -------------------------------------------- |
| `src/styles` | Contains global styles for the application. |
| Utility Functions | -------------------------------------------- |
| `utils/proxyAgent.ts` | Creates instances of Axios and a TLS client respectively with the option of using a proxy server if one is provided or found in the environment variables. |
| `utils/index.ts` | Provides various utility functions. |
| `utils/puppeteer.ts` | Manages puppeteer instances for web scraping. |
| `utils/emailFactory.ts` | Interacts with temporary email services. |


## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Star the project
2. Fork the Project
3. Commit your Changes
4. Push to the Branch
5. Open a Pull Request

---

# Legal Notice
## Important Points to Note:

### Disclaimer
The APIs, services, and trademarks mentioned in this repository are owned by their respective owners. This project does not claim any ownership over them and is not linked to or sponsored by any of the mentioned providers.

### Responsibility
The repository's author does not bear any responsibility for any consequences, damages, or losses resulting from the usage or misuse of this repository or content provided by third-party APIs. Users bear sole responsibility for their actions and any resulting consequences. We highly encourage users to abide by each website's TOS.

### Indemnification
Users agree to indemnify, defend, and hold the repository's author harmless from any and all claims, liabilities, damages, losses, or expenses, including legal fees and costs, arising from their use or misuse of this repository, its content, or associated third-party APIs.

### Updates and Changes
The author reserves the right to alter, update, or delete any content, information, or features in this repository at any time without prior notice. Users are responsible for regularly reviewing the content and any modifications to this repository.

By using this repository or any associated code, you are agreeing to these terms. The author is not responsible for any copies, forks, or reuploads made by other users. This is the author's only account and repository. To prevent impersonation or irresponsible actions, you are advised to comply with the GNU GPL license this Repository operates under.

<div align="center">
    <img src="https://visitor-badge.laobi.icu/badge?page_id=BankkRoll.gpt4free-nextjs&left_color=green&right_color=blue" alt="visitors" width="100"/>
</div>
