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
    var selectedQuarterId = 0;
    var courses = [];
    var flowcharts = [];
    var quarters = ["Fall 2016", "Winter 2017", "Spring 2017", "Summer 2017"];
    var quarterIndex = 0;

    var quartersMap = {};
    var coursesMap = {};

    /*
        Click Listeners
    */
    function setAddCourseClickHandlers() {
        $(".add-course").click(function (e) {
            selectedQuarter = e.currentTarget;
            selectedQuarterId = parseInt(e.currentTarget.attributes.quarter_id.nodeValue);
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

    $.ajax({
        type: "GET",
        url: "/flowcharts"
    }).done(function (data, textStatus, jqXHR) {
        console.log("Retrieved list of flowcharts.");

        parseEntries(data[0]);
        buildFlowchart();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + jqXHR.status);
    });

    /*
        Course-related methods
     */

    function parseEntries(data){
        var entry;
        var quarter;
        for(var i = 0; i < data.entries.length; i++){
            var entry = data.entries[i];
            var quarter = entry.quarter;
            var course = entry.course;
            var quarterId = quarter.id === undefined ? quarter.toString() : quarter.id.toString();
            if (quartersMap[quarterId] === undefined) {
                quartersMap[quarterId] = quarter;
            }

            if (coursesMap[quarterId] === undefined) {
                coursesMap[quarterId] = [];
            }
            coursesMap[quarterId].push(course);
        }
    }

    function buildFlowchart(){
        // Add quarters
        for(id in quartersMap) {
            var quarterName = quartersMap[id].term + " " + quartersMap[id].year;
            addQuarterDiv(id ,quarterName);
            var courseArr = coursesMap[id];
            courseArr.forEach(function(c){
                addCourse(id, c);
            });
        }
        setAddCourseClickHandlers();
    }

    function addCourse(id, course) {
        var addCourseDivId = "#addCourse_" + id;
        var divId = "course_" + course.id;

        var courseDiv = $('<div/>', {
            id: divId,
            class: "course"
        });
        courseDiv.text(course.department.prefix + " " + course.number);

        $(addCourseDivId).before(courseDiv);
    }

    function addCourse(id, course) {
        var addCourseDivId = "#addCourse_" + id;
        var divId = "course_" + course.id;

        var courseDiv = $('<div/>', {
            id: divId,
            class: "course"
        });
        courseDiv.text(course.department.prefix + " " + course.number);

        $(addCourseDivId).before(courseDiv);
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

    function addQuarterDiv(id, name){
        var quarterDivId = "quarter_" + id;
        var addCourseDivId = "addCourse_" + id;

        var quarterDiv = $('<div/>', {
            id: quarterDivId,
            class: "quarter-container"
        });
        quarterDiv.text(name);

        var addCourseDiv = $('<div/>', {
            id: addCourseDivId,
            class: "add-course"
        });
        addCourseDiv.attr('quarter_id', id);
        addCourseDiv.attr('data-toggle','modal');
        addCourseDiv.attr('data-target','#add-course-modal');
        addCourseDiv.text("Add Course");

        quarterDiv.append(addCourseDiv);
        // quarterDiv.append('<div class="quarter-title">' + name + '</div><div class="add-course" data-toggle="modal" data-target="#add-course-modal">Add Course</div>');
        // flowchartContainer.append('<div class="quarter-container"><div class="quarter-title">' + name + '</div><div class="add-course" data-toggle="modal" data-target="#add-course-modal">Add Course</div></div>');
        flowchartContainer.append(quarterDiv);
        setAddCourseClickHandlers();

        return quarterDiv;
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
                addCourse(selectedQuarterId, suggestion.data.course);
                courseSearch.val('');
            }
        });
    }

    function formatDataForAutocomplete(data){
        return $.map(data, function(dataItem) {
            return { value: dataItem.department.prefix + " " + dataItem.number + " - " + dataItem.title, data: {department: dataItem.department.prefix, course: dataItem} };
        })
    }


});