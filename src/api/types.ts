export type HostRoomResponse = {
  room_id: string;
  access_token: string;
}

export type FindParticipantsResponse = {
  room_id: string;
  name: string;
  is_admin: boolean;
  created_at: string;
}[]
