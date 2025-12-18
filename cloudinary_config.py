import cloudinary
import cloudinary.uploader
import os
from dotenv import load_dotenv

load_dotenv()

# Configuration       
print(f"DEBUG: Cloud Name loaded: {os.getenv('CLOUDINARY_CLOUD_NAME')}")
print(f"DEBUG: API Key loaded: {os.getenv('CLOUDINARY_API_KEY')}")

cloudinary.config( 
    cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME", "demo"), 
    api_key = os.getenv("CLOUDINARY_API_KEY", "your_api_key"), 
    api_secret = os.getenv("CLOUDINARY_API_SECRET", "your_api_secret"),
    secure = True
)
