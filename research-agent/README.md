# Research Agent

This is the main repository for the Research Agent project.

## Directory Structure

```
research-agent/
├── frontend/              # Next.js frontend application
├── backend/               # FastAPI backend application
├── docs/                  # PRD, Roadmap, API docs
├── database/              # SQL, ER diagrams
├── ai/                    # AI modules
├── prompts/               # AI prompts
└── assets/                # Images & logos
```

## Project Components

- **[frontend/](file:///C:/Users/KHADERSHA/Documents/research/research_agent_v2/research-agent/frontend)**: Next.js frontend codebase.
- **[backend/](file:///C:/Users/KHADERSHA/Documents/research/research_agent_v2/research-agent/backend)**: FastAPI backend codebase.
- **[docs/](file:///C:/Users/KHADERSHA/Documents/research/research_agent_v2/research-agent/docs)**: Project documentation, including the PRD, Roadmap, and API definitions.
- **[database/](file:///C:/Users/KHADERSHA/Documents/research/research_agent_v2/research-agent/database)**: Database schemas, migrations, and ER diagrams.
- **[ai/](file:///C:/Users/KHADERSHA/Documents/research/research_agent_v2/research-agent/ai)**: Core AI modules and model integration code.
- **[prompts/](file:///C:/Users/KHADERSHA/Documents/research/research_agent_v2/research-agent/prompts)**: System and user prompts for AI integration.
- **[assets/](file:///C:/Users/KHADERSHA/Documents/research/research_agent_v2/research-agent/assets)**: Images, logos, and other static design assets.

## Getting Started & How to Run

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) (v18.x or higher) installed on your system.

### Running the Frontend (Next.js)

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install Dependencies** (already initialized):
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   This will spin up the local development server at [http://localhost:3000](http://localhost:3000). Open this URL in your web browser to interact with the dashboard, papers search, file upload queue, research library, AI chat, and settings pages.

4. **Lint and Type Check**:
   To validate file structures, syntax formatting, and TypeScript compiler rules:
   ```bash
   npm run lint
   ```

5. **Build for Production**:
   To generate optimized, production-ready static assets:
   ```bash
   npm run build
   ```

6. **Serve the Production Build**:
   To run the local server against the optimized production assets built in step 5:
   ```bash
   npm run start
   ```

