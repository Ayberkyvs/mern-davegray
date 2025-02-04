import type { EntityId } from "@reduxjs/toolkit";

export interface UserType {
	id: EntityId;
	username: string;
	roles: string[];
	active: boolean;
}
