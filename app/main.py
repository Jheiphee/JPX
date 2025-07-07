import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.models import WhoIsJP, ViewMyWork, ServiceOffered, ContactInfo, Homepage
from app.database import connect_db

app = FastAPI()

# ✅ CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ WHO IS JP Endpoint
@app.get("/whoisjp", response_model=list[WhoIsJP])
def get_who_is_jp():
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Database connection failed")

    try:
        cur = conn.cursor()

        cur.execute("SELECT description FROM about_me WHERE description IS NOT NULL ORDER BY id ASC LIMIT 1;")
        description_row = cur.fetchone()
        description = description_row[0] if description_row else "N/A"

        cur.execute("SELECT family_values FROM about_me WHERE family_values IS NOT NULL ORDER BY id ASC;")
        family_rows = [row[0] for row in cur.fetchall()]

        cur.execute("SELECT hobbies FROM about_me WHERE hobbies IS NOT NULL ORDER BY id ASC;")
        hobbies_rows = [row[0] for row in cur.fetchall()]

        cur.execute("SELECT short_stories FROM about_me WHERE short_stories IS NOT NULL ORDER BY id ASC;")
        short_rows = [row[0] for row in cur.fetchall()]

        cur.execute("SELECT personality FROM about_me WHERE personality IS NOT NULL ORDER BY id ASC;")
        personality_rows = [row[0] for row in cur.fetchall()]

        result = [{
            "id": 1,
            "name": "John Paul Almoroto",
            "description": description,
            "family_values": family_rows,
            "hobbies": hobbies_rows,
            "short_stories": short_rows,
            "personality": personality_rows
        }]
        return JSONResponse(content=result)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()


# ✅ VIEW MY WORK Endpoint
@app.get("/view-my-work", response_model=list[ViewMyWork])
def get_view_my_work():
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Database connection failed")
    try:
        cur = conn.cursor()
        query = """
        SELECT id, work_experiences, skills, projects, testimonials, tech_stack
        FROM view_my_work
        WHERE work_experiences IS NOT NULL 
           OR skills IS NOT NULL 
           OR projects IS NOT NULL 
           OR tech_stack IS NOT NULL
        ORDER BY id ASC;
        """
        cur.execute(query)
        rows = cur.fetchall()
        return [
            ViewMyWork(
                id=row[0], work_experiences=row[1], skills=row[2],
                projects=row[3], testimonials=row[4], tech_stack=row[5]
            ) for row in rows
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()


# ✅ SERVICES OFFERED Endpoint
@app.get("/services-offered", response_model=list[ServiceOffered])
def get_services_offered():
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Database connection failed")
    try:
        cur = conn.cursor()
        query = """
        SELECT id, service_title, description, category, icon_url, price_range
        FROM services_offered
        ORDER BY id ASC;
        """
        cur.execute(query)
        rows = cur.fetchall()
        return [
            ServiceOffered(
                id=row[0], service_title=row[1], description=row[2],
                category=row[3], icon_url=row[4], price_range=row[5]
            ) for row in rows
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

# ✅ ALIAS: /services → /services-offered
@app.get("/services", response_model=list[ServiceOffered])
def get_services_alias():
    return get_services_offered()


# ✅ CONTACT INFO Endpoint
@app.get("/contact-info", response_model=list[ContactInfo])
def get_contact_info():
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Database connection failed")
    try:
        cur = conn.cursor()
        query = """
        SELECT id, email, phone, linkedin, facebook, instagram, created_at
        FROM contact_info
        WHERE email IS NOT NULL
        ORDER BY id ASC;
        """
        cur.execute(query)
        rows = cur.fetchall()
        return [
            ContactInfo(
                id=row[0], email=row[1], phone=row[2],
                linkedin=row[3], facebook=row[4], instagram=row[5],
                created_at=row[6]
            ) for row in rows
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()


# ✅ HOMEPAGE Endpoint
@app.get("/homepage", response_model=Homepage)
def get_homepage():
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Database connection failed")
    try:
        cur = conn.cursor()
        query = """
        SELECT id, tagline, intro, intro_one, videointro, mission, vision, backgroundpicture
        FROM homepage
        WHERE tagline IS NOT NULL
        ORDER BY id ASC
        LIMIT 1;
        """
        cur.execute(query)
        row = cur.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="No homepage data found")
        return Homepage(
            id=row[0],
            tagline=row[1],
            intro=row[2],
            intro_one=row[3],
            videointro=row[4],
            mission=row[5],
            vision=row[6],
            backgroundpicture=row[7],
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()
