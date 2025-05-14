import axios from 'axios';
const $axios = axios;

$axios.defaults.withCredentials = true;
$axios.defaults.withXSRFToken = true;

/*$axios.defaults.xsrfCookieName = "XSRF-TOKEN";
$axios.defaults.xsrfHeaderName = "X-XSRF-TOKEN";*/

//export default  {axios: axiosPio}  = window;

export default $axios;

