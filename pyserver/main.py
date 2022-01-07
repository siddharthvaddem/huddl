from fastapi import FastAPI, status, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from deta import Deta
from pydantic import BaseModel

deta = Deta('c0n3pup7_D4aKMCt5wDckurk9wJrk2RB5tgnwhww7');
doc_db = deta.Base('docdb')
room_db=deta.Base('roomdb') 

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# db methods
def get_rooms():
    return room_db.fetch(limit=1000).items


# Models
class Room(BaseModel):
    id: str

# validation
def room_exist(room_id):
    rooms = get_rooms()
    #print(rooms)
    for room in rooms:
        if room['value'] == room_id:
            return True
    else:
        return False

'''
/room (post for creating)
/room/joinRoom (post for joining)
/docs (post for saving doc)
/docs (patch for updating doc)
/docs/fetch/:id (get for fetching doc)
/docs/:id (delete for deleting doc)
'''

'''
Room Routes
'''
@app.post("/room", status_code=201)
async def create_room(room: Room):
    room_id = room.id
    if not room_exist(room_id):
        res = room_db.put({"value": room_id})
        return res["value"]
    else:
        raise HTTPException(status_code=422, detail="Room already exists")

@app.post("/room/joinRoom", status_code=201)
async def join_room(room: Room):
    room_id = room.id
    if not room_exist(room_id):
        raise HTTPException(status_code=404, detail="Room doesn't exist")
    else:
        return "successfull"

@app.get("/room/check/{room_id}", status_code=201)
async def check_room(room_id: str):
    if not room_exist(room_id):
        return False
    return True

'''
Docs Routes
'''
@app.post("/docs", status_code=201)
async def create_doc(request: Request):
    res = await request.json()
    res = doc_db.put(res["data"])
    print(res)
    return res
    
@app.get("/docs/fetch/{id}", status_code=201)
async def fetch_doc(id: str):
    res = doc_db.get(id)
    if res:
        return res
    else:
        raise HTTPException(status_code=404, detail="Document doesn't exist")

@app.delete("/docs/{id}", status_code=201)
async def delete_doc(id: str):
    res = doc_db.delete(id)
    return { "message": 'deleted' }

@app.patch("/docs", status_code=201)
async def update_doc(request: Request):
    data = await request.json()
    update = {"key": data["docID"], "json": data["json"], "roomcode": data["roomcode"]}
    res = doc_db.put(update)
    return update