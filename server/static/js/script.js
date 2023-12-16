// JavaScript Generate PNR Ranking Rules table
var pnr_ranking_table = [
    ["SSR", "PNR.SSR = SSR"],
    ["Cabin", "PNR.Cabin = F"],
    ["Cabin", "PNR.Cabin = J"],
    ["Cabin", "PNR.Cabin = Y"],
    ["Class", "PNR.class = A"],
    ["Class", "PNR.class = C"],
    ["Class", "PNR.class = K"],
    ["Connection", "No of downline connection = Integer"],
    ["Paid Service", "PNR.Paid services= Yes"],
    ["Booking-Type", "PNR.booked_as = Group"],
    ["No of PAX", "PNR.No Of PAX = Int()"],
    ["Loyality", "PNR.Loyality = Loyalities"]
];

let pnr_ranking_ele = document.querySelector("#pnr-ranking-table");
for (let i = 0; i < pnr_ranking_table.length; i++) {
    let sno = ("0" + (i + 1)).slice(-2);
    let name = pnr_ranking_table[i][0];
    let condition = pnr_ranking_table[i][1];
    let value = pnr_ranking_score[i];
    let enabled = pnr_ranking_enabled[i] == 1 ? "checked" : "";
    let input_type;
    if (parseInt(value) == value) {
        input_type = "number";
    } else {
        input_type = "text";
    }
    pnr_ranking_ele.innerHTML += `
        <div class="table-row">
            <div class="table-col table-col-1">
                <span>${sno}</span>
            </div>
            <div class="table-col table-col-2">
                <span>${name}</span>
            </div>
            <div class="table-col table-col-3">
                <span>${condition}</span>
            </div>
            <div class="table-col table-col-4">
                <label class="matter-textfield-filled">
                    <input type="${input_type}" class="input_pnr_ranking_score" placeholder=" " value="${value}" rowIndex="${i}"/>
                    <span></span>
                </label>
            </div>
            <div class="table-col table-col-5">
                <label class="matter-checkbox">
                    <input class="input_pnr_ranking_enabled" type="checkbox" ${enabled} rowIndex="${i}"/>
                    <span></span>
                </label>
            </div>
        </div>
        
`;
}



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
    // Add event change event listener to all input elements
    $(".input_pnr_ranking_score").change(function(){
        let rowIndex = this.getAttribute("rowIndex");
        let value = this.value;
        pnr_ranking_score[rowIndex] = value;
        console.log(pnr_ranking_score);
    });

    $(".input_pnr_ranking_enabled").change(function(){
        let rowIndex = this.getAttribute("rowIndex");
        let value = this.checked ? 1 : 0;
        pnr_ranking_enabled[rowIndex] = value;
        console.log(pnr_ranking_enabled);
    });
    $("#import-rules-btn").click(function(){
        let formData = {
            "pnr_ranking_score": pnr_ranking_score,
            "pnr_ranking_enabled": pnr_ranking_enabled
        };
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/update-pnr-ranking-rules", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
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
        xhr.send(JSON.stringify(formData));
    });


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