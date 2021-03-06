# slush-appkit [![Build Status](https://travis-ci.org/stewones/slush-appkit.svg?branch=master)](https://travis-ci.org/stewones/slush-appkit)
> Provides a modular workflow to scaffold and build web applications, based on Slush.js, Gulp.js, and others.

# @Deprecated: moved to [Appfy](https://github.com/Appfy/appfy-cli)

<img src="https://app-kit-assets.s3.amazonaws.com/mean-stack.png" width="450">

## Requirement
- Node 4+
- Npm 2+
- Bower 1.7+
- Gulp 3.8+
- Slush 1.1+

## Dependencies

```
$ npm install -g bower
$ npm install -g gulp
$ npm install -g slush
```

## Install
```
$ npm install -g slush-appkit
```

## Usage
```
$ slush appkit
```

## CLI
Command Line Interface
- ##### General
  - [x] Show available tasks
  `$ slush appkit --tasks`
  - [x] Show current version
  `$ slush appkit --version` 
  - [x] Create new application 
  `$ slush appkit`  
  - [x] Serves both client and server
  `$ slush appkit:serve` 
  
- ##### Client
  - [x] Module               
  `$ slush appkit:client-module [moduleName]`  
  - [x] Component           
  `$ slush appkit:client-component [moduleName] [componentName]`
  - [x] Directive            
  `$ slush appkit:client-directive [moduleName] [directiveName]`
  - [x] Filter               
  `$ slush appkit:client-filter [moduleName] [filterName]`  
  - [x] Service              
  `$ slush appkit:client-service [moduleName] [serviceName]`  
  - [x] Factory              
  `$ slush appkit:client-factory [moduleName] [factoryName]`  
  - [x] Controller           
  `$ slush appkit:client-controller [moduleName] [controllerName]`
  
- ##### Server
  - [x] API endpoint        
  `$ slush appkit:server-api [endpoint]`  
  - [ ] Endpoint model       
  `$ slush appkit:server-model [endpoint] [modelName]`  
  - [ ] Endpoint controller  
  `$ slush appkit:server-controller [endpoint] [controllerName]`
  
- ##### Environment
  - [x] Serves client       
  `$ slush appkit:serve-client`  
  - [ ] Serves client in dist mode   
  `$ slush appkit:serve-client-dist`
  - [x] Serves API server
  `$ slush appkit:serve-api` 
  
- ##### Deployment
  - [ ] build and deploy client     
  `$ slush appkit:client-deploy`  
  - [ ] build and deploy server     
  `$ slush appkit:server-deploy`  
  

## Application Structure

```
├── README.md
├──.client.build                                <- client deploy
├──.server.build                                <- server deploy
├── gulpfile.ts                                 <- configuration of the gulp tasks
├── karma.conf.js                               <- configuration of the test runner
├── package.json                                <- dependencies of the project
├── protractor.conf.js                          <- e2e tests configuration
├── bin                                         <- deploy and build executables
├── server                                      <- source code of backend application
├── client                                      <- source code of frontend application
│   └── src
│       ├── app
│       │   └── core                            <- appkit core modules
│       │   │   ├── errors
│       │   │   ├── login
│       │   │   ├── page
│       │   │   ├── user
│       │   │   ├── utils
│       │   └── modules                          <- third-party modules
│       │   │   ├── home
│       │   │   │   ├── home.config.js
│       │   │   │   ├── home.component.js
│       │   │   │   ├── home.spec.js
│       │   │   │   ├── home.html
│       │   │   │   ├── home.css
│       │   └── themes         
│       │   │   ├── default
│       │   │   │   ├── theme.html
│       │   ├── index.less
│       │   ├── index.module.js                  <- main module
│       │   ├── vendor.less
│       ├── assets
│       └── index.html                           <- main template
└── .gitignore                                   <- ignored files
