function openGift() {
    // Glitch 서버의 Live Site URL을 사용하여 API 요청
    fetch('https://zesty-dent-work.glitch.me/api/manito-results')  // Glitch API URL
        .then(response => response.json())  // 응답을 JSON 형태로 파싱
        .then(manitoResults => {
            const myName = prompt("당신의 이름을 입력하세요:");

            // 입력한 이름이 참가자 목록에 있는지 확인
            if (!manitoResults[myName]) {
                alert("참가자 명단에 없는 이름입니다!");
                return;
            }

            // 결과 화면에 마니또 배정 결과 출력
            document.getElementById("result").innerHTML = 
                `당신의 마니또는! 🎉 ${manitoResults[myName]} 🎉`;
        })
        .catch(err => {
            console.error('Error fetching results:', err);  // 오류 발생 시 콘솔에 에러 출력
            alert("마니또 결과를 가져오는 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
        });
}
