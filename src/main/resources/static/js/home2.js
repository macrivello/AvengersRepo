$(function(){
    /*
        DOM Elements
    */
    var signOutButton = $("#signOutButton");
    var userInfo = $("#userInfo");
    var addCourseButton = $(".add-course");
    var courseSearchModal = $("#add-course-modal");
    var autocomplete = $('#autocomplete').autocomplete();
    var courseSearch = $('#courseSearch');
    var courseIdField = $("#courseId");
    var courseNameField = $("#courseName");
    var flowchartContainer = $("#flowchart-container");
    var addQuarterButton = $("#addQuarterButton");

    /*
        Data Objects
    */
    var selectedQuarter = {};
    var courses = [];
    var flowcharts = [];
    var quarters = ["Fall 2016", "Winter 2017", "Spring 2017", "Summer 2017"];
    var quarterIndex = 0;

    /*
        Click Listeners
    */
    function setAddCourseClickHandlers() {
        $(".add-course").click(function (e) {
            selectedQuarter = e.currentTarget;
        });
    }

    signOutButton.click(function () {
        $.ajax({
            type: "GET",
            url: "/signout"
        }).done(function (data, textStatus, jqXHR) {
            console.log("Logged out of PolyPaths");
            $(location).attr('href', '/login'); //redirect to login page
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.status);
            if (jqXHR.status == 401) {
                $(location).attr('href', '/login'); //redirect to login page
            }
        });
    });

    addQuarterButton.click(function () {
       addQuarterDiv(quarters[quarterIndex++]);
    });

    /*
        Ajax Calls
    */

    $.ajax({
        type: "GET",
        url: "/users/me",
        contentType:"application/json",
        dataType: "json"
    }).done(function (data, textStatus, jqXHR) {
        // console.log(data);
        userInfo.text(data.firstName + " " + data.lastName + " (" + data.roles[0] + ")");
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.status);
        if (jqXHR.status == 401) {
            $(location).attr('href', '/login'); //redirect to login page
        }
    });

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

    /*
        Course-related methods
     */

    function addCourse(data) {
        var el = document.createElement("div");//.setAttribute("class", "course");
        el.className = "course";

        // var course = getCourse(id);

        el.innerHTML = data.department + " " + data.course.number;
        selectedQuarter.before(el);
    }

    function getCourse(c) {
        $.ajax({
            type: "GET",
            url: "/courses/" + c,
            contentType: "application/json",
            dataType: "json"
        }).done(function (data, textStatus, jqXHR) {
            return data;
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.status);
            if (jqXHR.status == 401) {
                $(location).attr('href', '/login'); //redirect to login page
            }
        });
    }

    function addQuarterToFlowchart(){

    }

    function addCourseToQuarter(course, quarter){

    }

    function addQuarterDiv(name){
        flowchartContainer.append('<div class="quarter-container"><div  class="quarter-title">' + name + '</div><div class="add-course" data-toggle="modal" data-target="#add-course-modal">Add Course</div></div>');
        setAddCourseClickHandlers();
    }

    /*
        Course Search
    */
    function initAutocomplete() {
        $('#courseSearch').autocomplete({
            lookup: courses,
            groupBy: 'department',
            onSelect: function (suggestion) {
                // courseNameField.val(suggestion.value);
                // courseIdField.val(suggestion.data.course.id);
                courseSearchModal.modal('hide');
                addCourse(suggestion.data);
                courseSearch.val('');
            }
        });
    }

    function formatDataForAutocomplete(data){
        return $.map(data, function(dataItem) {
            return { value: dataItem.department.prefix + " " + dataItem.number + " - " + dataItem.title, data: {department: dataItem.department.prefix, course: dataItem} };
        })
    }

    function loadFlowchartList() {
        $.ajax({
            type: "GET",
            url: "/flowcharts",
            contentType: "application/json",
            dataType: "json"
        }).done(function(data) {
            console.log("Loading flowcharts");
            console.log(data);
            data.forEach(function (item) {
                $('#flowchartList').append('<div class="btn" flowchart-id="' + item.id + '">' + item.name + '</div>');
            })
        }).fail(function () {
            console.log("Error loading flowchart list");
        });
    }

    loadFlowchartList();
});