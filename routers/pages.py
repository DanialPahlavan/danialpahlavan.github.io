from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from jinja2.exceptions import TemplateNotFound
from config import settings

router = APIRouter()
templates = Jinja2Templates(directory="templates")

@router.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "title": "Home", "site_title": settings.SITE_TITLE})

@router.get("/posts/{post_name}", response_class=HTMLResponse)
async def show_post(request: Request, post_name: str):
    try:
        return templates.TemplateResponse(f"posts/{post_name}.html", {"request": request, "title": post_name.replace('-', ' ').title(), "site_title": settings.SITE_TITLE})
    except TemplateNotFound:
        raise HTTPException(status_code=404, detail="Post not found")

@router.get("/{page_name:path}", response_class=HTMLResponse)
async def show_page(request: Request, page_name: str):
    if not page_name.endswith('.html'):
        page_name += '.html'
    
    try:
        return templates.TemplateResponse(page_name, {"request": request, "title": page_name.replace('.html', '').replace('-', ' ').title(), "site_title": settings.SITE_TITLE})
    except TemplateNotFound:
        return templates.TemplateResponse("404.html", {"request": request, "title": "Page Not Found", "site_title": settings.SITE_TITLE}, status_code=404)
