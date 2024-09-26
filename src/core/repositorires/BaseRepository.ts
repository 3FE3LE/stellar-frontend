export interface BaseRepository<T, ID> {
  getAll(): Promise<T>;
  getById(id: ID): Promise<T | null>;
  create(data: T): Promise<T>;
  update(id: ID, data: T): Promise<T>;
  delete(id: ID): Promise<T>;
}
