const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e){
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const score = (this.querySelector('[name=score]')).value;
    const item = {
        text,
        done: false,
        score
    };
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
    this.reset();
}

function populateList(plates = [], platesList){
    platesList.innerHTML = plates.map((plate, i)=>{
        return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}/>
                <label for="item${i}" style="display:block;width:80%">${plate.text}</label>
                <a for="item${i}" style="text-align: right;">${plate.score}</a>
            </li>
        `;
    }).join('');
}

function toggleDone(e){
    if (!e.target.matches('input')) return;
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

populateList(items, itemsList);