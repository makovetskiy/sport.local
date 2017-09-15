
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


/*Vue.http.headers.common['X-CSRF-TOKEN'] = $("#token").attr("value");

new Vue({
    el: '#sport-manager',
    data:{
      starts:[]
    }, 
    methods : {
        getVueItems: function(){
            console.log("getValue()");
          this.$http.get('/start').then((response) => {
            this.$set('starts', response.data.data.data);
          });
        }
    },
    ready: function() {
      // GET /users
      this.$http.get('/start').then(
        function (response) { // Success.
          this.starts = response.data;
          console.log("get");
        },
        function (response) { // Error.
          console.log('An error occurred.');
        }
      );
    },
});

*/

