# main.py
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

class Ticket(BaseModel):
    id: int
    title: str

tickets = []

@app.get("/tickets/", response_model=List[Ticket])
async def get_tickets():
    return tickets

@app.post("/tickets/")
async def create_ticket(ticket: Ticket):
    ticket.id = len(tickets) + 1  # Simple ID generation
    tickets.append(ticket)
    return ticket

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
