from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class URLRequest(BaseModel):
    url: str

@app.post("/predict")
def predict(request: URLRequest):
    url = request.url

    # Simple logic (you can replace with your ML later)
    if "phish" in url:
        return {"prediction": "Malicious ⚠️"}
    else:
        return {"prediction": "Safe ✅"}