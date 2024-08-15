async function searchSchool() {
  const schoolName = document.getElementById('schoolName').value;

  if (!schoolName) {
    alert(getText('Please enter a school name', '학교 이름을 입력하세요'));
    return;
  }

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = getText('Searching...', '검색 중...');

  try {
    const response = await fetch(`/search?name=${encodeURIComponent(schoolName)}`);
    const data = await response.json();

    if (data.length > 0) {
      const codes = data.map(school => school.code);
      resultsDiv.innerHTML = '<ul>' + codes.map(code => `
        <li>
          ${code}
          <button class="copy-btn" onclick="copyToClipboard('${code}')">${getText('Copy', '복사')}</button>
        </li>`).join('') + '</ul>';
    } else {
      resultsDiv.innerHTML = getText('No schools found.', '학교를 찾을 수 없습니다.');
    }
  } catch (error) {
    resultsDiv.innerHTML = getText('Error occurred while searching.', '검색 중 오류가 발생했습니다.');
    console.error('Error:', error);
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert(getText('Copied to clipboard!', '클립보드에 복사되었습니다!'));
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

function changeLanguage() {
  const language = document.getElementById('languageSelect').value;
  document.getElementById('title').innerText = getText('Search School Timetable', '학교 코드 검색');
  document.getElementById('schoolName').placeholder = getText('Enter school name', '학교 이름을 입력하세요');
  document.querySelector('button').innerText = getText('Search', '검색');
  document.getElementById('resultsTitle').innerText = getText('Results:', '결과:');
}

function getText(englishText, koreanText) {
  const language = document.getElementById('languageSelect').value;
  return language === 'ko' ? koreanText : englishText;
}
