from fastapi import FastAPI, Depends, HTTPException, status, Security
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List
import os
import models, database, auth_utils
from datetime import timedelta
from schemas import (
    ProjectSchemas, 
    BlogSchemas,
    AboutSchemas
)

# Create tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000",
    "http://localhost:8010",
    os.getenv("FRONTEND_URL"),
    os.getenv("VERCEL_URL"),
]

# Filter out None values in case env vars are not set
origins = [origin for origin in origins if origin]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Security ---
# We use auth_utils.verify_token for protection
# We use auth_utils.SECRET_KEY for checking password (simplification)

@app.post("/auth/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # Simple check: Is the password equal to our ADMIN_SECRET?
    if form_data.password != auth_utils.SECRET_KEY:
        raise HTTPException(status_code=400, detail="Incorrect password")
    
    access_token_expires = timedelta(minutes=auth_utils.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth_utils.create_access_token(
        data={"sub": form_data.username, "role": "admin"}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

from fastapi import UploadFile, File
import cloudinary_config
import cloudinary.uploader

@app.post("/upload")
async def upload_images(files: List[UploadFile] = File(...), authorized: bool = Depends(auth_utils.verify_token)):
    if len(files) > 4:
        raise HTTPException(status_code=400, detail="Maximum 4 images allowed")
    
    image_urls = []
    for file in files:
        # Upload to Cloudinary
        result = cloudinary.uploader.upload(file.file, folder="portfolio_test")
        image_urls.append(result.get("secure_url"))
        
    return {"images": image_urls}

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Portfolio Backend API"}

# --- Projects ---

@app.get("/projects", response_model=List[ProjectSchemas.Project])
def read_projects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    projects = db.query(models.Project).offset(skip).limit(limit).all()
    return projects

@app.post("/projects", response_model=ProjectSchemas.Project, status_code=status.HTTP_201_CREATED)
def create_project(project: ProjectSchemas.ProjectBase, db: Session = Depends(get_db), authorized: bool = Depends(auth_utils.verify_token)):
    db_project = models.Project(**project.model_dump())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

# --- Blogs ---

@app.get("/blogs", response_model=List[BlogSchemas.Blog])
def read_blogs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    blogs = db.query(models.Blog).offset(skip).limit(limit).all()
    return blogs

@app.post("/blogs", response_model=BlogSchemas.BlogCreateDisplay, status_code=status.HTTP_201_CREATED)
def create_blog(blog: BlogSchemas.BlogCreateInsert, db: Session = Depends(get_db), authorized: bool = Depends(auth_utils.verify_token)):
    db_blog = models.Blog(**blog.model_dump())
    db.add(db_blog)
    db.commit()
    db.refresh(db_blog)
    return db_blog

@app.get("/blogs/{blog_id}", response_model=BlogSchemas.BlogIndividual)
def read_blog(blog_id: int, db: Session = Depends(get_db)):
    blog = db.query(models.Blog).filter(models.Blog.id == blog_id).first()
    if blog is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    # Increment views
    blog.views += 1
    db.commit()
    db.refresh(blog)
    return blog

# --- Reading Books ----

@app.get("/about/reading", response_model=List[AboutSchemas.ReadingBooks])
def read_books(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    books = db.query(models.Books).offset(skip).limit(limit).all()
    return books

@app.post("/about/reading", response_model=AboutSchemas.ReadingBooks, status_code=status.HTTP_201_CREATED)
def create_book(book: AboutSchemas.ReadingBooksBase, db: Session = Depends(get_db), authorized: bool = Depends(auth_utils.verify_token)):
    db_book = models.Books(**book.model_dump())
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

# --- Binge Watching ---

@app.get("/about/binge", response_model=List[AboutSchemas.BingeWatching])
def read_binge(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    binge = db.query(models.MoviesAnime).offset(skip).limit(limit).all()
    return binge

@app.post("/about/binge", response_model=AboutSchemas.BingeWatching, status_code=status.HTTP_201_CREATED)
def create_movieanime(movieanime: AboutSchemas.BingeWatchingBase, db: Session = Depends(get_db), authorized: bool = Depends(auth_utils.verify_token)):
    db_movieanime = models.MoviesAnime(**movieanime.model_dump())
    db.add(db_movieanime)
    db.commit()
    db.refresh(db_movieanime)
    return db_movieanime

# --- Traveling ---

@app.get("/about/travel", response_model=List[AboutSchemas.Traveling])
def read_travel(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    travel = db.query(models.Travel).offset(skip).limit(limit).all()
    return travel

@app.post("/about/travel", response_model=AboutSchemas.Traveling, status_code=status.HTTP_201_CREATED)
def create_travel(travel: AboutSchemas.TravelingBase, db: Session = Depends(get_db), authorized: bool = Depends(auth_utils.verify_token)):
    db_travel = models.Travel(**travel.model_dump())
    db.add(db_travel)
    db.commit()
    db.refresh(db_travel)
    return db_travel
