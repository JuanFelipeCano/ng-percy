import { Injectable } from '@angular/core';
import { KeyboardKeys } from '../../constants';

type KeysMapper = Partial<Record<KeyboardKeys, () => void>>;

@Injectable()
export class KeyboardExecutorService {

  public execute(keysMapper: KeysMapper, event: KeyboardEvent): void {
    const callback = keysMapper[event.code as keyof typeof keysMapper];

    if (!callback) return;

    callback();

    event.stopPropagation();
    event.preventDefault();
  }
}
