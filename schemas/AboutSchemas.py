from datetime import datetime
from pydantic import BaseModel
from typing import Optional, List

# --- Reading Books ---
class ReadingBooksBase(BaseModel):
    title: str
    author: str
    quote: Optional[str]
    freelink: Optional[str]
    images: Optional[List[str]]

class ReadingBooks(ReadingBooksBase):
    id: int
    class Config:
        from_attributes = True

# --- Binge Watching ---
class BingeWatchingBase(BaseModel):
    title: str
    studios: str
    quote: Optional[str]
    freelink: Optional[str]
    images: Optional[List[str]]

class BingeWatching(BingeWatchingBase):
    id: int
    class Config:
        from_attributes = True

# --- Traveling ---
class TravelingBase(BaseModel):
    destination: str
    experience: Optional[str]
    images: Optional[List[str]]

class Traveling(TravelingBase):
    id: int
    class Config:
        from_attributes = True