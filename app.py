from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/posts/{post_name}", response_class=HTMLResponse)
async def show_post(request: Request, post_name: str):
    return templates.TemplateResponse(f"posts/{post_name}.html", {"request": request, "title": post_name.replace('-', ' ').title()})

@app.get("/{page_name}", response_class=HTMLResponse)
async def show_page(request: Request, page_name: str):
    return templates.TemplateResponse(f"{page_name}.html", {"request": request, "title": page_name.replace('-', ' ').title()})
