// jQuery goes here
var index = 0;
$(function() {
    $("#getJoke").click(
        function() {
            $.get("/jokes",function(data){
                // TODO: change HTML instead of alert
                $("#setup").html(data.setup);    
                $("#punchline").html(data.punchline);
                index = data.id;
                alert(index);
            },"json")
        }
    );
    $("#upvote").on("click",function() {
        $.ajax({
            url: '/upvote',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({id: index})
        });
        //$.post("/upvote");
    });
    
    $("#downvote").on("click",function() {
        //$.post("/downvote");
        $.ajax({
            url: '/downvote',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({id: index})
        });
    });
});
//hellooooo
