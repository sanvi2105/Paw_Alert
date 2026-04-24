from ultralytics import YOLO
from PIL import Image

# load model ONCE (good practice)
model = YOLO("yolov8n.pt")


def predict_image(image_path):
    image = Image.open(image_path)

    results = model(image)

    detections = []

    for r in results:
        for box in r.boxes:
            cls = int(box.cls[0])
            label = model.names[cls]
            conf = float(box.conf[0])

            detections.append({
                "label": label,
                "confidence": conf
            })

    return detections