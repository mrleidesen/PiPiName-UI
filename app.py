from fastapi import FastAPI
from typing import Optional
from main import check_name_api, get_name_api

app = FastAPI()


@app.get("/api/status")
async def read_status(name: str):
    return check_name_api(check_name=name, check_name_resource=0)

@app.get("/api/names")
async def read_names(xing: str, source: Optional[int] = 1):
    return get_name_api(name_source=source, last_name=xing)
