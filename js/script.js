var obj1 = {
    question: "The Basenji doesn’t bark.",
    answer: true,
    picture: "https://firebasestorage.googleapis.com/v0/b/quipo-quiz-sec.appspot.com/o/quizzes%2F3d9ba2494f01b9fecb570ab4a52748291455206573211.jpeg?alt=media&token=646d2ffa-7e8b-4373-a543-8337989861c1",
    infos: "TRUE, Due to its unusually shaped larynx, the Basenji produces an unusual yodel-like sound commonly called a baroo."
};

var obj2 = {
    question: "A cougar eats a small deer every day.",
    answer: false,
    picture: "https://firebasestorage.googleapis.com/v0/b/quipo-quiz-sec.appspot.com/o/quizzes%2Ffa6e4dad3b93823bd7100cfdeb833e371455228518970.jpeg?alt=media&token=87404f75-bef8-4ecc-882d-a6afc4dc470e",
    infos: "FALSE, On average, a cougar eats a deer every 6 or 7 days. The rest of the time they hunt small game animals such as hares."
};

var obj3 = {
    question: "The pads on a cat’s paw don’t feel anything.",
    answer: false,
    picture: "https://firebasestorage.googleapis.com/v0/b/quipo-quiz-sec.appspot.com/o/quizzes%2F3c1359efec34d20e53a4eea025a2efff1455220828154.jpeg?alt=media&token=0a9add01-0bce-4a33-ba8e-f102f0e97b5b",
    infos: "FALSE, The pads are covered in highly sensitive touch receptors that allow the cat to evaluate the texture, temperature and resistance of a surface, object, or prey."
};

var obj4 = {
    question: "In a pack of wolves, only the dominant pair of wolves can breed.",
    answer: true,
    picture: "https://firebasestorage.googleapis.com/v0/b/quipo-quiz-sec.appspot.com/o/quizzes%2F3b732a43-78f3-404f-b716-3ac3816ab56c.jpg?alt=media&token=1d25b002-1f06-4d11-adf6-e1d012267229",
    infos: "TRUE, In a pack of wolves, only the dominant pair of wolves can breed. However, the young are the responsibility of all."
};

var quiz = [obj1, obj2, obj3, obj4];

var ans = [];

var i = 0;

var final_score = 0;

var canvas = document.getElementById("pie_canvas");

$( document ).ready(function() {
    console.log( "Ready !" );
    $("#question").text(quiz[i].question);
    $("#image").attr('src', quiz[i].picture);
    $(".sh").hide();
    $('#restart').hide();
});

$("#true, #false").click(function() {
    if (i < quiz.length) {

        if (this.id == "true") {
            console.log("TRUE");
            ans.push("TRUE");
            if (quiz[i].answer) {
                final_score += 1;
            }
            i++;
        }
        if (this.id == "false") {
            console.log("FALSE");
            ans.push("FALSE");
            if (!quiz[i].answer) {
                final_score += 1;
            }
            i++;
        }

        if (i < quiz.length) {
            $("#question").text(quiz[i].question);
            $("#image").attr('src', quiz[i].picture);
        }
    }

    if (i == quiz.length) {
        $(".sh").show();
        $("#score").text("Final score : " + final_score + " / " + quiz.length);
        var ctx = canvas.getContext("2d");
        var lastend = 0;
        var data = [final_score, quiz.length - final_score];
        var total = 0;
        var colors = ['#66bb6a', '#EE6E73'];

        for (var e = 0; e < data.length; e++) {
            total += data[e];
        }

        for (var j = 0; j < data.length; j++) {
            ctx.fillStyle = colors[j];
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, lastend, lastend + (Math.PI * 2 * (data[j] / total)), false);
            ctx.lineTo(canvas.width / 2, canvas.height / 2);
            ctx.fill();
            lastend += Math.PI * 2 * (data[j] / total);
        }

        answers();
        $('#false, #true').remove();
        $('#restart').show();

    }

})

$("#restart").click(function() {
    location.reload();
})

function answers() {
    for (var i = 0; i < quiz.length; i++) {
        $('tbody').append( '<tr><td>' + quiz[i].question + '</td><td>'+ ans[i] + '</td><td>' + quiz[i].infos + '</td></tr>' );
    }
}
