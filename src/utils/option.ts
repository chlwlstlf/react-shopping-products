import { Option } from '../types/Option.type';

export const findByKey = (key: string, list: Option[]) => list.find((item) => item.key === key);

export const findByName = (name: string, list: Option[]) => list.find((item) => item.name === name);
