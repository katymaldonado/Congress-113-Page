src = "JS/pro -congress-113-senate.js"
let members = data.results[0].members
let table = document.getElementById('senate')


let states = []
for (i = 0; i < members.length; i++) {
    
  if(!states.includes(members[i].state)){
      states.push(members[i].state)
  }
    
}


states.forEach(state =>{
    let option = document.createElement('option');
    option.value = state;
    option.innerText = state;
    document.querySelector("#StateFilter").appendChild(option);
})


    
document.querySelectorAll("input[name=party]").forEach(function(e){
   e.addEventListener("change", CreateTable)
})

document.querySelector("#StateFilter").addEventListener("change",CreateTable)

CreateTable()

function CreateTable(){

  table.innerHTML = ' '

  let tbody = document.createElement('tbody')

  let thead = document.createElement('thead')
  let tr = document.createElement('tr')

  let th1 = document.createElement('th')
  th1.innerText = 'Full Name'

  let th2 = document.createElement('th')
  th2.innerText = 'Party Affiliation'

  let th3 = document.createElement('th')
  th3.innerText = 'State'
  
  let th4 = document.createElement('th')
  th4.innerText = 'Seniority'

  let th5 = document.createElement('th')
  th5.innerText = 'Percentage of votes with Party'

  tr.appendChild(th1)
  tr.appendChild(th2)
  tr.appendChild(th3)
  tr.appendChild(th4)
  tr.appendChild(th5)

  thead.appendChild(tr)
  table.appendChild(thead)

 
  
 let checkedParties = Array.from(document.querySelectorAll("input[name=party]:checked")).map (e => e.value)

 let state = document.querySelector('#StateFilter').value

for (let i = 0; i < members.length; i++) {
   
  if(checkedParties.includes(members[i].party) && (members[i].state == state || state == 'ALL')){
   let tr = document.createElement('tr')

  
   let td1 = document.createElement('td')
   td1.innerHTML = '<a href =' + members[i].url + '>' + members[i].first_name + ' ' + (members[i].middle_name || ' ') + members[i].last_name + '</a>'               
  

   
   let td2 = document.createElement('td')
   td2.innerText = members[i].party
    
   let td3 = document.createElement('td')
   td3.innerText = members[i].state

   let td4 = document.createElement('td')
   td4.innerText = members[i].seniority

   let td5 = document.createElement('td')
   td5.innerText = members[i].votes_with_party_pct + '%'

   tr.appendChild(td1)
   tr.appendChild(td2)
   tr.appendChild(td3)
   tr.appendChild(td4)
   tr.appendChild(td5)

   tbody.appendChild(tr)
}

table.appendChild(tbody)
}


}
          
