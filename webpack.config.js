import * as path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import WebpackObfuscatorPlugin from "webpack-obfuscator";

const config = {
    entry: './js/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(path.dirname('web'), 'web'),
        publicPath: 'auto'
    },
    mode: 'production',
    module: {
        rules: [
            // this is the typescript loader, finds ts and tsx files
            {test: /\.tsx?$/, loader: 'ts-loader'},
            // this is the regular css loader, excludes module.css files
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
                exclude: /\.module\.css$/
            },
            {
                test: /\.(svg|png|jpe?g|gif|woff2|wav|mp3)$/i,
                type: 'asset/resource',
            }
        ]
    },
    resolve: {
        // these are file extensions that are auto recognized by webpack via component module imports
        extensions: ['.js', '.css']
    },
    plugins: [
        // injects the script into the template body without async or defer (blocking)
        new HtmlWebpackPlugin({
            inject: 'body',
            template: 'index.html'
        }),
        new WebpackObfuscatorPlugin ({
            rotateStringArray: true
        }, [])
    ],
    /**
     * This devserver controls the webpack dev server. You can change the port and directory, as well as other options
     * https://webpack.js.org/configuration/dev-server/
     */
    devServer: {
        open: true,
        port: 9000,
        historyApiFallback: true,
        devMiddleware: {
            index: './web/index.html', // where is the template file located
            writeToDisk: true
        },
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
        },
        static: {
            directory: path.resolve(path.dirname('web'), 'web'),
            staticOptions: {},
            serveIndex: true,
            watch: true
        }
    },
}

export default config;