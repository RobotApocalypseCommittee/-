function isEmpty(str) {
    return (!str || 0 === str.length || str == "null");
}
function change_name() {
    var repeat = true;
    name = ""
    while (repeat) {
        name = prompt("ονομα;");
        if (!isEmpty(name)) {
            repeat = false;
        }
    }
    Cookies.set("name", name, { expires: 30 });
}
if (Cookies.get("name")) {
    var name = Cookies.get("name")
} else {
    change_name()
}
var audios = []
nanoajax.ajax({ url: '/audio?format=json' }, function (code, responseText) {
    if (code == 200) {
        var paths = JSON.parse(responseText);
        for (var i = 0; i < paths.length; i++) {
            audios.push(new Howl({
                src: [paths[i]]
            }));
        }
    }
})
var sound = new Howl({
    //src: ['assets/alert.mp3']
    src: ['assets/Bekos.mp3']
});

var play_sound = function () {
    console.log("bekos");
    sound.play();
};

var socket = io();

function broadcast_sound() {
    socket.emit('BEKOS', name);
}

socket.on("BEEKOS", function (msg) {
    console.log(msg)
    document.getElementById("message").innerText = msg.message
    if (audios.length > 0) {
        audios[msg.sound].play()
    } else {
        sound.play();
    }
})

function birth_bread() {
    var new_bread = document.createElement("img");
    new_bread.src = "/assets/bekos.png";
    new_bread.style.maxWidth = Math.floor(Math.random() * 20) + "%";
    
    if (Math.round(Math.random())) {
        new_bread.style.left = random_range(0, 40) + "%";
    }  
    else {
        new_bread.style.right = random_range(0, 40) + "%";
    }

    if (Math.round(Math.random())) {
        new_bread.style.top = random_range(0, 30) + "%";
    }
    else {
        new_bread.style.top = random_range(50, 70) + "%";
    }

    new_bread.className = "flyingbread";
    document.getElementById("main").appendChild(new_bread);
    setTimeout(function() {
        new_bread.remove();
      }, 2000);
}

function random_range(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}