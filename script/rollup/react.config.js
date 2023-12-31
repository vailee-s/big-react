import { getBaseRollupPlugins, getPackageName, resolvePkgPath } from './utils';
import generationPackageJson from 'rollup-plugin-generate-package-json';

const { name, module } = getPackageName('react'); // package.json中的name字段
// react包的路径
const pkgPath = resolvePkgPath(name);
// react包的产物路径
const distPath = resolvePkgPath(name, true);
export default [
	// react
	{
		input: `${pkgPath}/${module}`,
		output: {
			file: `${distPath}/index.js`,
			name: 'index.js',
			format: 'umd'
		},
		plugins: [
			...getBaseRollupPlugins(),
			generationPackageJson({
				inputFolder: pkgPath,
				outputFolder: distPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					main: 'index.js'
				})
			})
		]
	},
	// jsx-runtime
	{
		input: `${pkgPath}/src/jsx.ts`,
		output: [
			// jsx-runtime
			{
				file: `${distPath}/jsx-runtime.js`,
				name: 'jsx-runtime.js',
				format: 'umd'
			},
			// jsx-dev-runtime
			{
				file: `${distPath}/jsx-dev-runtime.js`,
				name: 'jsx-dev-runtime.js',
				format: 'umd'
			}
		],
		plugins: getBaseRollupPlugins()
	}
];
