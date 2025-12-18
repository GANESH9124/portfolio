from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class BlogsBase(BaseModel):
    title: str
    description: str
    tags: Optional[str]
    images: Optional[List[str]]

class BlogIndividualBase(BaseModel):
    title: str
    content: str
    tags: Optional[str]
    images: Optional[List[str]]

class BlogCreateInsert(BaseModel):
    title: str
    description: str
    content: str
    tags: Optional[str]
    images: Optional[List[str]]

# Response schemas
class Blog(BlogsBase):
    id: int
    views: int
    created_at: datetime
    class Config:
        from_attributes = True

class BlogIndividual(BlogIndividualBase):
    id: int
    views: int
    created_at: datetime
    class Config:
        from_attributes = True

class BlogCreateDisplay(BlogCreateInsert):
    id: int
    views: int
    created_at: datetime
    class Config:
        from_attributes = True