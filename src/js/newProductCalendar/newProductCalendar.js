(function($) {
	$.fn.newProductCalendar = function(options) {
        const plugin = this;
        let litepicker;
        const defaultOptions = {     
            data : '',       
            drawWrapId : 'newProductCalendarList',
            dateFormat : 'YYYY-MM-DD',
            lockDays : [],
            prevButtonText : '<span> < </span>',
            nextButtonText : '<span> > </span>',
            noItemText : '상품이 없습니다.',
            itemMarkup : function(data) {
                if(!data.link) data.link = '#';
                return `
                    <div style="float:left">
                        <div>
                            <a href="${data.link}"><img style="width:200px" src="${data.image}"/></a>
                        </div>
                        <div>${data.name}</div>
                        <div>${data.price}</div>
                    </div> &nbsp;
                `
            }
        };
		const settings = $.extend({}, defaultOptions, options);

        init();
        
        function init() {
            litepicker = new Litepicker({
                element : document.getElementById(plugin.attr('id')),
                firstDay : 0,
                inlineMode : true,
                startDate: new Date(),
                buttonText: {
                    previousMonth: settings.prevButtonText,
                    nextMonth: settings.nextButtonText,
                },
                lockDays : settings.lockDays, //[['2023-06-11', '2023-06-13'],'2022-10-03','2022-10-10'],
                onInit: function() {
                    //console.log('init')
                }
            });   
            litepicker.on('preselect', (target) => {
                gridItem(getDate(target));
            });
    
            litepicker.on('change:month', (date) => {
                var selectDate = getDate(date)
                litepicker.setDate(selectDate)
                gridItem(selectDate);
            });

            gridItem(getDate(new Date()));
        }

        function makeItem(data) {
            return settings.itemMarkup(data);
        };

        function makeItemList(list) {
			if(list.length < 1) {
				return settings.noItemText;
			}else{
				var listArray = [];                
				$.each(list,function(index,item) {
					listArray.push(makeItem(item))
				});
				return listArray.join('');
			}
		};

        function getDate(date) {
			return dayjs(date.dateInstance).format(settings.dateFormat);
		};

        function gridItem(date){
			var selectDateItems = settings.data[date] ? settings.data[date] : [];
			var html = makeItemList(selectDateItems)
			$(`#${settings.drawWrapId}`).html(html);
		};

	};
}(jQuery));