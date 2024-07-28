import { Timestamp } from "firebase/firestore";

type entityType = {
  id: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  deletedAt?: Timestamp;
};

type UserType = {
  avatar?: string;
  fname: string;
  lname: string;
  phone: string;
  email: string;
  role: "voter" | "admin";
} & entityType;

type Contestant = {
  avatar: string;
  status:"active"|"evicted"
  name: string;
  telephone: string;
  univercity: string;
  motivationSpeech: string;
  bio: string;
  votes: Vote[];
} & entityType;

type Vote = {
  from: string;
  for: string;
  point: number;
} & entityType;

type Transaction = {
  amount: number;
  voteId: number;
  paymentMethod: string;
} & entityType;
