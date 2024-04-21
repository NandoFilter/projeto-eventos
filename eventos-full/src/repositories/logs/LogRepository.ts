export interface LogRepository {
  add(operation: string, route: string): Promise<any>
}