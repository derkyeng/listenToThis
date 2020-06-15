const refreshBtn = document.querySelector('.refresh');
const postNum = document.querySelector('#postNum');
const mainDisplay = document.querySelector('.main');

let input = 1;

//Button press to send and create display
refreshBtn.addEventListener('click', () =>{
    removePosts();
    input = postNum.value;
    getData().then((value) =>{
        createText(value);
    });
});

//Send and recieve data from the server
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

//Utilizes the recieved data to create and display data on the client
function createText(value){
    for (i = 0; i < value[0].length; i++){
        const div = document.createElement('div');
        div.className = 'temp';
        const br = document.createElement('br');
        const titleElement = document.createElement('div');
        const urlElement = document.createElement('a');
        urlElement.setAttribute('href', value[1][i]);

        titleElement.textContent = value[0][i];
        urlElement.textContent = 'Go to post';

        div.appendChild(titleElement);
        div.appendChild(urlElement);
        div.appendChild(br);
        mainDisplay.appendChild(div);
    }
}

function removePosts(){
    document.querySelectorAll('.temp').forEach(element => element.remove());
}
