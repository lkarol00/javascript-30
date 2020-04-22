const endpoint = 'emoji.json';
let emojis = [];
fetch(endpoint)
    .then(blob => blob.json())
    .then(data => emojis.push(...data));

function findMatches(wordToMatch, emojis){
    return emojis.filter(emoji =>{
        //here we need to figure out if the emoji name matches what was searched 
        const regex = new RegExp(wordToMatch, 'gi');
        return emoji.name.match(regex);
    })
}

function displayMatches(){
    const matchArray = findMatches(this.value, emojis);
    const html = matchArray.map(emoji => {
        const regex = new RegExp(this.value, 'gi');
        const emojiName = emoji.name.replace(regex, `<span class="hl">${this.value}</span>`)
        return `
            <li>
                <span class="name">${emojiName}</span>
                <span class="emoji">${emoji.char}</span>
            </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);