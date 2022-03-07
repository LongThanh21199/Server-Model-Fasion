import { User } from "./entity/User";

export type AuthenticatedRequest = {
    user: User
}

export type EntityBoundRequest<T> = {
    entity: T
}

export interface Notification<Payload> {
    to(): User
    payload(): Payload
    type(): string
}
