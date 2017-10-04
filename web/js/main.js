/**
 * Created by sanzhar on 04.10.17.
 */
"use strict";

$(document).ready(function () {
    function updateTable() {
        $.ajax({
            url: "/data/index",
            method: "GET"
        }).success(function (data) {

            function tree(id, level) {
                level = level + 1;
                var directory = $.grep(data.directories, function (e) {
                    return e.id == id;
                });

                if (directory[0].parent_id === null) {
                    return level;
                } else {
                    return tree(directory[0].parent_id, level);
                }
            }

            if (data == 'error') {
                alert('В папке пусто!');
            } else {
                for (var i = 0; i < data.directories.length; i++) {
                    if ($('.table-body').has("#directory-" + data.directories[i].id).length == false) {
                        if (data.directories[i].parent_id === null) {
                            $('.table-body').append("<tr id='directory-" + data.directories[i].id + "'><td>" + data.directories[i].name + "</td><td></td></tr>");
                        } else {
                            var level = tree(i, 0);
                            var tds = "";
                            for (var j = 0; j < level; j++) {
                                tds += "<td>..</td>";
                            }
                            $('#directory-' + data.directories[i].parent_id).after("<tr id='directory-" + data.directories[i].id + "'>" + tds + "<td>" + data.directories[i].name + "</td><td></td></tr>");
                        }
                    }
                }

                for (var i = 0; i < data.files.length; i++) {
                    if ($('.table-body').has("#file-" + data.files[i].id).length == false) {
                        if (data.files[i].directory_id === null) {
                            $('.table-body').append("<tr id='file-" + data.files[i].id + "'><td>" + data.files[i].name + "</td></tr>");
                        } else {
                            var level = tree(data.files[i].directory_id, 0);
                            var tds = "";
                            for (var j = 0; j < level; j++) {
                                tds += "<td>..</td>";
                            }
                            $('#directory-' + data.files[i].directory_id).after("<tr id='file-" + data.files[i].id + "'>" + tds + "<td>" + data.files[i].name + "</td><td></td></tr>");
                        }
                    }
                }
            }
        });
    }

    updateTable();

    setInterval(function () {
        console.log('interval');
        updateTable();
    }, 60000);
});