from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class Homepage(BaseModel):
    id: int
    tagline: str
    intro: str
    intro_one: str
    videointro: str
    mission: str
    vision: str
    backgroundpicture: str

class WhoIsJP(BaseModel):
    id: int
    name: str
    description: Optional[str] = None  # Optional dahil minsan wala pa
    family_values: List[str]
    hobbies: List[str]
    short_stories: List[str]
    personality: List[str]

class ViewMyWork(BaseModel):
    id: int
    work_experiences: Optional[str]
    skills: Optional[str]
    projects: Optional[str]
    testimonials: Optional[str]
    tech_stack: Optional[str]

class ServiceOffered(BaseModel):
    id: int
    service_title: str
    description: str
    category: str
    icon_url: Optional[str] = None
    price_range: str

class ContactInfo(BaseModel):
    id: int
    email: str
    phone: str
    linkedin: Optional[str]
    facebook: Optional[str]
    instagram: Optional[str]
    created_at: Optional[datetime]
