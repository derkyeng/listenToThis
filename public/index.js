async function getData(){
    options = {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    };
    const response = await fetch('/api', options);
    const json = await response.json();
    const titlesData = [[],[]];
    for (i = 0; i < json.titles.length; i++){
        titlesData[0].push(json.titles[i]);
        titlesData[1].push(json.url[i]);
    }
    console.log(titlesData);
    return titlesData;
}

function createText(value){
    for (i = 0; i < value.length; i++){
        const div = document.createElement('div');
        const titleElement = document.createElement('div');

        titleElement.textContent = value[i];
        div.appendChild(titleElement);
        document.body.appendChild(div);
    }
}

getData().then((value) =>{
    createText(value);
});