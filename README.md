# Danial Pahlavan's Personal Website

This project is my personal portfolio website, built with the **FastAPI** framework and the **Jinja2** templating engine. It showcases my resume, projects, blog, and contact information.

## ✨ Features

-   **FastAPI-Powered:** High-speed and optimal performance in handling requests.
-   **Server-Side Rendering (SSR):** Uses Jinja2 to render HTML pages on the server.
-   **Responsive Design:** Compatible with various devices (desktops, tablets, and mobile phones).
-   **Modular Structure:** Separates application logic using FastAPI routers.
-   **Deployment-Ready:** Configured for easy deployment on the **Render** platform.

## 🛠️ Technologies Used

-   **Backend:** [Python](https://www.python.org/)
-   **Framework:** [FastAPI](https://fastapi.tiangolo.com/)
-   **Template Engine:** [Jinja2](https://jinja.palletsprojects.com/)
-   **Server:** [Uvicorn](https://www.uvicorn.org/)
-   **Deployment:** [Render](https://render.com/)

## 📂 Project Structure

```
.
├── app.py                  # Main application file and FastAPI entry point
├── requirements.txt        # Project dependencies list
├── render.yaml             # Configuration file for deployment on Render
├── static/                 # Static files (CSS, JS, images)
├── templates/              # HTML templates (Jinja2)
│   ├── layouts/            # Base layout templates
│   ├── includes/           # Reusable components (e.g., header, footer)
│   └── ...
└── routers/
    └── pages.py            # Main router for handling page routes
```

## 🚀 Setup and Run

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/DanialPahlavan/danialpahlavan.github.io.git
    cd danialpahlavan.github.io
    ```

2.  **Create and activate a virtual environment (recommended):**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Run the application:**
    ```bash
    uvicorn app:app --reload
    ```



## ☁️ Deployment

This project is configured for deployment on the **Render** platform. The `render.yaml` file contains all the necessary settings to build and run the application. Simply connect this repository to your Render account, and it will be deployed automatically.
