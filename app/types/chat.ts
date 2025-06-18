
export interface User {
  id: string;
  name: string;
  isLawyer: boolean;
  avatar: string;
}

export interface Message {
  id: string;
  text: string;
  sender: User;
  timestamp: Date;
  type: 'text' | 'image' | 'video' | 'document';
  fileName?: string;
  fileUrl?: string;
}
