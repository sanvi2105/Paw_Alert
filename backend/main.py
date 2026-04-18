from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import shutil
import os

from database import reports_collection
from utils.predict import predict_image

app = FastAPI()

# ---------------- CORS (React connection) ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- Upload folder ----------------
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Serve uploaded images so React can access them
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


# ---------------- ROOT ----------------
@app.get("/")
def home():
    return {"message": "🐾 PawAlert API is running"}


# ---------------- REPORT DOG API ----------------

@app.post("/report")
async def report_dog(
    name: str = Form(...),
    phone: str = Form(...),
    location: str = Form(...),
    description: str = Form(...),
    file: UploadFile = File(...)
):

    try:
        # Save image
        file_path = f"{UPLOAD_DIR}/{file.filename}"

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # AI prediction (SAFE CALL)
        try:
            prediction = predict_image(file_path)
        except Exception as e:
            print("Prediction error:", e)
            prediction = "unknown"

        urgency = "red" if prediction == "injured" else "green"

        report = {
            "name": name,
            "phone": phone,
            "location": location,
            "description": description,
            "image_path": file.filename,
            "prediction": prediction,
            "status": "not helped",
            "urgency": urgency
        }

        reports_collection.insert_one(report)

        return {
            "message": "Report submitted successfully 🐶",
            "prediction": prediction
        }

    except Exception as e:
        print("ERROR IN /report:", e)
        return {"error": str(e)}
    
    

# ---------------- GET ALL REPORTS ----------------
@app.get("/reports")
def get_reports():
    data = list(reports_collection.find({}, {"_id": 0}))
    return {"reports": data}