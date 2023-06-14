(function($) {
    $.fn.hcTimeLimit = function(options) {
        const plugin = this;
        const defaultOptions = {
            remainAttr : 'data-remain-sec',
            targetClass : 'timeLimit',
            timeoutMsg : '이벤트가 종료되었습니다.',
            updateTime: function($wrapElement, result) {
                $wrapElement.find(`.${settings.targetClass}`).text(`${result.days} : ${result.hours} : ${result.minutes} : ${result.seconds}`);
            },
            onTimeout : function($wrapElement) {
                $wrapElement.find(`[${settings.remainAttr}]`).text(defaultOptions.timeoutMsg)
            }
        };
        const settings = $.extend({}, defaultOptions, options);

        function convertSeconds(seconds) {
            var days = Math.floor(seconds / (3600 * 24));
            seconds %= 3600 * 24;
            var hours = Math.floor(seconds / 3600);
            seconds %= 3600;
            var minutes = Math.floor(seconds / 60);
            var remainingSeconds = seconds % 60;
            
            return {
              days: days,
              hours: hours,
              minutes: minutes,
              seconds: remainingSeconds
            };
        }

        function updateTimer($wrapElement, targetSeconds) {
            const result = convertSeconds(targetSeconds);            
            settings.updateTime($wrapElement, result);
        }

        return plugin.each(function(){
            const $wrapElement = $(this);
            let targetSeconds = $wrapElement.find(`[${settings.remainAttr}]`).attr(`${settings.remainAttr}`);

            updateTimer($wrapElement, targetSeconds); // 초기값 설정

            const timerInterval = setInterval(function() {
                targetSeconds--;
                updateTimer($wrapElement, targetSeconds);
                if (targetSeconds <= 0) {
                    clearInterval(timerInterval);
                    if(typeof settings.onTimeout == 'function') {
                        settings.onTimeout($wrapElement);
                    }
                }
            }, 1000);
        });

    };
}(jQuery));