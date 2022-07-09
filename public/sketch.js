
const button = document.getElementById('submit');
const btnUpdate = document.getElementById('update');
const btnClear = document.getElementById('clear');

  button.addEventListener('click', async event => {

    let player = document.getElementById('player').value
    let posX = document.getElementById('posX').value
    let posY = document.getElementById('posY').value
    let posZ = document.getElementById('posZ').value

    const data = { player, posX,posY,posZ};
    //console.log(data);
    //console.log(data);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    //console.log(options);
    const response = await fetch('/api', options);
    const json = await response.json();
    //console.log(json);

    const getResponse = await fetch('/api');
    const getData = await getResponse.json();
    
    let historyList = document.getElementById('history-list')

    if (historyList) {
      historyList.innerHTML = "";
      console.log("clear")
    }
    const reveseData = getData.slice().reverse()
    for (item of reveseData) {
      const root = document.createElement('p');
      const player = document.createElement('div');
      const pos = document.createElement('div');
      const date = document.createElement('div');

    
      player.textContent = `player: ${item.player}`;
      pos.textContent = `X:${item.posX} Y:${item.posY} Z:${item.posZ}°`;
      const dateString = new Date(item.timestamp).toLocaleString();
      date.textContent = dateString;

      root.append(player, pos, date);
    
      historyList.prepend(root);
    }
    console.log(data)
  });
  
btnUpdate.addEventListener('click', async event => {

    const getResponse = await fetch('/api');
    const getData = await getResponse.json();
    
    let historyList = document.getElementById('history-list')

    if (historyList) {
      historyList.innerHTML = "";
      console.log("clear")
    }
    const reveseData = getData.slice().reverse()
    for (item of reveseData) {
      const root = document.createElement('p');
      const player = document.createElement('div');
      const pos = document.createElement('div');
      const date = document.createElement('div');

    
      player.textContent = `player: ${item.player}`;
      pos.textContent = `X:${item.posX} Y:${item.posY} Z:${item.posZ}°`;
      const dateString = new Date(item.timestamp).toLocaleString();
      date.textContent = dateString;

      root.append(player, pos, date);
    
      historyList.prepend(root);
    }
});
  
btnClear.addEventListener('click', async event => {

    const getResponse = await fetch('/clear');
    const getData = await getResponse.json();
    console.log(getData)
    let historyList = document.getElementById('history-list')

      historyList.innerHTML = "";
      console.log("clear")

    
  });