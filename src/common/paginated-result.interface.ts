export interface PaginatedResult {
    data: any[];
    meta: {
        total: number,
        page: number,
        take: number,
        skip: number,
        last_page: number
    };
}
