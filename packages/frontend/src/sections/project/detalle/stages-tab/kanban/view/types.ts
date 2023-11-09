// ----------------------------------------------------------------------

import { IProject } from "@adp/shared";

export type IKanbanComment = {
  id: string;
  name: string;
  message: string;
  avatarUrl: string;
  messageType: 'image' | 'text';
  createdAt: Date;
};

export type IKanbanAssignee = {
  id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  address: string;
  avatarUrl: string;
  phoneNumber: string;
  lastActivity: Date;
};


export type IKanbanColumn = {
  id: string;
  name: string;
  projectIds: string[];
};

export type IKanban = {
  tasks: Record<string, IProject>;
  columns: Record<string, IKanbanColumn>;
  ordered: string[];
};
