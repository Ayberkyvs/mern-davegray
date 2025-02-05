import type { EntityId } from "@reduxjs/toolkit";

export interface UserType {
	id: EntityId | number;
	username: string;
	roles: string[];
	active: boolean;
}
