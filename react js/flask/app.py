from flask import Flask, request, jsonify
import os
import fitz  # This should work correctly
from transformers import pipeline
from flask_cors import CORS  # ✅ Import CORS to allow frontend requests

# Create Flask app
app = Flask(__name__)
CORS(app)  # ✅ Enable CORS for cross-origin requests

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load ML model (Sentiment Analysis)
sentiment_model = pipeline("sentiment-analysis")

def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = "".join(page.get_text("text") for page in doc)
    return text

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    pdf_text = extract_text_from_pdf(filepath)
    
    if not pdf_text.strip():
        return jsonify({"error": "PDF contains no text"}), 400

    result = sentiment_model(pdf_text[:512])  # Limit text for faster processing

    return jsonify({"message": "File processed successfully!", "sentiment": result})

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)  # ✅ Running locally
    print("Backend running on port 5000")
