"use strict";!function(n){n.fn.hcKakaoMap=function(a){var o=n.extend({},{data:[{id:"test",name:"테스트1 매장",lat:"",lng:""}],level:3},a);o.data.map(function(a){var n=document.getElementById(a.id),e={center:new kakao.maps.LatLng(a.lat,a.lng),level:o.level},n=new kakao.maps.Map(n,e),e=new kakao.maps.LatLng(a.lat,a.lng),e=new kakao.maps.Marker({position:e}),t=(e.setMap(n),a.nameMarkup),a=new kakao.maps.LatLng(a.lat,a.lng);new kakao.maps.InfoWindow({position:a,content:t}).open(n,e)})}}(jQuery);