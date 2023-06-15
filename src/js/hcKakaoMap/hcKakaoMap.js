(function($) {
    $.fn.hcKakaoMap = function(options) {        
        const defaultOptions = {
            data : [{
                        id : 'test',
                        name : '테스트1 매장',
                        lat : '',
                        lng : ''
                    }],
            level : 3            
        };
        const settings = $.extend({}, defaultOptions, options);

        settings.data.map(function(o) {
            const mapContainer = document.getElementById(o.id); // 지도를 표시할 div 
            const mapOption = { 
                center: new kakao.maps.LatLng(o.lat, o.lng), // 지도의 중심좌표
                level: settings.level // 지도의 확대 레벨
            };

            const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

            // 마커가 표시될 위치입니다 
            const markerPosition  = new kakao.maps.LatLng(o.lat, o.lng); 

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                position: markerPosition,
            });

            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map);

            const iwContent = o.nameMarkup; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            const iwPosition = new kakao.maps.LatLng(o.lat, o.lng); //인포윈도우 표시 위치입니다

            // 인포윈도우를 생성합니다
            const infowindow = new kakao.maps.InfoWindow({
                position : iwPosition, 
                content : iwContent 
            });
            
            // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
            infowindow.open(map, marker); 
        })    
    };
}(jQuery));