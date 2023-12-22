export type Type = string | Function;
export type Key = any;
export type Props = any;
export type Ref = any;
export type ElementType = any;

export interface ReactElementType {
	$$typeof: symbol | number;
	type: ElementType;
	key: Key;
	ref: Ref;
	props: Props;
	__Mark: string;
}
