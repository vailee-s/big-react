import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
	Type,
	Key,
	Ref,
	Props,
	ReactElementType,
	ElementType
} from 'shared/ReactTypes';

// ReactElement

const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElementType {
	const element = {
		// This tag allows us to uniquely identify this as a React Element
		$$typeof: REACT_ELEMENT_TYPE,
		type, // Built-in properties that belong on the element
		key,
		ref,
		props, // Record the component responsible for creating this element.
		__Mark: 'owner'
	};

	return element;
};
export const jsx = (type: ElementType, config: Props, ...children: any[]) => {
	const props: Props = {};
	// 作用: 用于判断是否是自定义组件
	let key: Key = null;
	let ref: Ref = null;

	// 作用: 将config中的属性添加到props中
	for (const prop in config) {
		const val = config[prop]; // 作用: 获取config中的属性值
		if (prop === 'key') {
			// 作用: 判断是否是key属性
			if (val !== undefined) {
				key = '' + val; // 作用: 将key属性值转换为字符串
			}
			continue;
		}
		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}
		// 作用: 将config中的属性添加到props中, 但是不包括key和ref
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}
	// 作用: 将children添加到props中
	const childrenLength = children.length;
	if (childrenLength) {
		if (childrenLength === 1) {
			props.children = children[0];
		} else {
			props.children = children;
		}
	}
	return ReactElement(type, key, ref, props);
};

export const jsxDEV = jsx;
