'use strict';

angular.module('icedaxJwplayerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'restangular',
  'config',
  'angucomplete-alt',
  'schemaForm',
  '720kb.socialshare',
  'MessageCenterModule'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    //for some reason browser add / in the end of the URL in case of refresh, this make the router remove it so the url match will work
    $urlRouterProvider.rule(function ($injector, $location) {
      var path = $location.url();

      // check to see if the path has a trailing slash
      if ('/' === path[path.length - 1]) {
        return path.replace(/\/$/, '');
      }

      if (path.indexOf('/?') > 0) {
        return path.replace('/?', '?');
      }

      return false;
    });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location, $log) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token') && config.url.indexOf('http')<0) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login


      responseError: function(response) {
        $log.log('responseError', response);
        if(response.status === 401 && response.config.url.indexOf('googleapis.com')<0) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth, $log, $urlRouter, $state, $injector, config_debug) {

    $log.log('App run, config debug', config_debug);

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next, toParams, fromState, fromParams) {

      function isResolve(value) {
        return angular.isObject(value) && value.then;
      }

      //console.log('$stateChangeStart to '+next.to+'- fired when the transition begins. toState,toParams : \n',next, toParams);
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          event.preventDefault();
          $location.path('/login');
        }
        else if (loggedIn && next.name == 'lendingPage') {
          //$log.log('next', next);
          event.preventDefault();
          $location.path('/edit/videoEdit/videoEdit_Select');
        }
      });

      if (next.onExitResolve) {
        next.ignoreOnExitResolve = false;
      }

      if (fromState.onExitResolve && !fromState.ignoreOnExitResolve) {
        $log.log('Handling onExitResolve', next, fromState, fromParams);
        var resolve = $injector.invoke(fromState.onExitResolve);
        if (isResolve(resolve)) {
          $log.log('Handling onExitResolve Return promise', resolve);
          event.preventDefault();
          resolve.then(function(answer) {
            $log.log('Handling onExitResolve - sync', next, toParams);
            fromState.ignoreOnExitResolve = true;
            $state.go(next);
          });
        }
      }
    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
      $log.log('$stateChangeSuccess', toState);
    });

    /* debug ui-router
    $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams){
      console.log('$stateChangeError - fired when an error occurs during transition.');
      console.log(arguments);
    });
    $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
      console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
    });
// $rootScope.$on('$viewContentLoading',function(event, viewConfig){
//   // runs on individual scopes, so putting it in "run" doesn't work.
//   console.log('$viewContentLoading - view begins loading - dom not rendered',viewConfig);
// });
    $rootScope.$on('$viewContentLoaded',function(event){
      console.log('$viewContentLoaded - fired after dom rendered',event);
    });
    $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
      console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
      console.log(unfoundState, fromState, fromParams);
    });

    $rootScope.$on('$routeChangeError', function(current, previous, rejection) {
      console.log("routeChangeError", currrent, previous, rejection);
    });

    $rootScope.$on('$routeChangeStart', function(next, current) {
      console.log("routeChangeStart");
      console.dir(next);
      console.dir(current);
    });

    $rootScope.$on('$routeChangeSuccess', function(current, previous) {
      console.log("routeChangeSuccess");
      console.dir(current);
      console.dir(previous);
    });

    $rootScope.$on('$routeUpdate', function(rootScope) {
      console.log("routeUpdate", rootScope);
    });
    */
  })
  .config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRestangularFields({
      id: "_id"
    });
  });