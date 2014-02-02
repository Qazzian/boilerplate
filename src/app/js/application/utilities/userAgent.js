define(function () {
        return {
            isMobile : function () {
                var userAgent = navigator.userAgent || navigator.vendor || window.opera;
                return ((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(userAgent));
            }
        };
    });