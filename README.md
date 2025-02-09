# SecureGPT

SecureGPT is an AI-powered cybersecurity education assistant designed to help users learn about security concepts, best practices, and common vulnerabilities. It provides accurate and helpful information on cybersecurity topics while ensuring user-friendly interaction.

![Logo](https://github.com/shoaibbshaikhh/SecureGPT/blob/main/logo.png)

## Features

- Interactive chatbot for cybersecurity queries
- Real-time response generation using `deepseek-coder-v2`
- Identity filtering to maintain a focused security discussion
- Simple and clean UI with Tailwind CSS styling
- Secure and ethical AI interaction

## Installation & Setup

### Prerequisites

Before running SecureGPT, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Ollama](https://ollama.ai/) for running `deepseek-coder-v2`

### Clone the Repository

```sh
git clone https://github.com/shoaibbshaikhh/SecureGPT.git
cd SecureGPT
```

### Install Dependencies

Using npm:
```sh
npm install
```

### Setup Ollama and Deepseek-Coder

1. Install [Ollama](https://ollama.ai/docs/installation) on your system.
2. Pull the `deepseek-coder-v2` model:

```sh
ollama pull deepseek-coder-v2
```

3. Start the model server:

```sh
ollama run deepseek-coder-v2
```

Ensure that the model is running on `localhost:11434` before starting the SecureGPT application.

### Start the Application

Run the development server:

```sh
npm run dev
```

The app will be accessible at `http://localhost:5173`.

## Usage

1. Open SecureGPT in your browser.
2. Type your cybersecurity-related query in the input field.
3. Get an accurate and informative response from SecureGPT.

## Project Structure

```
SecureGPT/
├── src/
│   ├── components/      # UI Components
│   ├── assets/          # Static Assets
│   ├── App.tsx         # Main Application File
│   ├── index.tsx       # Entry Point
├── public/              # Static Files
├── package.json         # Project Dependencies
├── tailwind.config.js   # Tailwind CSS Configuration
├── README.md            # Project Documentation
```

## Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a new branch (`feature-branch`)
3. Commit your changes
4. Push to your fork and submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Developed by **Shoaib Shaikh**. Connect with me on [GitHub](https://github.com/shoaibbshaikhh).

---

For any issues or feature requests, please open an [issue](https://github.com/shoaibbshaikhh/SecureGPT/issues).

