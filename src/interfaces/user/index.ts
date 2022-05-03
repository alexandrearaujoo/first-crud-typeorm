export interface UserData {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface ShowUser {
  authorization?: string
}