


const store = new Vuex.Store({
    state:{
        point:null,
        money:null,
        count_dkhb:null
    },
    mutations:{
        
        money(state,newmoney){
            state.money = newmoney;
        },
        count_dkhb(state,newcount_dkhb){
            state.count_dkhb = newcount_dkhb
        },
        point(state,newpoint){
            state.point = newpoint;
        },
    }
})