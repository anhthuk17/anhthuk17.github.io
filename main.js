
const peer = new Peer({key: 'peerjs', host: 'myvideocall0410.herokuapp.com', secure:true,port:443});
const socket = io('https://videocall2009.herokuapp.com/');

// $('#div-chat').hide();

// socket.on('DANH_SACH_ONLINE', arrUserInfo =>{
// 	$('#div-chat').show();
// 	$('#div-dang-ky').hide();
	
// 	arrUserInfo.forEach( user =>{
// 		const { ten, peerId } = user;
// 		$('#ulUser').append(`<li id="${peerId}">${ten}</li>`);
// 	});

// 	socket.on('CO_NGUOI_DUNG_MOI', user =>{
// 		const { ten, peerId } = user;
// 		$('#ulUser').append(`<li id="${peerId}">${ten}</li>`);
// 	});

// 	socket.on('AI_DO_NGAT_KET_NOI', peerId => {
// 		$(`#${peerId}`).remove();
// 	});



// });

// socket.on('DANG_KY_THAT_BAI', () => alert('Vui long chon username khac!'));

// // mở luồng stream
// function openStream(){
// 	const config = {audio: true, video: true};
// 	return navigator.mediaDevices.getUserMedia(config);
// }

// //play video
// function playStream(idVideoTag, stream){
// 	const video = document.getElementById(idVideoTag);
// 	video.srcObject=stream; //neo stream vào scrObject
// 	video.play();
// 	console.log('hello');

// }

// //caller
// window.onload = function(){
// 	var btn = document.getElementById("btnCall");
// 	//debugger;
// 	btn.onclick = function(){
// 		const id = $("#remoteId").val();
// 	    console.log(id);
// 	    openStream()
// 		.then(stream => {
// 			playStream('localStream', stream);
// 			const call=peer.call(id, stream);
// 			call.on('stream', remoteStream => playStream('remoteStream', remoteStream), console.log('hello cau'));
// 			console.log('ra roi ne ahihi');
			
// 		});
// 	 }
// }

// peer.on('open', id => 
// 	$('#my-peer').append(id),
// 	 window.onload = function(){
// 	 	var btn = document.getElementById("btnSignUp");
// 	 	btn.onclick = function(){
// 	 		const username = $('#txtUsername').val();
// 	 		console.log(username);
// 	 		socket.emit('NGUOI_DUNG_DANG_KY', {ten: username, peerId: document.getElementById("my-peer").innerHTML});
// 	 	}
// 	});

// //callee
// peer.on('call', function(call) {
// 	console.log('ra lan 2 ne');
//     openStream()
//     .then(stream => {
//         call.answer(stream);
//         playStream('localStream', stream);
//         call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
//     });
// });

// // $('#ulUser').on('click', 'li', function() {
// //     console.log($(this).attr('id'));

// // });

// {
// 	var btn = document.getElementById("ulUser");
// 	btn.onclick = function(){
// 		const id = document.getElementById($(this).attr('id')).innerHTML;
//      	console.log(id);
// //     	openStream()
// //     	.then(stream => {
// //         playStream('localStream', stream);
// //         const call = peer.call(id, stream);
// //         call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
// //     	});
// 	}
// }



$('#div-chat').hide();


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
    const config = { audio: false, video: true };
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


