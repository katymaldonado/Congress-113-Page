let app = new Vue({
    el: "#app",
    data: {
        
        members: [],
        checkedParty: ["D", "R", "ID"],
        states: [],
        AllSelected: "ALL",
        stats:{ 
            dem: [],
            rep: [],
            ind: [],
            total: []
        },
        
        atteleast:[],
        attenmost:[],  
        
        loyleast:[],
        loymost:[],
        
        a: ''

    },
    methods: {

        getApi: function () {
            if (document.getElementById("senate")) {
                return "https://api.propublica.org/congress/v1/113/senate/members.json"
            } else if (document.getElementById("house")) {
                return "https://api.propublica.org/congress/v1/113/house/members.json"
            }
        },
        
        getstates() {
            for (let i = 0; i < this.members.length; i++) {
                if (!this.states.includes(this.members[i].state)) {
                    this.states.push(this.members[i].state)
                }
            }
            this.states.sort();
        },
       getPartyMembers : function(party){
            return this.members.filter(function(member){
              if (member.party == party) {
                  return member;
                }
            })
          
        },
        averagePartyVotes:function (array,key){             
               let sum = 0;
               for (let i = 0; i < array.length; i++) {
                sum = sum + array[i][key];
               }
            
               return (sum / array.length).toFixed()
            },

        arrayfilterLEST:function (array,key){
             let sorted = [...this.members].sort((a, b) => { return a[key] - b[key] })    
             let ten = Math.round(this.members.length * 10 / 100);
             let LeastTenPct = sorted[ten][key]

            return sorted.filter(member => { 
                 if(array.length<ten){
                       array.push(member)
                   }
                 if(member[key] == LeastTenPct){ 
                    array.push(member)
                  }           
                })
            },
        arrayfilterMOST:function (array,key){
                let sorted = [...this.members].sort((a, b) => { return b[key] - a[key] })
            
                let ten = Math.round(this.members.length * 10 / 100);
            
                let MostTenPct = sorted[sorted.length - ten - 1][key]
                
                 sorted.filter(member => { 
            
                    if(array.length<ten){
                        array.push(member)
                    }
                    if(member[key] == MostTenPct){ 
                        array.push(member)
                    }   
                     
                })
            },
       votesparty: function () {
           
       }

    },
    created: function () {
        fetch(this.getApi(), {
            method: 'GET',
            headers: {
                'X-API-Key': '8DAiUDsay1w8sUhSfqokcWNQibuySVF5lQi55XFP'
            }
        })
            .then(function (res) {
                if (res.ok) {
                    return res.json()

                } else {
                    throw new Error(res.status)

                }
            })
            .then(json => {
                this.members = json.results[0].members;
                this.getstates();

                this.stats.dem = this.getPartyMembers('D')
                this.stats.rep = this.getPartyMembers('R')
                this.stats.ind = this.getPartyMembers('ID')
                this.stats.total = this.members

                this.arrayfilterLEST(app.atteleast,"missed_votes_pct")
                this.arrayfilterMOST(app.attenmost,"missed_votes_pct")

                this.arrayfilterLEST(app.loyleast,"votes_with_party_pct")
                this.arrayfilterMOST(app.loymost,"votes_with_party_pct")

                this.a = 100

            })
            .catch(function (error) {
                console.log("ERROR:" + error)
            })
    },
    
    computed: {
        filtered: function () {
            return this.members.filter(member => this.checkedParty.includes(member.party) && (member.state == this.AllSelected || this.AllSelected == "ALL"));
        }
    }

})


