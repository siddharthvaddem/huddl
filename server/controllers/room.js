var roomId = null

export const createRoom = async (req,res) => {
    const room = req.body;
    roomId = room.id
    res.status(201).json(room.id)
    console.log(roomId)
}


export const joinRoom = async (req,res) => {
    const joinRoomId = req.body;
    if(joinRoomId.id === roomId){
        res.status(201).json("successfull")
    }else{
        res.status(404).json("Invalid room id")
    }
}