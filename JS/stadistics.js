let members = data.results[0].members;


let statistics ={
    democrats:getMembersParty('D'),
    republicans:getMembersParty('R'),
    independents:getMembersParty('ID'),
    totalstat:members,
    leastLoyal : [],
    mostLoyal : [],
    leastEngaded : [],
    mostEngaged : []

}


function getMembersParty(party){
  return members.filter(function(member){
    if (member.party == party) {
        return member;
      }
  })

 }

function averagePartyVotes(array,key){
//La key es los pct missed(attendance) o with party(layalty)
   
   let sum = 0;

   for (let i = 0; i < array.length; i++) {
      
    sum = sum + array[i][key];
    
   }

   return (sum / array.length).toFixed()
}



CreateTable1()

function CreateTable1(){

    let tbody = document.querySelector('#table1 tbody');

    if(document.getElementById('loyalty')){

     tbody.innerHTML =  `<tr>
                             <td>Democrats</td>
                             <td>${statistics.democrats.length}</td>
                             <td>${averagePartyVotes(statistics.democrats,'votes_with_party_pct')} &percnt;</td>
                        </tr>` 
     tbody.innerHTML +=    ` <tr>
                                 <td>Republicans</td>
                                 <td>${statistics.republicans.length}</td>
                                 <td>${averagePartyVotes(statistics.republicans,'votes_with_party_pct')} &percnt;</td>
                             </tr>`
     tbody.innerHTML +=    `<tr>
                                <td>Independents</td>
                                <td>${statistics.independents.length}</td>
                                <td>${averagePartyVotes(statistics.independents,'votes_with_party_pct')} &percnt;</td>
                            </tr>`
    tbody.innerHTML +=    `<tr>
                               <td>Total</td>
                               <td>${statistics.totalstat.length}</td>
                               <td>${averagePartyVotes(statistics.totalstat,'votes_with_party_pct') } &percnt;</td>
                           </tr>` 


    }
   
  if(document.getElementById('attendance')){

    tbody.innerHTML = `<tr>
                           <td>Democrats</td>
                           <td>${statistics.democrats.length}</td>
                           <td>${averagePartyVotes(statistics.democrats,'missed_votes_pct')} &percnt;</td>
                       </tr>` 
tbody.innerHTML +=    ` <tr>
                           <td>Republicans</td>
                           <td>${statistics.republicans.length}</td>
                           <td>${averagePartyVotes(statistics.republicans,'missed_votes_pct')} &percnt;</td>
                       </tr>`
tbody.innerHTML +=    `<tr>
                           <td>Independents</td>
                           <td>${statistics.independents.length}</td>
                           <td>${averagePartyVotes(statistics.independents,'missed_votes_pct')} &percnt;</td>
                       </tr>`
tbody.innerHTML +=    `<tr>
                        <td>Total</td>
                        <td>${statistics.totalstat.length}</td>
                        <td>${averagePartyVotes(statistics.totalstat,'missed_votes_pct') } &percnt;</td>
                     </tr>` 


                        }
                           
    
}

function arrayfilterLEST(array,key){
    let sorted = [...members].sort((a, b) => { return a[key] - b[key] })

    let ten = Math.round(members.length * 10 / 100);

    let LeastLoyaltyTenPct = sorted[ten][key]

     sorted.filter(member => { 

        if(array.length<ten){
            array.push(member)
        }
        if(member[key] == LeastLoyaltyTenPct){ 
            array.push(member)
        }      
           
          
    })
}

arrayfilterLEST(statistics.leastLoyal,"votes_with_party_pct")
console.log(statistics.leastLoyal)


arrayfilterLEST(statistics.leastEngaded,"missed_votes_pct")








function arrayfilterMOST(array,key){
    let sorted = [...members].sort((a, b) => { return b[key] - a[key] })

    let ten = Math.round(members.length * 10 / 100);

    let LeastLoyaltyTenPct = sorted[sorted.length - ten - 1][key]
    
    
     sorted.filter(member => { 

        if(array.length<ten){
            array.push(member)
        }
        if(member[key] == LeastLoyaltyTenPct){ 
            array.push(member)
        }   
         
    })
}

arrayfilterMOST(statistics.mostLoyal,"votes_with_party_pct")
console.log(statistics.mostLoyal)

arrayfilterMOST(statistics.mostEngaged,"missed_votes_pct")



 function CreateTable2(array, id){

     let table = document.getElementById(id);
     let tbody = document.createElement("tbody");

     for(let i=0; i < array.length ; i++){
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerHTML =  '<a href =' + array[i].url + '>' + array[i].first_name + ' ' + (array[i].middle_name || ' ') + array[i].last_name + '</a>';
        tr.appendChild(td1);
       
        let td2 = document.createElement("td");
        if(document.getElementById('loyalty')){
    
            td2.innerText = Math.round(array[i].total_votes * array[i].votes_with_party_pct / 100);
     
      }
      else if(document.getElementById('atten')){
     
          td2.innerText = array[i].missed_votes;
         
      }
      tr.appendChild(td2);
     
      let td3 = document.createElement("td");
       if(document.getElementById('loyalty')){
    
           td3.innerText = Math.round(array[i].votes_with_party_pct);

        }
 
       else if(document.getElementById('atten')){

            td3.innerText = array[i].missed_votes_pct; 
    
        }

          tr.appendChild(td3);

          tbody.appendChild(tr);

     }
   
     table.appendChild(tbody);
    

    }



 if(document.getElementById('loyalty')){
      CreateTable2(statistics.leastLoyal, 'least');
     CreateTable2(statistics.mostLoyal, 'most'); 
 }
 if(document.getElementById('atten')){
     CreateTable2(statistics.leastEngaged, 'least');
     CreateTable2(statistics.mostEngaged, 'most');
 }

 
 
 
































