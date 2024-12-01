// Подключаем необходимые пакеты
const path = require('path'); // Для работы с путями
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Для генерации HTML файла
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Для извлечения CSS в отдельные файлы

module.exports = (env, argv) => {
    // Определяем, находимся ли мы в режиме продакшн или девелопмент
    const isProduction = argv.mode === 'production';

    return {
        // Входная точка, куда Webpack будет смотреть для начала сборки
        entry: './src/index.tsx', // Входной файл с кодом для сборки

        // Устанавливаем режим сборки
        mode: isProduction ? 'production' : 'development', // Определяем режим (разработка или продакшн)

        // Настройки вывода
        output: {
            // Папка для сборки
            path: path.resolve(__dirname, 'build'), // Указываем путь для выходных файлов
            // Имя файла после сборки
            filename: isProduction ? '[name].[contenthash].js' : 'bundle.js', // Для продакшн хэшируется имя файла
            clean: true, // Очищать папку build перед каждой сборкой
        },

        // Определение расширений файлов, которые можно будет использовать при импорте
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.module.scss'], // Указываем, что можно импортировать эти файлы без указания расширения
            alias: { // Создаем псевдонимы для основных папок
                '@': path.resolve(__dirname, 'src'),
                '@styles': path.resolve(__dirname, 'src/styles'),
            },
        },

        // Правила обработки различных типов файлов
        module: {
            rules: [
                // Правило для обработки TypeScript файлов
                {
                    test: /\.(ts|tsx)$/, // Все файлы с расширением .ts и .tsx
                    use: 'ts-loader', // Используем ts-loader для компиляции TypeScript в JavaScript
                    exclude: /node_modules/, // Исключаем node_modules
                },

                // Правило для обработки шрифтов
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i, // Обработка файлов шрифтов
                    type: 'asset/resource', // Копирует шрифты в выходную папку
                    generator: {
                        filename: 'assets/fonts/[name][ext]', // Путь для сохранения шрифтов
                    },
                },

                // Правило для обработки обычных CSS файлов
                {
                    test: /\.css$/, // Все файлы с расширением .css
                    use: [
                        // В продакшн используем MiniCssExtractPlugin, в разработке - style-loader
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader', // Для обработки CSS
                            options: {
                                modules: isProduction 
                                ? { localIdentName: '[hash:base64]' } // Для продакшн хэшируем имена классов
                                : { localIdentName: '[name]__[local]__[hash:base64:5]' }, // Для разработки используем более читаемые имена
                            }
                        }
                    ],
                },

                // Правило для обработки SCSS файлов (без модулей)
                {
                    test: /\.scss$/, // Все файлы с расширением .scss
                    exclude: /\.module\.scss$/, // Исключаем .module.scss файлы, которые обрабатываются отдельно
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader', // Аналогично, в продакшн - MiniCssExtractPlugin, в разработке - style-loader
                        'css-loader', // Для обработки CSS
                        //'sass-loader', // Для компиляции SCSS в CSS
                        {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    includePaths: [path.resolve(__dirname, 'src/styles')], // // Указываем путь для SCSS
                                }
                            },
                        }
                    ],
                },

                // Правило для обработки SCSS файлов с модулями (для классов с уникальными именами)
                {
                    test: /\.module\.(css|scss)$/, // Все файлы с расширениями .module.css или .module.scss
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader', // В продакшн - MiniCssExtractPlugin, в разработке - style-loader
                        {
                            loader: 'css-loader', // Для обработки CSS
                            options: {
                                modules: {
                                    localIdentName: isProduction 
                                    ? '[hash:base64]' // Для продакшн хэшируем имена классов
                                    : '[name]__[local]__[hash:base64:5]', // Для разработки используем более читаемые имена
                                },
                            },
                        },
                        'sass-loader', // Для компиляции SCSS в CSS
                    ],
                },

                // Правило для обработки изображений (файлы с расширениями .png, .jpg и другие)
                {
                    test: /\.(png|jpe?g|gif|svg|webp)$/i, // Поддерживаем эти форматы изображений
                    type: 'asset/resource', // Webpack будет обрабатывать их как ресурсы
                },
            ],
        },

        // Плагины для обработки различных аспектов сборки
        plugins: [
            // Плагин для создания HTML файла с подключенными скриптами
            new HtmlWebpackPlugin({
                template: './src/index.html', // Шаблон для HTML
                minify: isProduction && {
                    collapseWhitespace: true, // Убираем лишние пробелы
                    removeComments: true, // Убираем комментарии
                    removeRedundantAttributes: true, // Убираем лишние атрибуты
                    useShortDoctype: true, // Убираем DOCTYPE
                },
            }),

            // Плагин для извлечения CSS в отдельные файлы
            new MiniCssExtractPlugin({
                filename: isProduction ? '[name].[contenthash].css' : '[name].css', // Для продакшн хэшируем имя файла
            }),
        ],

        // Оптимизация для продакшн сборки
        optimization: isProduction ? {
            splitChunks: {
                chunks: 'all', // Разделяем код на чанки для улучшения кэширования
            },
            runtimeChunk: 'single', // Общий чан для всех скриптов
        } : undefined,

        // Настройки для development-сервера
        devServer: {
            static: './build', // Где будут располагаться сгенерированные файлы
            port: 3000, // Порт для сервера
            open: true, // Открыть браузер автоматически при запуске
        },
    };
};
