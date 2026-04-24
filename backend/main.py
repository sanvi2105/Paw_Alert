import os
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from pymongo import MongoClient
from bson import ObjectId

from utils.predict import predict_image

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)
db = client["mydb"]
reports_collection = db["reports"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")


@app.post("/report")
async def report(
    name: str = Form(...),
    phone: str = Form(...),
    location: str = Form(...),
    urgency: str = Form(...),
    description: str = Form(...),
    latitude: float = Form(...),
    longitude: float = Form(...),
    file: UploadFile = File(...)
):
    filename = os.path.basename(file.filename)
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    prediction = predict_image(file_path)

    image_url = f"/uploads/{filename}"

    result = reports_collection.insert_one({
        "name": name,
        "phone": phone,
        "location": location,
        "urgency": urgency,
        "description": description,
        "latitude": latitude,
        "longitude": longitude,
        "image_url": image_url,
        "prediction": prediction,
        "status": "not helped"
    })

    return {
        "message": "Report submitted successfully",
        "prediction": prediction,
        "image_url": image_url,
        "id": str(result.inserted_id)
    }


@app.get("/reports")
def get_reports():
    data = list(reports_collection.find({}))
    for d in data:
        d["_id"] = str(d["_id"])
    return data


@app.put("/update-status")
async def update_status(id: str = Form(...), status: str = Form(...)):
    reports_collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": {"status": status}}
    )
    return {"message": "Status updated"}