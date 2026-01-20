# spdSQL - Free Online SQL Playground & Runner

A modern, browser-based SQL playground powered by DuckDB WASM. Run SQL queries, explore schemas, and work with data entirely in your browser with zero server requirements.

**🚀 Live Demo**: [https://spdsql.vercel.app](https://spdsql.vercel.app)  
**📦 GitHub**: [https://github.com/Asif-4520/spdSQL](https://github.com/Asif-4520/spdSQL)


## ✨ Why spdSQL?

Execute SQL queries directly in your browser without any installation or signup. Perfect for learning SQL, testing queries, data analysis, and quick data transformations.

## 🚀 Features

-   **In-Browser SQL Engine** - Fast, local SQL execution using DuckDB WASM
-   **Interactive Editor** - Syntax highlighting and autocomplete powered by CodeMirror
-   **Multiple Data Formats** - Import/export CSV, JSON, Parquet, Excel, and SQL files
-   **Demo Data** - Built-in sample datasets (10+ tables with real data)
-   **Schema Explorer** - Visual database schema inspection
-   **Query History** - Track and reuse your previous queries
-   **Export Results** - Export to CSV, JSON, Excel, Parquet, or SQL
-   **Modern UI** - Clean interface with dark/light themes
-   **Keyboard Shortcuts** - Boost productivity with shortcuts
-   **No Backend** - Everything runs in your browser
-   **100% Free** - No signup, no limits, no ads

## 🎯 Quick Start

**Requirements**: Bun 1.0+ (latest version recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/Asif-4520/spdSQL.git
cd spdSQL

# Install dependencies
bun install

# Start development server
bun run dev
```


## 📜 Scripts

```bash
bun run dev       # Start development server
bun run build     # Build for production
bun run preview   # Preview production build
bun run lint      # Run ESLint
```

## 📂 Project Structure

```
src/
├── lib/db/           # Database layer (modular architecture)
│   ├── core/         # DuckDB connection, extensions
│   ├── query/        # SQL execution & schema queries
│   ├── import/       # CSV, JSON, Excel, Parquet import
│   ├── export/       # Export to multiple formats
│   ├── demo/         # Demo data loader (CSV-based)
│   └── data/         # Table schemas and metadata
├── components/       # Reusable React components
├── pages/           # Application pages
├── hooks/           # Custom React hooks
├── context/         # Global state management
├── routes/          # Application routing
└── utils/           # Utility functions

public/
├── extension/       # DuckDB WASM extensions (.wasm)
├── demo-data/       # Demo CSV files (10+ tables)
└── assets/          # Static assets (icons, images)
```

## 🛠️ Technology Stack

-   **Frontend**: React 19 + TypeScript
-   **Build Tool**: Vite 7
-   **Package Manager**: Bun (latest)
-   **Database**: DuckDB WASM 1.33
-   **Editor**: CodeMirror 6
-   **Styling**: CSS Modules + Custom Themes
-   **State Management**: React Context API
-   **Routing**: React Router v7
-   **PWA**: Vite PWA Plugin


**Requirements:**

-   WebAssembly support (enabled by default in modern browsers)
-   JavaScript enabled
-   Minimum 2GB RAM for large datasets
-   Modern hardware for optimal performance

##  Use Cases

-   **Learning SQL**: Practice SQL queries with instant feedback
-   **Testing Queries**: Test SQL syntax and logic safely
-   **Data Analysis**: Quick analysis of CSV, JSON, or Excel files
-   **SQL Tutorials**: Perfect companion for SQL courses
-   **Interview Prep**: Practice SQL interview questions
-   **Data Transformation**: Convert between CSV, JSON, Excel, Parquet
-   **Prototyping**: Rapid database schema prototyping
-   **Teaching**: Demonstrate SQL concepts without setup

## 📄 License

MIT © 2026 [Asif-4520](https://github.com/Asif-4520)

## 🤝 Contributing

Contributions are welcome! Feel free to:

-   Report bugs
-   Suggest new features
-   Submit pull requests
-   Improve documentation


## 📧 Contact

-   **Author**: Asif
-   **GitHub**: [@Asif-4520](https://github.com/Asif-4520)
-   **Project**: [spdSQL](https://github.com/Asif-4520/spdSQL)
-   **Website**: [https://spdsql.vercel.app](https://spdsql.vercel.app)

---

**⭐ If you find spdSQL useful, please give it a star on GitHub!**
