# BiteSpeed Frontend Task: Chatbot Flow Builder

![Build Status](https://img.shields.io/github/actions/workflow/status/Aditya-Nikhade/chatbot-flow-builder/ci.yml?branch=main)
![Vercel](https://vercelbadge.vercel.app/api/Aditya-Nikhade/chatbot-flow-builder)
![License](https://img.shields.io/github/license/Aditya-Nikhade/chatbot-flow-builder)

Hi! THANKS FOR READING THIS! I have completed the task for building the chatbot flow builder. Below is the live link.
**✨ Live Demo:** [**https://chatbot-flow-builder-anikhade.vercel.app/**](https://chatbot-flow-builder-anikhade.vercel.app/) ✨

---

## ✅ Features

I have implemented all the features described in the task and have added minor additions:

-   [x] **Drag-and-Drop Interface:** Easily add nodes to the canvas from the Nodes Panel.
-   [x] **Custom Text Nodes:** Support for a custom, styled "Send Message" node.
-   [x] **Extensible Nodes Panel:** The panel is built from a configuration file (`node.config.js`), making it trivial to add new node types in the future.
-   [x] **Node Connectivity:** Connect nodes via source and target handles with smooth-step edges and arrowheads.
-   [x] **Connection Validation:** A source handle can only have one outgoing connection, enforced at the logic level.
-   [x] **Dynamic Settings Panel:** Select a node to open a settings panel and edit its content in real-time.
-   [x] **Save with Validation:** The "Save Changes" button validates the flow to ensure there aren't multiple disconnected nodes.

#### Extra Additions
-   [x] **Clear Button:** To clear the canvas for a fresh start.
-   [x] **End-to-End Testing:** Critical user flows are covered by Playwright tests to ensure reliability and prevent regressions.
-   [x] **Automated CI/CD Pipeline:** A full Continuous Integration and Deployment pipeline using GitHub Actions and Vercel.

---

## 🛠️ The Tech Stack used:

-   **Framework:** React (with Vite)
-   **Language:** JavaScript
-   **State Management:** Zustand
-   **Flow Canvas:** React Flow
-   **Styling:** Tailwind CSS
-   **Notifications:** `react-hot-toast`
-   **Testing:** Playwright for End-to-End tests
-   **Code Quality:** ESLint, Prettier, and Husky for pre-commit checks

---

## ⚙️ Professional Touch

**The task did not mention much about adding extra features, but I made sure to follow production-grade practices to make this project.**

-   **Automated Testing (Playwright):** Ran the tests using npx playwright test --ui
-   **Continuous Integration (GitHub Actions):** On every pull request, a CI pipeline automatically runs the linter and the full Playwright E2E test suite.
-   **Branch Protection:** The `main` branch is protected. Merging is blocked unless all CI checks have passed, ensuring the main branch is never broken.
-   **Continuous Deployment (Vercel):** Upon a successful merge to `main`, Vercel automatically builds and deploys the latest version of the application.
-   **Local Quality Gates (Husky):** Before any code is committed, a pre-commit hook automatically runs ESLint and Prettier to enforce code style and catch errors early.

---

## 💡 Future Improvements

To make a full-fledged application, in the future we can add the following:

1.  **More Node Types:** The extensible architecture allows us to easily add new message types like Images, Quick Replies, or User Input fields.
2.  **User Authentication:** We can add Google/JWT authentication too.
3.  **Personalised Space:** With the user created, he/she can have a personal feature for having a saved projects list and much more personalization.

---

## Run the code locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Aditya-Nikhade/chatbot-flow-builder
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd chatbot-flow-builder
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
5.  **Run tests:**
    ```bash
    npx playwright test --ui 
    ```