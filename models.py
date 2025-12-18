from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.dialects.postgresql import ARRAY
from datetime import datetime
from database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    images = Column(ARRAY(String), nullable=True) # Changed from image_url
    link = Column(String, nullable=True)
    tags = Column(String)  # Comma-separated
    views = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

class Blog(Base):
    __tablename__ = "blogs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    content = Column(Text)
    images = Column(ARRAY(String), nullable=True) # Changed from image_url
    tags = Column(String)
    views = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

class Books(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    author = Column(String)
    quote = Column(String, nullable=True)
    freelink = Column(String, nullable=True)
    images = Column(ARRAY(String), nullable=True) # Changed from image_url

class MoviesAnime(Base):
    __tablename__ = "movies_anime"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    studios = Column(String)
    quote = Column(String, nullable=True)
    freelink = Column(String, nullable=True)
    images = Column(ARRAY(String), nullable=True) # Changed from image_url

class Travel(Base):
    __tablename__ = "travel"

    id = Column(Integer, primary_key=True, index=True)
    destination = Column(String, index=True)
    experience = Column(String, nullable=True)
    images = Column(ARRAY(String), nullable=True) # Changed from image_url