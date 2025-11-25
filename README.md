# MindMapper

**Visual Multi-Context Interface for LLM Interaction**

A canvas-based, node-driven interface for exploring ideas with AI. Create query nodes on a 2D canvas, receive responses as connected nodes, and branch off any point to explore new directions while maintaining separate contexts per branch.

## Project Status

🚧 **Week 3 - Canvas Base & Node Rendering** 🚧

Current implementation includes:
- [x] React + Vite project setup
- [x] React Flow integration for canvas
- [x] Custom node types (Query, Answer, Sources)
- [x] Color-coded nodes per proposal spec
- [x] Pan, zoom, and minimap navigation
- [x] Interactive bullet hover menus
- [ ] Backend API integration
- [ ] LLM integration
- [ ] RAG/FAISS memory system

## Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool & dev server
- **React Flow** (@xyflow/react) - Canvas & node graph

### Backend (Planned)
- **FastAPI** - Python API server
- **FAISS** - Vector similarity search
- **PostgreSQL** - Persistence

### AI/ML (Planned)
- **OpenAI / Claude API** - LLM responses
- **Perplexity API** - Web search
- **Sentence Transformers** - Embeddings

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
mindmapper/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── QueryNode.jsx      # User prompt nodes (green)
│   │   │   ├── AnswerNode.jsx     # LLM response nodes (blue)
│   │   │   ├── SourcesNode.jsx    # Web sources nodes (orange)
│   │   │   ├── MindMapCanvas.jsx  # Main canvas component
│   │   │   └── *.css              # Component styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Node Types

| Type | Color | Purpose |
|------|-------|---------|
| Query | 🟢 Green | User's questions/prompts |
| Answer | 🔵 Blue | LLM responses with expandable bullets |
| Sources | 🟠 Orange | Web search results |

## Features

### Current
- **Canvas navigation**: Pan, zoom, drag nodes
- **Minimap**: Overview of large boards
- **Interactive bullets**: Hover over any answer bullet to:
  - **Expand**: Generate follow-up response
  - **Sources**: Search for related articles
  - **Custom**: Enter a custom follow-up question

### Planned
- Branch-local context via RAG
- Running summaries per branch
- Web search integration
- Session persistence
- Collaborative editing

## Development Timeline

See the [Capstone Proposal](./docs/proposal.pdf) for the full 14-week plan.

## Author

Dipan Bag - bag00003@umn.edu

## License

This project is part of a UMN Capstone Project (Spring 2026).
