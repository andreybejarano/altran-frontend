const config = require('./gulp.config.js')();
const eventStream = require('event-stream');
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const plugins = gulpLoadPlugins();
const pug = require('gulp-pug');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const series = require('stream-series');
const runSequence = require('run-sequence');

/**
 * Cleans build folder.
 */
gulp.task('clean', () => {
	return gulp
		.src(config.build, { read: false })
		.pipe(plugins.clean());
});

/**
 * Generating templates of html
 */
gulp.task('template-cache', ['compile-pug'], () => {
	return gulp.src(`${config.appFolder}**/*.html`)
		.pipe(plugins.angularTemplatecache(config.templateCache.file, config.templateCache.options))
		.pipe(gulp.dest(config.appFolder));
});

/**
 * Build typescript to ES5
 */
gulp.task('build-typescript', ['template-cache'], () => {
	return browserify({
		basedir: '.',
		debug: true,
		entries: config.app,
		cache: {},
		packageCache: {}
	})
		.plugin(tsify)
		.transform('babelify', {
			presets: ['es2015'],
			extensions: ['.ts'],
		})
		.bundle()
		.pipe(source(`${config.projectName}.js`))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(plugins.ngAnnotate())
		.pipe(sourcemaps.write('./'), {
			includeContent: true
		})
		.pipe(gulp.dest(config.build));
});

/**
 * Copy images if build directory
 */
gulp.task('images', () => {
	gulp.src(`${config.images}**/*`)
		.pipe(plugins.imagemin())
		.pipe(gulp.dest(`${config.build}images`));

});

/**
 * Compiling pug into html
 */
gulp.task('compile-pug', () => {
	return gulp
		.src(`${config.appFolder}**/*.pug`)
		.pipe(pug())
		.pipe(plugins.htmlmin())
		.pipe(gulp.dest(config.appFolder));
});

/**
 * listen changes of files and recharge task 
 */
gulp.task('watch', [], () => {
	gulp.watch(config.files.ts, ['build-typescript']);
	gulp.watch(config.files.pug, ['compile-pug', 'template-cache']);
	gulp.watch(config.files.sass, ['styles-app']);
});

/**
 * Compiling scss into css
 */

gulp.task('styles-app', () => {
	return gulp
		.src(config.mainscss)
		.pipe(plugins.sass())
		.pipe(plugins.rename(`${config.projectName}.css`))
		.pipe(gulp.dest(config.build));
});

/**
 * Init server
 */
gulp.task('serve-dev', () => {
	serve(true /*isDev*/);
});

gulp.task('inject', () => {
	log('inject dependencies in layout');
	// It's not necessary to read the files (will speed up things), we're only after their paths:
	const styleApp = gulp.src([`${config.build}*.css`, `!${config.build}*lib*.css`], { read: false });
	const scriptApp = gulp.src([`${config.build}*.js`, `!${config.build}*lib*.js`], { read: false });

	const injectOptions = {
		addPrefix: 'altran-front'
	};

	const errorPageStream = gulp.src(`${config.views}error.pug`)
		.pipe(plugins.inject(styleApp, injectOptions))
		.pipe(gulp.dest(config.views));


	const layoutStream = gulp.src(`${config.views}layout.pug`)
		.pipe(plugins.inject(series(styleApp, scriptApp), injectOptions))
		.pipe(gulp.dest(config.views));


	return eventStream.merge(errorPageStream, layoutStream);

});

gulp.task('default', () => runSequence('clean', 'watch', 'build-typescript', 'images', 'styles-app', 'inject', 'serve-dev'));

/**
 * 
 * Method for init server
 */
function serve() {

	const nodeOptions = {
		script: 'server/index.js',
		nodeArgs: ['--inspect=5820'],
		watch: 'server/*',
		delay: 1000,
		env: {
			'DEBUG': 'app:server'
		}
	};

	return plugins.nodemon(nodeOptions)
		.on('restart', (ev) => {
			log('*** nodemon restarted');
			log(`files changed:\n${ev}`);
		})
		.on('start', () => {
			log('*** nodemon started');
		})
		.on('crash', () => {
			log('*** nodemon crashed: script crashed for some reason');
		})
		.on('exit', () => {
			log('*** nodemon exited cleanly');
		});
}

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log(msg) {
	if (typeof (msg) === 'object') {
		for (const item in msg) {
			if (msg.hasOwnProperty(item)) {
				plugins.util.log(plugins.util.colors.blue(msg[item]));
			}
		}
	} else {
		plugins.util.log(plugins.util.colors.blue(msg));
	}
}
