$(function(){
    var signOutButton = $("#signOutButton");
    var userInfo = $("#userInfo");
    var addCourseButton1 = $("#addCourse1");
    var addCourseButton2 = $(".add-course");

    addCourseButton2.click(function(e){
        addCourse(e.currentTarget)
    });

    addCourseButton1.click(function (e) {
        addCourse1()
    });

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

    $.ajax({
        type: "GET",
        url: "/users/me",
        contentType:"application/json",
        dataType: "json"
    }).done(function (data, textStatus, jqXHR) {
        console.log(data);
        userInfo.text(data.firstName + " " + data.lastName + " (" + data.roles[0] + ")");
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.status);
        if (jqXHR.status == 401) {
            $(location).attr('href', '/login'); //redirect to login page
        }
    });

    function addCourse1() {
        $("#quarter1").append('<div class="course">test</div>');
    }

    function addCourse(e) {
        var el = document.createElement("div");//.setAttribute("class", "course");
        el.className = "course";
        el.innerHTML = "Math 248";
        e.before(el);
        getCourse(164);
    }

    function getCourse(c) {
        $.ajax({
            type: "GET",
            url: "/courses/" + c,
            contentType: "application/json",
            dataType: "json"
        }).done(function (data, textStatus, jqXHR) {
            console.log(data);
            console.log("finished AJAX query");
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.status);
            if (jqXHR.status == 401) {
                $(location).attr('href', '/login'); //redirect to login page
            }
        });
    }
});