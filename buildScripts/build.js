/* eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

process.env.NODE_ENV = 'production';

console.log(chalk.blue('Generating minified bundle for production. This will take a moment...'));

webpack(webpackConfig).run((err, stats) => {
    // If fatal error, stop here
    if (err) {
        console.log(chalk.red(err));
        return 1;
    }
    
    const jsonStats = stats.toJson();
    
    if (jsonStats.hasErrors) {
        return jsonStats.errors.map(error => console.log(chalk.red(error)));
    }
    
    if (jsonStats.hasWarnings) {
        console.log(chalk.yellow('Webpack generated following warnings: '));
        jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
    }
    
    console.log(`Webpack stats: ${stats}`);
    
    console.log(chalk.green('Succeeded! Production build has been written to /dist'))
    
    return 0;
})