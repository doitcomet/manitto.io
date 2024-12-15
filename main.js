const API_URL = 'https://animated-fearless-kookaburra.glitch.me/api/manito-results';

let assignedManitos = {}; // 서버에서 받아온 결과를 저장
let checkedParticipants = JSON.parse(localStorage.getItem('completedParticipants')) || [];

// 마니또 결과 확인
function openGift() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            assignedManitos = data; // 서버에서 가져온 결과 저장
            const myName = prompt("당신의 이름을 입력하세요:");

            if (checkedParticipants.includes(myName)) {
                alert("이미 마니또를 확인했습니다!");
                return;
            }

            if (!assignedManitos[myName]) {
                alert("참가자 명단에 없는 이름입니다!");
                return;
            }

            document.getElementById("result").innerHTML = 
                `당신의 마니또는! 🎉 ${assignedManitos[myName]} 🎉`;

            checkedParticipants.push(myName);
            localStorage.setItem('completedParticipants', JSON.stringify(checkedParticipants));
        })
        .catch(err => {
            console.error('Error fetching results:', err);
            alert("마니또 결과를 가져오는 중 오류가 발생했습니다. 다시 시도해주세요.");
        });
}

// 전체 결과 확인 (비밀번호 필요)
function revealResults() {
    const key = prompt("🔑 비밀번호를 입력하세요:");
    if (key === "1022") {
        let resultMessage = "🔒 마니또 결과:\n";
        for (const giver in assignedManitos) {
            resultMessage += `${giver} → ${assignedManitos[giver]}\n`;
        }
        alert(resultMessage);
    } else {
        alert("❌ 잘못된 비밀번호입니다!");
    }
}

// 마니또 초기화
function resetManito() {
    if (confirm("🗑️ 모든 마니또를 초기화 하시겠습니까?")) {
        fetch(`${API_URL}/reset`, { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                assignedManitos = data.assignedManitos; // 초기화된 데이터를 저장
                localStorage.clear(); // 로컬 스토리지 초기화
                alert("✅ 마니또가 초기화되었습니다!");
                location.reload();
            })
            .catch(err => {
                console.error('Error resetting manito:', err);
                alert("초기화 중 오류가 발생했습니다.");
            });
    }
}
