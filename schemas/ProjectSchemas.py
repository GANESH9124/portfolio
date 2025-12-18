from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class ProjectBase(BaseModel):
    title: str
    description: str
    images: Optional[List[str]]
    link: Optional[str]
    tags: Optional[str]

class Project(ProjectBase):
    id: int
    views: int
    created_at: datetime

    class Config:
        from_attributes = True