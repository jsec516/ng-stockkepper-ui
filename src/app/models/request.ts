import {RequestItem} from './request-item';
import {AllocatedItem} from './allocated-item';

export class Request {
    id: number;
    items: Array<RequestItem> = [new RequestItem()];
    allocations: Array<AllocatedItem> = [];
    notes: string;
}