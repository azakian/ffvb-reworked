import { ExternalData } from '../external/types';

export interface Displayer {
  present(data: ExternalData): void | Promise<void>;
}
