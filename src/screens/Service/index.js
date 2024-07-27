import { Helmet } from 'react-helmet';

export default function Service(){
return (
  <>
    <Helmet>
      <script lang="javascript">
        {`
            var __vnp = {code : 21162,key:'', secret : '9f5977fa297477f4316cc2bda2b23561'};(function() {var ga = document.createElement('script');ga.type = 'text/javascript';ga.async=true; ga.defer=true;ga.src = '//core.vchat.vn/code/tracking.js?v=80514';   
 var s = document.getElementsByTagName('script');s[0].parentNode.insertBefore(ga, s[0]);})();
          `}
      </script>
    </Helmet>
  </>

)
}