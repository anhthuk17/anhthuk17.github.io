
const peer = new Peer({key: 'peerjs', host: 'myvideocall0410.herokuapp.com', secure:true,port:443});
const socket = io('https://videocall2009.herokuapp.com/');



$('#div-chat').hide();

//xirsys
// window.onload = function() {
//          let xhr = new XMLHttpRequest();
//          xhr.onreadystatechange = function($evt){
//             if(xhr.readyState == 4 && xhr.status == 200){
//                 let res = JSON.parse(xhr.responseText);
//                 console.log("response: ",res);
//             }
//          }
//          xhr.open("PUT", "https://global.xirsys.net/_turn/anhthuk17.github.io", true);
//          xhr.setRequestHeader ("Authorization": "Basic " + btoa("anhthuk17:10f0fe2a-060b-11eb-8e64-0242ac150002") );
//          xhr.setRequestHeader ("Content-Type": "application/json");
//          xhr.send( JSON.stringify({"format": "urls"}) );
//       }:


socket.on('DANH_SACH_ONLINE', arrUserInfo => {
    $('#div-chat').show();
    $('#div-dang-ky').hide();

    arrUserInfo.forEach(user => {
        const { ten, peerId } = user;
        $('#ulUser').append(`<li id="${peerId}">${ten}</li>`);
    });

    socket.on('CO_NGUOI_DUNG_MOI', user => {
        const { ten, peerId } = user;
        $('#ulUser').append(`<li id="${peerId}">${ten}</li>`);
    });

    socket.on('AI_DO_NGAT_KET_NOI', peerId => {
        $(`#${peerId}`).remove();
    });
});

socket.on('DANG_KY_THAT_BAT', () => alert('Vui long chon username khac!'));


function openStream() {
    const config = { audio: true, video: true };
    return navigator.mediaDevices.getUserMedia(config);
}

function playStream(idVideoTag, stream) {
    const video = document.getElementById(idVideoTag);
    video.srcObject = stream;
    video.play();
}

// openStream()
// .then(stream => playStream('localStream', stream));


peer.on('open', id => {
    $('#my-peer').append(id);
    $('#btnSignUp').click(() => {
        const username = $('#txtUsername').val();
        socket.emit('NGUOI_DUNG_DANG_KY', { ten: username, peerId: id });
    });
});

//Caller
$('#btnCall').click(() => {
    const id = $('#remoteId').val();
    openStream()
    .then(stream => {
        playStream('localStream', stream);
        const call = peer.call(id, stream);
        call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
    });
});

//Callee
peer.on('call', call => {
    openStream()
    .then(stream => {
        call.answer(stream);
        playStream('localStream', stream);
        call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
    });
});

$('#ulUser').on('click', 'li', function() {
    const id = $(this).attr('id');
    console.log(id);
    openStream()
    .then(stream => {
        playStream('localStream', stream);
        const call = peer.call(id, stream);
        call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
    });
});


