

$(document).ready(function(){
    $("#dashboard").click(function(){
    $("#dashboard-content").show();
    $("#inputdataset-content").hide();
    $("#rules-content").hide();
    $("#exceptions-content").hide();
    $("#dashboard").addClass("tab-active");
    $("#inputdataset").removeClass("tab-active");
    $("#rules").removeClass("tab-active");
    $("#exceptions").removeClass("tab-active");
    });

    $("#inputdataset").click(function(){
    $("#dashboard-content").hide();
    $("#inputdataset-content").show();
    $("#rules-content").hide();
    $("#exceptions-content").hide();
    $("#dashboard").removeClass("tab-active");
    $("#inputdataset").addClass("tab-active");
    $("#rules").removeClass("tab-active");
    $("#exceptions").removeClass("tab-active");
    });

    $("#rules").click(function(){
    $("#dashboard-content").hide();
    $("#inputdataset-content").hide();
    $("#rules-content").show();
    $("#exceptions-content").hide();
    $("#dashboard").removeClass("tab-active");
    $("#inputdataset").removeClass("tab-active");
    $("#rules").addClass("tab-active");
    $("#exceptions").removeClass("tab-active");
    });

    $("#exceptions").click(function(){
    $("#dashboard-content").hide();
    $("#inputdataset-content").hide();
    $("#rules-content").hide();
    $("#exceptions-content").show();
    $("#dashboard").removeClass("tab-active");
    $("#inputdataset").removeClass("tab-active");
    $("#rules").removeClass("tab-active");
    $("#exceptions").addClass("tab-active");
    });
});

for (let i = 1; i <= 4; i++) {
    document.querySelector("#upload-" + i).addEventListener("click", function() {
    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initMouseEvent('click', true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null);
    document.querySelector("#actual-upload-" + i).dispatchEvent(clickEvent);
    });
    document.querySelector("#actual-upload-" + i).addEventListener("change", function() {
    let val = this.value;
    let filename = val.split(/(\\|\/)/g).pop();
    document.querySelector("#upload-file-info-" + i).innerHTML = filename;
    });
}


var buttons = document.querySelectorAll( '.ladda-button' );

Array.prototype.slice.call( buttons ).forEach( function( button ) {

    var resetTimeout;

    button.addEventListener( 'click', function() {
    
    if( typeof button.getAttribute( 'data-loading' ) === 'string' ) {
        button.removeAttribute( 'data-loading' );
    }
    else {
        button.setAttribute( 'data-loading', '' );
    }

    clearTimeout( resetTimeout );
    resetTimeout = setTimeout( function() {
        button.removeAttribute( 'data-loading' );			
    }, 2000 );

    }, false );

} );