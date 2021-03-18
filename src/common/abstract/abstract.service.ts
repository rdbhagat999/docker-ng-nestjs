import {Repository} from "typeorm";
import {PaginatedResult} from "../paginated-result.interface";

// @Injectable()
export abstract class AbstractService {

    protected constructor(protected readonly repo: Repository<any>) { }

    async all(relations = []): Promise<any[]> {
        return await this.repo.find({relations});
    }

    async paginate(page = 1, take = 15, relations = []): Promise<PaginatedResult> {
        if(! page) {
            page = 1;
        }

        if(! take) {
            take = 15;
        }

        const skip = (page - 1) * take;

        const [rows, total] = await this.repo.findAndCount({
            take,
            skip,
            relations
        });

        return {
            data: rows,
            meta: {
                total,
                page,
                take,
                skip,
                last_page: (page == 1 && total <= take) ? 1 : Math.ceil(total / take)
            }
        }
    }

    async findOne(condition, relations = []): Promise<any> {
        return await this.repo.findOne(condition, {relations});
    }

    async create(data): Promise<any> {
        return await this.repo.save(data);
    }

    async update(id: number, data): Promise<any> {
        return await this.repo.update(id, data);
    }

    async delete(id: number): Promise<any> {
        return await this.repo.delete(id);
    }
}
