$(function () {
    var courseIdField = $("#courseId");
    var courseNameField = $("#courseName");
    var courses = [];

    $.ajax({
        type: "GET",
        url: "/courses"
    }).done(function (data, textStatus, jqXHR) {
        console.log("Retrieved list of courses.");

        courses = formatDataForAutocomplete(data);

        initAutocomplete();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + jqXHR.status);
    });

    function initAutocomplete() {
        $('#courseSearch').autocomplete({
           lookup: courses,
            groupBy: 'department',
           onSelect: function (suggestion) {
               courseNameField.val(suggestion.value);
               courseIdField.val(suggestion.data.course.id);
           }
       });
    }

    function formatDataForAutocomplete(data){
       return $.map(data, function(dataItem) {
           return { value: dataItem.department.prefix + " " + dataItem.number + " - " + dataItem.title, data: {department: dataItem.department.prefix, course: dataItem} };
       })
    }
});
