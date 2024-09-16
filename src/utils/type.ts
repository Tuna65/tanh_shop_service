export type TMsgResponse = {
  status: boolean;
  message: string;
};

export class Pagination {
  page: number;
  limit: number;
}

export class PaginationDTO {
  page = 1;
  limit = 20;
}
