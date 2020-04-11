const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
let lastChecked;
let colors = [];

function handlecheck(e){
    //Check if they had the shift key down AND check that they checking it
    let inBetween = false;
    if(e.shiftKey && this.checked){
        //loop over every single checkbox
        checkboxes.forEach(checkbox =>{
            if(checkbox === this || checkbox === lastChecked) inBetween = !inBetween;
            if (inBetween) checkbox.checked = true;
        });
    }
    lastChecked = this;
    controlBackgrounColor();
}

function controlBackgrounColor(){
    checkboxes.forEach(checkbox =>{
        if(checkbox.checked) colors.push(checkbox.id);
    });
    if(colors.length === 4) document.documentElement.style.setProperty(`--background-color`, 'gray');
    if(colors.length === 3) {
        if(colors.includes('yellow') && colors.includes('blue') && colors.includes('red')) document.documentElement.style.setProperty(`--background-color`, 'black');
        if(colors.includes('yellow') && colors.includes('blue') && colors.includes('white')) document.documentElement.style.setProperty(`--background-color`, '#8DFA84');
        if(colors.includes('yellow') && colors.includes('red') && colors.includes('white')) document.documentElement.style.setProperty(`--background-color`, '#FFCC6E');
        if(colors.includes('red') && colors.includes('blue') && colors.includes('white')) document.documentElement.style.setProperty(`--background-color`, 'violet');
    }
    if(colors.length == 2){
        if(colors.includes('yellow') && colors.includes('blue')) document.documentElement.style.setProperty(`--background-color`, 'green');
        if(colors.includes('yellow') && colors.includes('red')) document.documentElement.style.setProperty(`--background-color`, 'orange');
        if(colors.includes('red') && colors.includes('blue')) document.documentElement.style.setProperty(`--background-color`, 'purple');
        if(colors.includes('yellow') && colors.includes('white')) document.documentElement.style.setProperty(`--background-color`, '#FCFC84');
        if(colors.includes('red') && colors.includes('white')) document.documentElement.style.setProperty(`--background-color`, '#FC8484');
        if(colors.includes('blue') && colors.includes('white')) document.documentElement.style.setProperty(`--background-color`, '#98E8FF');
    }
    if(colors.length === 1) document.documentElement.style.setProperty(`--background-color`, colors[0]);
    if(colors.length === 0) document.documentElement.style.setProperty(`--background-color`, 'black');

    colors = [];
}

checkboxes.forEach(checkBox => checkBox.addEventListener('click', handlecheck));