export interface Displayer {
  present(data: unknown): void | Promise<void>;
}
