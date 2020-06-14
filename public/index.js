const refreshBtn = document.querySelector('.refresh');
const postNum = document.querySelector('#postNum');

let input = 1;

refreshBtn.addEventListener('click', () =>{
    input = postNum.value;
    getData().then((value) =>{
        createText(value);
    });
});

async function getData(){
    const data = {'userInput': input};
    options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/post', options);
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
    for (i = 0; i < value[0].length; i++){
        const div = document.createElement('div');
        const br = document.createElement('br');
        const titleElement = document.createElement('div');
        const urlElement = document.createElement('div');

        titleElement.textContent = value[0][i];
        urlElement.textContent = value[1][i];

        div.appendChild(titleElement);
        div.appendChild(urlElement);
        div.appendChild(br);
        document.body.appendChild(div);
    }
}

