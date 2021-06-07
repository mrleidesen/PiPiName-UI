from typing import Optional
from fastapi import FastAPI, Query
from main import check_name_api, get_name_api

app = FastAPI()


@app.get("/api/status")
async def read_status(name: str = Query(..., min_length = 2, max_length = 4)):
    return {
        "success": True,
        "data": check_name_api(check_name=name)
    }

@app.get("/api/names")
async def read_names(xing: str = Query(..., min_length = 1, max_length = 2), source: Optional[int] = 1):
    if source < 0 or source > 7:
        return {
            "success": False,
            "msg": "请选择0-7的参数"
        }
    return {
        "success": True,
        "data": get_name_api(name_source=source, last_name=xing)
    }
