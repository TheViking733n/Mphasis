toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

$(document).ready(function(){
    $("#import-dataset-btn").click(function(){
        var formData = new FormData();
        for (let i = 1; i <= 4; i++) {
            formData.append("file-" + i, document.querySelector("#actual-upload-" + i).files[0]);
            formData.append("sheet-" + i, document.querySelector("#dataset-sheet-url-" + i).value);
        }
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/submit-dataset", true);
        xhr.onload = function() {
            if (xhr.status == 200) {
                let response = JSON.parse(this.responseText);
                console.log(response);
                let status = response["status"];
                let title = response["title"];
                let message = response["message"];
                toastr[status](message, title);
            } else {
                console.log("Error");
                toastr["error"]("Unable to Submit data", "Error");
            }
        }
        xhr.send(formData);
    });


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