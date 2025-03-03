# AI Agent GUI

AI Agent GUI project, web based drag and drop graphical user interface for building and executing AI agent workflows. This project allows users to create complex AI-driven tasks through a drag-and-drop interface, making it easy to design, visualize, and execute sophisticated AI workflows.

## Features

- Drag-and-drop interface for creating AI workflows
- Visual representation of workflow steps
- Custom code execution support for multiple languages
- HTTP request blocks (GET, POST, PUT)
- File upload and download capabilities
- Web scraping functionality for emails and phone numbers
- Data collection and organization tools
- Undo functionality for deleted blocks
- Real-time execution of AI agent tasks
- Detailed step-by-step breakdown of AI actions

## Installation

To get started with AI Agent GUI, follow these steps:

1. Clone the repository:
   \`\`\`
   git clone https://github.com/yourusername/ai-agent-gui.git
   cd ai-agent-gui
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

3. Set up environment variables:
   Create a \`.env.local\` file in the root directory and add your OpenAI API key:
   \`\`\`
   OPENAI_API_KEY=your_api_key_here
   \`\`\`

4. Start the development server:
   \`\`\`
   npm run dev
   \`\`\`

5. Open your browser and navigate to \`http://localhost:3000\` to use the AI Agent GUI.

## Usage

1. **Creating a Workflow**:
   - Drag blocks from the sidebar onto the canvas.
   - Configure each block by clicking on it and filling in the required information.
   - Arrange the blocks in the desired order of execution.

2. **Executing a Workflow**:
   - Once your workflow is set up, click the "Execute Workflow" button.
   - The AI agent will process each block and display the results in a modal.

3. **Managing Blocks**:
   - To delete a block, click the "X" button on the block.
   - To undo a deletion, use the "Undo Delete" button at the bottom of the canvas.

4. **Viewing the Workflow**:
   - The visual flow at the bottom of the page shows the sequence of your workflow steps.

## Contributing

We welcome contributions to the AI Agent GUI project! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive commit messages.
4. Push your changes to your fork.
5. Submit a pull request to the main repository.

Please ensure that your code adheres to the existing style and that you have tested your changes thoroughly.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions about the AI Agent GUI, please open an issue on the GitHub repository or contact the maintainers directly.

## Acknowledgements

- This project uses the [OpenAI API](https://openai.com/api/) for AI text generation.
- UI components are built with [shadcn/ui](https://ui.shadcn.com/).
- Drag and drop functionality is implemented using [react-dnd](https://react-dnd.github.io/react-dnd/).

Thank you for using and contributing to the AI Agent GUI project!

