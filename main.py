from fastapi import FastAPI
from pydantic import BaseModel
from backup_agent import process_ticket
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Ticket(BaseModel):

    ticket_id: str
    vm_name: str
    description: str

@app.get("/")
def home():

    return {
        "message": "AI Cloud Backup Agent Running"
    }

@app.post("/create-backup")
def create_backup(ticket: Ticket):

    result = process_ticket(
        ticket.description,
        ticket.vm_name
    )

    return {

        "ticket_id": ticket.ticket_id,
        "agent_result": result
    }