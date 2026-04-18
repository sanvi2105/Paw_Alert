import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

print("MONGO_URI LOADED:", MONGO_URI)

client = MongoClient(MONGO_URI)

db = client["mydb"]
reports_collection = db["reports"]