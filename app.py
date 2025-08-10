from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from routers import pages

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/healthz")
async def health_check():
    return {"status": "ok"}

@app.get("/robots.txt")
async def robots_txt():
    return FileResponse("static/robots.txt")

@app.get("/favicon.png", include_in_schema=False)
async def favicon():
    return FileResponse("static/favicon.png")

app.include_router(pages.router)
