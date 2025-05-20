export function generateRoomId(userId1, userId2){
    console.log('Generated Room:', [userId1, userId2].sort().join('_'))
    return [userId1, userId2].sort().join('_')
}