var win = 1,time = "";
$(function () {
    showimg(win); 
    $(".imgnum span").hover(function () {
        clearTimeout(time);
        var icon=$(this).text();
        $(".imgnum span").removeClass("default").eq(icon-1).addClass("default");
        $("#bannerimg li").hide().stop(true,true).eq(icon-1).fadeIn("slow"); 
    }, 
    function () {
        win=$(this).text()> 3 ? 1 :parseInt($(this).text())+1;
        time = setTimeout("showimg(" + win + ")", 2000);
    });
});
function showimg(num) {
    win = num;
    $(".imgnum span").removeClass("default").eq(win-1).addClass("default");
    $("#bannerimg li").hide().stop(true,true).eq(win-1).fadeIn("slow");
    win = win + 1 > 4 ? 1 : win + 1;
    time = setTimeout("showimg(" + win + ")", 2000);
}