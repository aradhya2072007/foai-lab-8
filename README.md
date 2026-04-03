# 🎨 AI Image Generator (SDXL 1.0)

A premium, interactive text-to-image generator built with **React**, **Vite**, and **Hugging Face Inference API**. This application features a stunning glassmorphism UI, real-time generation history, and one-click image downloads.

![AI Image Generator Preview](https://github.com/aradhya2072007/foai-lab-8/blob/main/public/preview.png?raw=true)

---

## ✨ Features

- **🚀 SDXL 1.0 powered**: Uses the latest Stable Diffusion XL model for high-fidelity images.
- **💎 Premium UI**: Modern glassmorphism design with animated background blobs and noise textures.
- **📦 History & Gallery**: Automatically saves your recent creations to your browser's local storage.
- **💾 Easy Downloads**: Instantly save your generated masterpieces to your device.
- **⚡ Fast Inference**: optimized API routing with production-ready proxy configuration.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: Vanilla CSS (Modern Custom Properties)
- **API**: [Hugging Face Inference API](https://huggingface.co/docs/api-inference/index)
- **Deployment**: [Vercel](https://vercel.com/) (with `vercel.json` rewrites)

---

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/aradhya2072007/foai-lab-8.git
   cd foai-lab-8
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   Create a `.env` file in the root and add your Hugging Face Token:
   ```env
   VITE_HF_TOKEN=your_token_here
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

---

## 🌐 Deployment on Vercel

This project is optimized for Vercel. 

1. Push your code to GitHub.
2. Connect your repo in the [Vercel Dashboard](https://vercel.com/dashboard).
3. **Important**: Add `VITE_HF_TOKEN` in the Environment Variables section.
4. Deployment will automatically handle the API proxying via `vercel.json`.

---

## 📄 License

MIT. Feel free to use and modify for your own projects!
