# Shopping List

A simple, elegant shopping list web application to help you keep track of what you need.

![Shopping List App](tests/screenshots/web_tc007_after_refresh_2026-01-20T05-40-47-555Z.png)

## Features

- **Add Items** - Quickly add items to your shopping list
- **Mark Complete** - Check off items as you shop
- **Delete Items** - Remove items you no longer need
- **Filter View** - View All, Active, or Completed items
- **Clear Completed** - Remove all checked items at once
- **Persistent Storage** - Your list is saved locally and persists across sessions
- **Responsive Design** - Works great on desktop and mobile devices

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3.x (for local server) or any static file server

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/shayke-cohen/shopping-list.git
   cd shopping-list
   ```

2. Start a local server:
   ```bash
   cd src && python3 -m http.server 3000
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Alternative: Using Node.js

```bash
npx serve src -p 3000
```

## Usage

1. **Add an item**: Type in the input field and click "Add" or press Enter
2. **Complete an item**: Click the checkbox next to an item
3. **Delete an item**: Hover over an item and click the X button
4. **Filter items**: Click "All", "Active", or "Completed" buttons
5. **Clear completed**: Click "Clear completed" to remove all checked items

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS custom properties
- **Vanilla JavaScript** - No frameworks, pure JS with ES6+ features
- **LocalStorage** - Client-side data persistence
- **Inter Font** - Clean, modern typography from Google Fonts

## Project Structure

```
├── src/
│   ├── index.html      # Main HTML file
│   ├── styles.css      # CSS styles
│   └── app.js          # JavaScript application logic
├── tests/
│   ├── TEST_PLAN.md    # Test plan and results
│   ├── e2e/            # End-to-end test files
│   ├── screenshots/    # Test screenshots
│   └── videos/         # Test recordings
└── README.md           # This file
```

## Testing

The application has been tested with a comprehensive E2E test suite.

### Test Results

| Test Case | Description | Status |
|-----------|-------------|--------|
| TC-001 | Add New Item | PASSED |
| TC-002 | Mark Item as Completed | PASSED |
| TC-003 | Delete Item | PASSED |
| TC-004 | Filter by Active | PASSED |
| TC-005 | Filter by Completed | PASSED |
| TC-006 | Clear Completed | PASSED |
| TC-007 | Data Persistence | PASSED |

**Pass Rate: 100%**

For detailed test information, see [tests/TEST_PLAN.md](tests/TEST_PLAN.md).

### Running Tests

Tests are run using the [AI Tester MCP](https://github.com/testengai/ai-tester) which provides automated E2E testing with Playwright.

**Using Cursor IDE with AI Tester MCP:**
```
Run the test file: tests/e2e/shopping-list.yaml
```

**Using AI Tester CLI:**
```bash
# Run tests (no install needed, uses npx)
npx @shaykec/ai-tester run-test --platform web --url http://localhost:3000 --path tests/e2e/shopping-list.yaml

# Or install globally
npm install -g @shaykec/ai-tester
ai-tester run-test --platform web --url http://localhost:3000 --path tests/e2e/shopping-list.yaml
```

**Test file format:** The tests use a YAML-based format compatible with AI Tester:
```yaml
- inputText:
    selector: "#itemInput"
    text: "Apples"
- tapOn:
    selector: ".add-btn"
- assertVisible:
    text: "Apples"
```

## Development Workflow

This project uses an AI-assisted development workflow with GitHub Issues, automated testing, and AI Tester integration.

### Issue-Driven Development

1. **Browse Issues**: Check [open issues](https://github.com/shayke-cohen/shopping-list/issues) for available tasks
2. **Start Work**: Use the workflow script to begin:
   ```bash
   ./scripts/start-issue.sh <issue-number>
   ```
3. **Implement**: Follow the task file created at `.cursor-task.md`
4. **Test**: Run E2E tests with AI Tester before submitting
5. **Finish**: Create a PR with the finish script:
   ```bash
   ./scripts/finish-issue.sh <issue-number>
   ```

### AI Tester Integration

Tests are automatically created and run using AI Tester:

- **Screenshots**: Captured at each test step in `tests/screenshots/`
- **Videos**: Full session recordings in `tests/videos/`
- **YAML Tests**: Reusable test definitions in `tests/e2e/`

### Workflow Scripts

| Script | Purpose |
|--------|---------|
| `./scripts/start-issue.sh <n>` | Start working on issue #n |
| `./scripts/finish-issue.sh <n>` | Create PR for issue #n |
| `./scripts/check-ci.sh` | Verify CI status |

---

## AI-Assisted Development

This repository is designed for AI-assisted development using Cursor IDE with MCP tools.

### Example Prompts

**Starting work on an issue:**
```
Start work on issue #1
```

**Running tests:**
```
Run the E2E tests for the shopping list app using AI Tester
```

**Creating new tests:**
```
Create an E2E test for the edit item feature
```

**Exploring the app:**
```
Open the shopping list app and show me the current state
```

**Code review:**
```
Review my changes and suggest improvements
```

**Creating a PR:**
```
Create a PR for issue #1 with a summary of changes
```

**Fixing test failures:**
```
The test failed on step 3. Analyze the screenshot and fix the issue.
```

### MCP Tools Available

This project uses the following MCP servers (configured in `.cursor/mcp.json`):

- **AI Tester** (`@shaykec/ai-tester`): Automated E2E testing with screenshots/videos
- **AI Native Engineer** (`@shaykec/ai-native-engineer`): Project templates and workflows
- **Octocode** (`octocode-mcp`): GitHub code research and exploration

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

### Quick Start

1. Fork the repository
2. Start work on an issue: `./scripts/start-issue.sh <issue-number>`
3. Implement and test your changes
4. Create a PR: `./scripts/finish-issue.sh <issue-number>`

### Manual Workflow

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [Inter Font](https://fonts.google.com/specimen/Inter) by Rasmus Andersson
- Inspired by TodoMVC
